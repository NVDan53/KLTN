import { withRouter } from "next/router";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import Head from "next/head";
import Link from "next/link";

const Tech = ({ courses, router }) => {
  const head = () => (
    <Head>
      <title>
         VIETEDU.COM
      </title>
      <meta
        name="description"
        content=""
      />
      <link rel="canonical" href={`${process.env.DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`VIETEDU.COM | ${process.env.APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`VIETEDU.COM | Free and Paid | ${process.env.APP_NAME}`}
      />
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content={`${process.env.DOMAIN}/default.jpg`} /> */}
      <meta property="og:site_name" content={process.env.APP_NAME} />
      {/* <meta property="og:image" content={`${process.env.DOMAIN}/default.jpg`} /> */}
      {/* <meta
        property="og:image:secure_url"
        content={`${process.env.DOMAIN}/default.jpg`}
      /> */}
      {/* <meta property="og:image:type" content="image/jpg" /> */}
      {/* <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} /> */}
    </Head>
  );

  return (
    <>
      {head()}
      
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-8 bg-gray-200"> <img src="/images/abc.png" alt="" className="w-full h-48 sm:h-56 object-cover" style={{height:"700px"}}/></div>
     
      <div className="col-md-4 bg-gray-200"style={{paddingRight:"80px"}}>
      <h1 className="text-4xl font-semibold text-dark text-right"style={{marginTop:"200px",fontSize:"70px",marginBottom:"30px"}}>Come teach</h1>
      <h1 className="text-4xl font-semibold text-dark text-right"style={{fontSize:"70px",marginBottom:"40px"}}>with us</h1>

      <h1 className="text-xl text-dark text-right">Become an instructor and change <br/>lives — including your own</h1>
      <div className="text-right"> 
      <Link href="/user/become-instructor">
      <button className="text-right w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Get started</button>
      </Link>
      </div>
        </div>
      </div>
       
       
    </div>





<section className="bg-white">
  <div className="max-w-5xl px-6 py-8 mx-auto">
    <div className="">
    <div className="text-4xl sm:text-5xl text-center my-10">So many reasons to start</div>
    </div>
    <div className="grid gap-8 mt-10 md:grid-cols-3 lg:grid-cols-3">
      <div className="px-6 py-8 overflow-hidden bg-white rounded-md shadow-md text-center">
        <h2 className="text-xl font-medium text-gray-800"><i class="fas fa-chalkboard-teacher"style={{fontSize:"80px",color:"#407BFF",marginBottom:"16px"}}></i><br/>Teach your way</h2>
        <p className="max-w-md mt-4 text-gray-400">Publish the course you want, in the way you want, and always have of control your own content.</p>
      </div>
      <div className="px-6 py-8 overflow-hidden bg-white rounded-md shadow-md text-center">
        <h2 className="text-xl font-medium text-gray-800"><i class="far fa-handshake"style={{fontSize:"80px",color:"#407BFF",marginBottom:"16px"}}></i><br/>Inspire learners</h2>
        <p className="max-w-md mt-4 text-gray-400">Teach what you know and help learners explore their interests, gain new skills, and advance their careers.</p>
      </div>
      <div className="px-6 py-8 overflow-hidden bg-white rounded-md shadow-md text-center">
        <h2 className="text-xl font-medium text-gray-800"><i class="fas fa-trophy"style={{fontSize:"80px",color:"#407BFF",marginBottom:"16px"}}></i><br/>Get rewarded</h2>
        <p className="max-w-md mt-4 text-gray-400">Expand your professional network, build your expertise, and earn money on each paid enrollment.</p>
      </div>
    </div>
  </div>
</section>




<div className="container mx-auto">
  <div className="rounded-lg bg-blue-300 text-white p-8 my-12 flex flex-col md:flex-row space-between items-center justify-between relative overflow-hidden">
    {/* LEFT PART */}
    <div className="flex flex-col lg:ml-14 xl:ml-28 max-w-sm lg:max-w-xl z-10">
      <h4 className="text-4xl text-center md:text-left font-bold text-white md:pb-2">
      Become an instructor today
      </h4>
      <p className="text-center md:text-left text-white opacity-70 md:pb-6">
      Join one of the world’s largest online learning marketplaces.
      </p>
    
    </div>
    {/* RIGHT PART */}
    <div className="pt-8 md:pt-0 justify-center lg:ml-auto z-10"style={{marginRight:"80px"}}>
      {/* Contribuer */}
      <Link href="/user/become-instructor">
      <a className="flex items-center px-8 py-4 text-center text-sm text-blue-300 uppercase bg-white font-display rounded-full transition duration-200"> 
        <span>Join us now</span>
      </a>
      </Link>
    </div>
    {/* ATTENTION */}
    <p className="pt-8 text-xs block md:hidden z-10 text-white">
      consectetur adipiscing elit
    </p>
    {/* DÉCORATION */}
    <div className="absolute bg-blue-400 opacity-60 w-96 h-96 -top-10 -right-16 md:w-[800px] md:h-[800px] md:left-[45%] md:top-[-150%] rounded-full shadow-2xl z-0"style={{marginLeft:"240px"}} />
  </div>
</div>


{/* component */}
{/* This is an example component */}
<main className="px-3">
  <div className="text-4xl sm:text-5xl text-center my-10">How to begin ?</div>
  <div className="grid md:grid-cols-3 gap-8 m-5 max-w-5xl m-auto">
    <div className="bg-white">
      <img src="/images/plan.png" alt="" className="w-full h-48 sm:h-56 object-cover" />
      <div className="px-10 py-6 mb-10 text-left">
        <div className="text-2xl font-bold text-purple-500 mb-4">Plan your curriculum</div>
        <span className="text-sm ">
        You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.<br/>
The way that you teach — what you bring to it — is up to you.
        </span>
      </div>
    </div>
    <div className="bg-white">
      <img src="/images/video.png" alt="" className="w-full h-48 sm:h-56 object-cover" />
      <div className="px-10 py-6 mb-10 text-left">
        <div className="text-2xl font-bold text-green-500 mb-4">Record your video</div>
        <span className="text-sm">Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start.
        <br/>If you don’t like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.</span>
      </div>
    </div>
    <div className="bg-white">
      <img src="/images/launch.png" alt="" className="w-full h-48 sm:h-56 object-cover" />
      <div className="px-10 py-6 mb-10 text-left">
        <div className="text-2xl font-bold text-blue-500 mb-4">Launch your course</div>
        <span className="text-sm">Gather your first ratings and reviews by promoting your course through social media and your professional networks.
        <br/>Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.</span>
      </div>
    </div>
  </div>
</main>


      
    </>

    
  );
};





export default withRouter(Tech);