import { useState, useEffect, useContext } from "react";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import {
  SyncOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Context } from "../../context";

const UserIndex = () => {
  const {
    state: { user, token },
    dispatch,
  } = useContext(Context);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/user-courses`, {
      headers: { Authorization: token },
    });
    console.log(data);
    setCourses(data);
  };

  return (
    <UserRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="/user" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>List Courses</li>
        </ul>
      </div>

      {!courses.length && (
        <Link href="/">
          <a className="btn btn-primary float-right mt-2">Browse Courses</a>
        </Link>
      )}

      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      )}

      <div className="row pt-2 mb-4 cursor-pointer ">
        {courses &&
          courses.map((course) => (
            <Link href={`/user/course/${course.slug}`} className="pointer">
              <div
                className="m-2 rounded-lg bg-white shadow-lg transform hover:scale-105 transition duration-500"
                style={{ width: "300px" }}
              >
                <div className="relative">
                  <img
                    className="w-full"
                    src={course.image ? course.image.Location : "/course.png"}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <p className="p-2 text-gray-800 font-bold ">{course.name}</p>
                <div className="p-2">
                  <div className="flex items-center">
                    <p>By {course.instructor.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </UserRoute>
  );
};

export default UserIndex;
