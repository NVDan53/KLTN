import React from "react";
import axios from "axios";

const CourseCategories = ({ courses, categories }) => {
  const getCategoriesInCourses = async () => {
    return courses.map((val) => {
      return val.categories;
    });
  };

  const getCourses = async (categoryIds) => {
    return getCategoriesInCourses().then((categories) => {
      return categories.flat(Infinity).filter((category) => {
        console.log("CC:", category);
        return categoryIds.includes(category._id);
      });
    });

    //   return courses.filter((course) =>
    //     categoryIds.includes(course.categories._id)
    //   );
  };

  const getCourseCategories = async () => {
    var categoryIds = categories?.map((category) => category._id);

    return getCourses(categoryIds).then((courses) =>
      console.log("COURSES:", courses)
    );
  };

  {
    getCourseCategories();
  }

  return <div style={{ marginTop: "100px" }}></div>;
};

export default CourseCategories;
