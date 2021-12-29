const Statistical = ({
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
      
      </>
    );
  };
  
  export default Statistical;
  