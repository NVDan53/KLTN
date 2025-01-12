import { useState, useContext, useEffect } from 'react';
import { withRouter, useRouter } from 'next/router';
import axios from 'axios';
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron';
import SingleCourseLessons from '../../components/cards/SingleCourseLessons';
import PreviewModal from '../../components/modal/PreviewModal';
import { Context } from '../../context';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import { markdownToTxt } from 'markdown-to-txt';
import DisqusThread from '../../components/DisqusThread';

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  // head
  const head = () => (
    <Head>
      <title>
        {course.name} | {process.env.APP_NAME}
      </title>
      <meta
        name="description"
        content={markdownToTxt(course.description.substring(0, 300))}
      />
      <link
        rel="canonical"
        href={`${process.env.DOMAIN}/course/${course.slug}`}
      />
      <meta
        property="og:title"
        content={`${course.name} | ${process.env.APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`${course.name} | ${process.env.APP_NAME}`}
      />
      <meta name="author" content={course.instructor.name} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${process.env.DOMAIN}/post/${course.slug}`}
      />
      <meta property="og:site_name" content={process.env.APP_NAME} />
      <meta
        property="og:image"
        content={`${course.image ? course.image.Location : '/default.jpg'}`}
      />
      <meta
        property="og:image:secure_url"
        content={`${course.image ? course.image.Location : '/default.jpg'}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
    </Head>
  );

  // context
  const {
    state: { user },
  } = useContext(Context);
  const {
    name,
    description,
    instructor,
    updatedAt,
    image,
    price,
    paid,
    categories,
    lessons,
  } = course;

  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem('token'));
    }
  });

  console.log('TOKENnn:', token);

  // router
  const router = useRouter();

  // useEffect(() => {
  //   const tokenStorage = JSON.parse(window.localStorage.getItem("token"));
  //   setToken(tokenStorage);
  // }, []);

  useEffect(() => {
    // is already enrolled?
    if (user && course) checkEnrollment();
  }, [course, user, token]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(
      `https://stress-apps.herokuapp.com/api/check-enrollment/${course._id}`,
      {
        headers: { Authorization: token },
      }
    );
    console.log('CHECK ENROLLMENT => ', data);
    setEnrolled(data);
  };

  const handlePaidEnrollment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!user) return router.push('/login');
      // if user is already enrolled, redirect to course page
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      console.log('enroll to this course > ', course._id);

      const { data } = await axios.post(
        `https://stress-apps.herokuapp.com/api/paid-enrollment/${course._id}`,
        null,
        {
          headers: { Authorization: token },
        }
      );
      console.log('PAID ENROLLMENT => ', data);
      // load stripe for payment
      // on successful payment, user will get redirected to /stripe/success page
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

      console.log('STRIPE:', stripe);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast('Enrollment failed, Try again.');
      console.log(err);
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!user) return router.push('/login');
      // if user is already enrolled, redirect to course page
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      // console.log("enroll to this course > ", course._id);
      const { data } = await axios.post(
        `https://stress-apps.herokuapp.com/api/free-enrollment/${course._id}`,
        null,
        {
          headers: { Authorization: token },
        }
      );
      console.log('FREE ENROLLMENT => ', data);
      toast(data.message);
      // redirect user to course page
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast('Enrollment failed, Try again.');
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {head()}
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        setPreview={setPreview}
        loading={loading}
        user={user}
        handleFreeEnrollment={handleFreeEnrollment}
        handlePaidEnrollment={handlePaidEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />
      {/* show preview video in modal */}
      {/* {showModal ? JSON.stringify(showModal) : JSON.stringify(showModal)} */}
      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
      />
      <div className="container">
        <h1 className="text-4xl mt-4 font-weight-bold mb-4">Description</h1>

        <p className="lead mb-4 text-xl font-sans">
          {description && description}
        </p>
        <h1 className="text-4xl mt-4 font-weight-bold mb-4">Course content</h1>
      </div>
      {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <br />

      <div className="container">
        <div className="row">
          <div className="col">
            <DisqusThread
              id={course._id}
              title={course.name}
              path={`/course/${course.slug}`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(
    `https://stress-apps.herokuapp.com/api/course/public/${query.slug}`
  );
  return {
    props: {
      course: data,
    },
  };
}

export default withRouter(SingleCourse);
