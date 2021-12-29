import Link from "next/link";

const Become = () => {
    return (
      <>
    
          <div>
  <section className="text-black">
    <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
        <img className="object-cover object-center rounded" alt="hero" src="/images/instructor.png" />
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black">Become an instructor
        </h1>
        <p className="mb-8 leading-relaxed text-left">Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.</p>
        <div className="flex justify-center">
        <Link href="/techweb">
          <button className="border-2 border-black  text-black block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-white hover:text-indigo-500 transition ease-in-out duration-700">Start teaching today</button>
          </Link>
        </div>
      </div>
    </div>
  </section>
  <section className="text-black">
    <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black">Write your story
        </h1>
        <p className="mb-8 leading-relaxed">Great blog posts don’t just happen. Even the best bloggers need a rough idea to keep them on-track. This is where outlines come in.</p>
        <div className="flex justify-center">
        <Link href="/user/become-author">
          <button className="border-2 border-black  text-black block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-white hover:text-indigo-500 transition ease-in-out duration-700">Start write Blog</button>
          </Link>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded" alt="hero" src="/images/thamgia.png" />
      </div>
    </div>
  </section>
</div>
      </>
    );
  };
  
  export default Become;
  