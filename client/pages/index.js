import { withRouter } from "next/router";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import Head from "next/head";
import SimpleSlider from "../components/nav/SimpleSlider";

const Index = ({ courses, router }) => {
  const head = () => (
    <Head>
      <title>
        Online Learning |{" "}
        {process.env.APP_NAME}
      </title>
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
     <div>
  <section className="text-black">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
        <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/600x400/edf2f7/0f1631" />
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black">The title for your feature.
          <br className="hidden lg:inline-block" />goes here.
        </h1>
        <p className="mb-8 leading-relaxed">Central Saint Martins graduate Jessan Macatangay incorporated
          deconstructed chairs into his striking fashion collection, to symbolise how people carry the
          weight of personal struggles. More.</p>
        <div className="flex justify-center">
          <button className="border-2 border-black  text-black block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-white hover:text-indigo-500 transition ease-in-out duration-700">Button</button>
        </div>
      </div>
    </div>
  </section>
  <section className="text-black">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black">The title for your feature.
          <br className="hidden lg:inline-block" />goes here.
        </h1>
        <p className="mb-8 leading-relaxed">Central Saint Martins graduate Jessan Macatangay incorporated
          deconstructed chairs into his striking fashion collection, to symbolise how people carry the
          weight of personal struggles. More.</p>
        <div className="flex justify-center">
          <button className="border-2 border-black  text-black block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-white hover:text-indigo-500 transition ease-in-out duration-700">Button</button>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/600x400/edf2f7/0f1631" />
      </div>
    </div>
  </section>
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

export default withRouter(Index);
