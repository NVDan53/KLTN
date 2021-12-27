import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  // destructure
  const { name, instructor, price, image, slug, paid, categories } = course;
  return (
   
      <div className="drop-shadow-lg m-2 bg-white border-2 transform hover:scale-105 transition duration-500 ">
        <div className="relative">
          <img  src={image.Location} alt="Colors"  style={{ objectFit: "cover",height:"200px" }} />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 ">
            {paid ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}</p>
        </div>
        <h1 className="mt-2 p-2 text-gray-800 font-bold">{name}</h1>
        <h1 className=" px-2 text-gray-800 ">{instructor.name}</h1>
        
          <div className="text-right">
          <Link href="/course/[slug]" as={`/course/${slug}`}>
    <a>
          <button className="m-2 p-2 text-right text-white bg-indigo-600 hover:bg-indigo-400 py-2 rounded-lg">
            {paid ? "Buy Course": "Enroll Now"}
          </button>
          </a>
      </Link>
          </div>
       
  
  </div>
    
  );
};

export default CourseCard;
