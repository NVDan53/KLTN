import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import CourseCard from "../cards/CourseCard";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true,
  // autoplay: true,
};

const CourseCategories = ({ courses, categories }) => {
  const getCourses = (categoryIds) => {
    return courses.filter((course) => {
      return course.categories.some((category) =>
        categoryIds.includes(category._id)
      );
    });
  };

  const getCategories = (categories) => {
    const categoryIds = categories?.map((category) => category._id);
    const courses = getCourses(categoryIds);
    return { categories, courses };
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        {getCategories(categories).categories.map((category) => {
          return (
            <div className="container">
              <div className="row">
                {getCategories(categories).courses.filter((course) => {
                  return course.categories.some((ctg) => {
                    return category._id === ctg._id;
                  });
                }).length > 0 && (
                  <div className="d-flex justify-between align-items-center w-100 font-bold text-primary">
                    <h2
                      key={category._id}
                      style={{ fontSize: "25px", fontWeight: "bold" }}
                    >
                      {category.name}
                    </h2>
                    {getCategories(categories).courses.filter((course) => {
                      return course.categories.some((ctg) => {
                        return category._id === ctg._id;
                      });
                    }).length >= 4 && (
                      <Link href={`/category/${category._id}`}>
                        <a>{`See all >`}</a>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              <div className="row row-style">
                {getCategories(categories).courses.filter((course) => {
                  return course.categories.some((ctg) => {
                    return category._id === ctg._id;
                  });
                }).length >= 4 ? (
                  <Slider {...settings} style={{ width: "100%" }}>
                    {getCategories(categories)
                      .courses.filter((course) => {
                        return course.categories.some((ctg) => {
                          return category._id === ctg._id;
                        });
                      })
                      .map((course) => {
                        return (
                          <div key={course._id}>
                            <CourseCard key={course._id} course={course} />
                          </div>
                        );
                      })}
                  </Slider>
                ) : (
                  getCategories(categories)
                    .courses.filter((course) => {
                      return course.categories.some((ctg) => {
                        return category._id === ctg._id;
                      });
                    })
                    .map((course) => {
                      return (
                        <div key={course._id} className="col-md-3 p-0">
                          <CourseCard key={course._id} course={course} />
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* 
      <pre>{JSON.stringify(getCategories(categories), null, 4)}</pre> */}
    </div>
  );
};

export default CourseCategories;
