import { withRouter } from "next/router";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import Head from "next/head";
import SimpleSlider from "../components/nav/SimpleSlider";
import Saying from "../components/layout/Saying";
import Pricing from "../components/layout/Pricing";
import Feature from "../components/layout/Feature";
import Become from "../components/layout/Become";
import CourseCategories from "../components/layout/CourseCategories";
const Index = ({ courses, categories, router }) => {
  const head = () => (
    <Head>
      <title>Online Learning | {process.env.APP_NAME}</title>
      <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`} />
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
      <div className="container">
        <SimpleSlider />
        <CourseCategories courses={courses} categories={categories} />
        <Become />
        <Feature />
      </div>
      <Saying />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  const courseCategories = await axios.get(`${process.env.API}/categories`);

  return {
    props: {
      courses: data,
      categories: courseCategories.data,
    },
  };
}

export default withRouter(Index);
