import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Context } from "../../context";

const UserNav = () => {
  // state
  const {
    state: { user },
  } = useContext(Context);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <>
    <div className="bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0" style={{height:"100%",marginLeft:"-15px"}}>
    <div className="flex items-center justify-center mt-8">
     <div className="flex items-center">
       <span className="text-white text-2xl mx-2 font-semibold">Menu</span>
     </div>
    </div>
    <nav className="mt-10">
    <Link href="/user">
            <a className={`nav-link ${current === "/user" && "active"}`}className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
            <i class="fas fa-tachometer-alt h-6 w-6" style={{fontSize:"24px"}}></i>
          <span className="mx-3">Dashboard</span>
        </a>
        </Link>
        <Link href="/user/support">
            <a className={`nav-link ${current === "/user/support" && "active"}`}className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
            <i class="fas fa-headset h-6 w-6" style={{fontSize:"24px"}}></i>
           
          <span className="mx-3">Help</span>
        </a>
        </Link>
        {user && user.courses && user.courses.length >= 1 && (
          <Link href="/user/qa">
          <a className={`nav-link ${current === "/user/qa" && "active"}`} className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <i class="far fa-question-circle h-6 w-6" style={{fontSize:"24px"}}></i>
          <span className="mx-3">Question</span>
        </a>
        </Link>
        )}
      </nav>
    </div>
 
    </>
  );
};

export default UserNav;