import { withRouter } from "next/router";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import Head from "next/head";
import SimpleSlider from "../components/nav/SimpleSlider";
import Saying from "../components/layout/Saying";
import Pricing from "../components/layout/Pricing";
import Feature from "../components/layout/Feature";
import Become from "../components/layout/Become";
<<<<<<< HEAD
const Index = ({router }) => {
=======
import CourseCategories from "../components/layout/CourseCategories";
const Index = ({ courses, categories, router }) => {
>>>>>>> origin/pre-merge
  const head = () => (
    <Head>
      <title>Online Learning | {process.env.APP_NAME}</title>
      <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`} />
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

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
<<<<<<< HEAD
     {head()}
      <div className="container">
      <SimpleSlider />
      <Become/>
      <Feature/>
      </div>
      <Saying />
   
    
=======
      {head()}
      <div className="container">
        <SimpleSlider />
        <CourseCategories courses={courses} categories={categories} />
        <Become />
        <Feature />
      </div>
      <Saying />
>>>>>>> origin/pre-merge
    </>
  );
};

<<<<<<< HEAD
=======
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
>>>>>>> origin/pre-merge

export default withRouter(Index);
