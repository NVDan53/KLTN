import { useEffect, useState } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import Link from "next/link";
import { Avatar, Badge } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    // console.log(data);
    setCourses(data);
  };

  return (
    <InstructorRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="/instructor" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>List courses</li>
        </ul>
      </div>

      {!courses.length && (
        <Link href="/instructor/course/create">
          <a className="btn btn-primary float-right mt-2">Create course</a>
        </Link>
      )}

      <div>
        <div className="inline-block w-full shadow rounded-lg overflow-hidden mb-4">
          <table className="w-full bg-white leading-normal">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-dark font-bold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-dark font-bold uppercase tracking-wider">
                  Lesson
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-dark font-bold uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-dark font-bold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-dark font-bold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {courses &&
                courses.map((course) => (
                  <Link href={`/instructor/course/view/${course.slug}`}>
                    <tr
                      key={course._id}
                      className="xyz hover:bg-sky-100"
                      style={{ cursor: "pointer" }}
                    >
                      <td className="px-4 py-4 border-b border-gray-200    text-sm ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="w-full h-full"
                              src={
                                course.image
                                  ? course.image.Location
                                  : "/course.png"
                              }
                              style={{
                                height: "80px",
                                width: "100px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {course.name}
                            </p>
                            {course.lessons.length < 5 ? (
                              <p
                                style={{ fontSize: "14px" }}
                                className="text-warning "
                              >
                                At least 5 lessons are required to publish a
                                course
                              </p>
                            ) : course.published ? (
                              <p
                                style={{ fontSize: "14px" }}
                                className="text-success"
                              >
                                Your course is live in the marketplace
                              </p>
                            ) : (
                              <p
                                style={{ fontSize: "14px" }}
                                className="text-success"
                              >
                                Your course is ready to be published
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 border-b border-gray-200  text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {course.lessons.length} Lessons
                        </p>
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200   text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(course.updatedAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200   text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <Badge
                            count={course.paid ? course.price : "Free"}
                          ></Badge>
                        </p>
                      </td>
                      <td className="px-4 py-4 border-b border-gray-200   text-sm">
                        {course.published ? (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative">Published</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative">Unpublished</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  </Link>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorIndex;
