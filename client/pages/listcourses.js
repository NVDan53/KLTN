import { withRouter } from "next/router";
import axios from "axios";
import ListCourseCard from "../components/cards/ListCourseCard";
import Head from "next/head";

const ListCourses = ({ courses, router }) => {
  const head = () => (
    <Head>
      <title>List Course | {process.env.APP_NAME}</title>
      <meta
        name="description"
        content="Articles on Modern JavaScript React Next.js Node MongoDB GraphQL SEO MERN Full Stack Web Development Courses Free and Paid"
      />
      <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Articles on JavaScript React Next.js Node MongoDB GraphQL SEO MERN | ${process.env.APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`Articles on JavaScript React Next.js Node MongoDB GraphQL SEO MERN Full Stack Web
            Development Courses | Free and Paid | ${process.env.APP_NAME}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.DOMAIN}/default.jpg`} />
      <meta property="og:site_name" content={process.env.APP_NAME} />
      <meta property="og:image" content={`${process.env.DOMAIN}/default.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${process.env.DOMAIN}/default.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
      <link
        rel="stylesheet"
        type="text/css"
        href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
      />
      <script
        type="text/javascript"
        src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
      ></script>
    </Head>
  );

  return (
    <>
      {head()}

      <div className="container">
        <h2 style={{ fontSize: "25px", fontWeight: "bold", marginTop: "20px" }}>
          List Courses
        </h2>
        <div className="row my-4" style={{ marginLeft: "-23px" }}>
          {courses.map((course) => (
            <div key={course._id} className="col-md-3">
              <ListCourseCard key={course._id} course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  // console.log("DATA LENGTH =====> ", data.length);
  return {
    props: {
      courses: data,
    },
  };
}

export default withRouter(ListCourses);
