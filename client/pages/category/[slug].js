import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CourseCard from "../../components/cards/CourseCard";

const CourseForCategory = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const categoryId = router.query.slug;

  useEffect(() => {
    if (categoryId) {
      const getCoursesForCategory = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/courses");
          setCourses(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getCoursesForCategory();
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      const getCategories = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/categories");
          setCategories(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getCategories();
    }
  }, [categoryId]);

  const handleGetCourses = () => {
    return courses.filter((course) => {
      return course.categories.some((ctg) => {
        return categoryId === ctg._id;
      });
    });
  };

  const handleGetCurrentCategory = () => {
    return categories.filter((cate) => {
      return cate._id === categoryId;
    });
  };

  const categoryName = handleGetCurrentCategory()[0]?.name;

  return (
    <div className="container">
      <row>
        <h1
          style={{ fontWeight: "bold", fontSize: "25px", margin: "15px 0" }}
        >{`Courses for ${categoryName}`}</h1>
      </row>
      <div className="row">
        {handleGetCourses()?.map((course) => {
          return (
            <div key={course._id} className="col-md-3">
              <CourseCard key={course._id} course={course} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseForCategory;
