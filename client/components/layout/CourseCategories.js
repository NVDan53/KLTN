import React, { useState } from "react";
import axios from "axios";

const CourseCategories = ({ courses, categories }) => {
  const [categ, setCateg] = useState([]);
  const [crs, setCrs] = useState([]);

  const getCourses = async (categoryIds) => {
    return courses.filter((course) => {
      return course.categories.some((category) =>
        categoryIds.includes(category._id)
      );
    });
  };

  const getCourseCategories = async (categories) => {
    var categoryIds = categories?.map((category) => category._id);

    return getCourses(categoryIds).then((courses) => {
      const data = { categories, courses };
      return data;
    });
  };

  getCourseCategories(categories).then((data) => {
    const { categories, courses } = data;
    setCateg(categories);
    setCrs(courses);
  });

  return (
    <div style={{ marginTop: "100px" }}>
      {/* {categ.map((val) => {
        <h2>{val.name}</h2>;
      })} */}
    </div>
  );
};

export default CourseCategories;
