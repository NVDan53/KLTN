const Become = ({
    listUser = [
      {
        name: "Learners",
        number: "1900",
        icon: "//img.icons8.com/material-rounded/24/000000/user.png",
      },
      {
        name: "Courses",
        number: "200",
        icon: "https://img.icons8.com/windows/32/000000/courses.png",
      },
      {
        name: "Instructors",
        number: "50",
        icon: "https://img.icons8.com/ios-filled/50/000000/teacher.png",
      },
    ],
  }) => {
    return (
      <>
           <div className="relative w-full flex" style={{marginTop:"50px"}}>
        <div className="infor-parent flex rounded-lg w-full grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 z-10">
          {listUser.map((listUsers, index) => (
            <div
              className="infor-child flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="bg-blue flex items-center justify-center w-12 h-12 mr-6 rounded-full">
                  <img src={listUsers.icon} className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUsers.number}+
                  </p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>
      
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
          <button className="border-2 border-black  text-black block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-white hover:text-indigo-500 transition ease-in-out duration-700">Start teaching today</button>
        </div>
      </div>
    </div>
  </section>
  <section className="text-black">
    <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
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
        <img className="object-cover object-center rounded" alt="hero" src="/images/thamgia.png" />
      </div>
    </div>
  </section>
</div>
      </>
    );
  };
  
  export default Become;
  