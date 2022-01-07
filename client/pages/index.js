import axios from "axios";
import Head from "next/head";
import { withRouter } from "next/router";
import Become from "../components/layout/Become";
import CourseCategories from "../components/layout/CourseCategories";
import Statistical from "../components/layout/Statistical";
import SimpleSlider from "../components/nav/SimpleSlider";
const Index = ({ courses, categories, router }) => {
  const head = () => (
    <Head>
      <title>Online Learning | {process.env.APP_NAME}</title>
      <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`} />
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <link
        rel="shortcut icon"
        href="/images/favicon/favicon.ico"
        type="image/x-icon"
      />
      {/* <link rel="shortcut icon" href="/images/favicon/favicon.ico" type="image/x-icon" /> */}
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <meta
        property="og:title"
        content={`Online Learning | ${process.env.APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`Online Learning | ${process.env.APP_NAME}`}
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
    </Head>
  );

  return (
    <>
      {head()}

      <SimpleSlider />
      <CourseCategories courses={courses} categories={categories} />
      <Statistical />
      <Become />
      {/* <Feature /> */}

      <Saying />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`http://localhost:8000/api/courses`);
  const courseCategories = await axios.get(
    `http://localhost:8000/api/categories`
  );

  return {
    props: {
      courses: data,
      categories: courseCategories.data,
    },
  };
}

export default withRouter(Index);
