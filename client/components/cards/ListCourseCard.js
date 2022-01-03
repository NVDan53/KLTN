import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";
import { Card, Badge } from "antd";

const ListCourseCard = ({ course }) => {
  // destructure
  const { name, instructor, price, image, slug, paid, categories} = course;
 
  return (
    <Link href="/course/[slug]" as={`/course/${slug}`}>
    <div className="cursor-pointer my-1 max-w-sm bg-white px-2 pt-2 pb-2 rounded-xl border-solid border-2 transform hover:scale-90 transition duration-500 border-gray-200">
      {/* <h3 className="mb-2 text-xl font-bold text-indigo-600">Beginner Friendly</h3> */}
      <div className="relative">
          <img className="w-full rounded-xl" src={image.Location}style={{ objectFit: "cover", height: "200px" }} alt="Colors" />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg"> 
            {paid? currencyFormatter({amount: price,currency: "usd",}): "Free"}
          </p>
      </div>
      <h1 className="mt-2 text-gray-800 font-bold cursor-pointer">{name.substring(0, 60)}</h1>
      <div className="">
      {categories.map((c) => (
            <Badge
              count={c.name}
              style={{ backgroundColor: "#03a9f4" }}
              className="pb-2 mr-2 mt-2"
            />
          ))}
          <div className="flex space-x-1 items-center">
            <p>By {instructor.name}</p>
          </div>
          <button className="mt-2 w-full text-white bg-indigo-600 py-2 rounded-xl">
            {paid? "Buy Course": "Enroll"}
          </button>
      </div>
    </div>
    </Link>
  );
};

export default ListCourseCard;
