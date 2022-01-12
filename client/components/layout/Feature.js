const Feature = () => {
  return (
    <div className="container">
      {/* component */}
      <header>
        {/* Section Hero */}
        <div className="py-14">
          <h1 className="mt-8 text-center text-5xl font-bold">
            Our Features &amp; Services.
          </h1>
          <div className="text-center">
            <span className="inline-block w-1 h-1 rounded-full bg-blue-500 ml-1" />
            <span className="inline-block w-3 h-1 rounded-full bg-blue-500 ml-1" />
            <span className="inline-block w-40 h-1 rounded-full bg-blue-500 ml-1" />
            <span className="inline-block w-3 h-1 rounded-full bg-blue-500 ml-1" />
            <span className="inline-block w-1 h-1 rounded-full bg-blue-500 ml-1" />
          </div>
          {/* Box */}
          <div className="md:flex md:justify-center md:space-x-8 md:px-14">
            {/* box-1 */}
            <div className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
              <div className="w-sm">
                <img className="w-64" src="/images/workwithus.png" alt="" />
                <div className="mt-4 text-green-600 text-left">
                  <h1 className="text-xl font-bold">Work with us</h1>
                  <p className="mt-4 text-gray-600">
                    At Udemy, we’re all learners and instructors. We live out
                    our values every day to create a culture that is diverse,
                    and committed to helping employees thrive.
                  </p>
                  <button className="mt-8 py-2 px-14 rounded-full bg-blue-500 text-white tracking-widest hover:bg-blue-100 transition duration-200">
                    Join our team
                  </button>
                </div>
              </div>
            </div>
            {/* box-2 */}
            <div className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
              <div className="w-sm">
                <img
                  className="w-64"
                  src="/images/seeyourresearch.png"
                  alt=""
                />
                <div className="mt-4 text-green-600 text-left">
                  <h1 className="text-xl font-bold">See our research</h1>
                  <p className="mt-4 text-gray-600">
                    We’re committed to changing the future of learning for the
                    better. Dig into our original research to learn about the
                    forces that are shaping the modern workplace.
                  </p>
                  <button className="mt-8 py-2 px-14 rounded-full bg-blue-500 text-white tracking-widest hover:bg-blue-100 transition duration-200">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
            {/* box-3 */}
            <div className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
              <div className="w-sm">
                <img className="w-64" src="/images/readblog.png" alt="" />
                <div className="mt-4 text-green-600 text-left">
                  <h1 className="text-xl font-bold">Read our blog</h1>
                  <p className="mt-4 text-gray-600">
                    Want to know what we’ve been up to lately? Check out the
                    Udemy blog to get the scoop on the latest news, ideas and
                    projects, and more.
                  </p>
                  <button className="mt-8 py-2 px-14 rounded-full bg-blue-500 text-white tracking-widest hover:bg-blue-100 transition duration-200">
                    Read now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Feature;
