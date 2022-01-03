import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Badge } from "antd";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    loadQuestionCount();
  }, []);

  const loadQuestionCount = async () => {
    const { data } = await axios.get(
      `https://stress-apps.herokuapp.com/api/instructor/question-count`
    );
    setQuestionCount(data);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0" style={{height:"100%",marginLeft:"-15px"}}>
    <div className="flex items-center justify-center mt-8">
     <div className="flex items-center">
       <span className="text-white text-2xl mx-2 font-semibold">Menu</span>
     </div>
    </div>
    <nav className="mt-10">
        <Link href="/instructor">
            <a className={`nav-link ${current === "/instructor" && "active"}`} className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
            <i class="fas fa-tachometer-alt h-6 w-6" style={{fontSize:"24px"}}></i>
          <span className="mx-3">Dashboard</span>
        </a>
        </Link>
        <Link href="/instructor/course/create">
            <a className={`nav-link ${current === "/instructor/course/create" && "active"}`}className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
            <i class="fas fa-video h-6 w-6"style={{fontSize:"24px"}}></i>
          <span className="mx-3">Create Course</span>
        </a>
        </Link>
        <Link href="/instructor/qa">
          <a className={`nav-link ${current === "/instructor/qa" && "active"}`} className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100" href="/tables">
          <i class="far fa-question-circle h-6 w-6" style={{fontSize:"24px"}}></i>
          <span className="mx-3">Comment of user</span>
          <Badge count={questionCount} offset={[21, 7]}>

          </Badge>
        </a>
        </Link>
        <Link href="/instructor/revenue">
            <a className={`nav-link ${current === "/instructor/revenue" && "active"}`}className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
            <i class="fas fa-dollar-sign h-6 w-6"style={{fontSize:"24px"}}></i>
          <span className="mx-3">Revenue</span>
        </a>
        </Link>
       
      
      </nav>
    </div>
 
    </>
    );
  };

export default InstructorNav;
