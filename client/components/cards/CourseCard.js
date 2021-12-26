import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  // destructure
  const { name, instructor, price, image, slug, paid, categories } = course;
  return (
    <Link href="/course/[slug]" as={`/course/${slug}`}>
    <a>
      <div className="m-2 bg-white p-2 pb-2 rounded-xl border-2 transform hover:scale-105 transition duration-500">
        <div className="relative">
          <img className="w-full rounded-xl" src={image.Location} alt="Colors"  style={{ objectFit: "cover",height:"200px" }} />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">{paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}</p>
        </div>
        <h1 className="mt-4 text-gray-800 font-bold cursor-pointer">{name}</h1>
        <div className="my-2">
        <div className="flex space-x-1 items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <p>{instructor.name}</p>
          </div>
         
         
        
          <button className="mt-4 w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Course</button>
        </div>
  
  </div>
      </a>
      </Link>
  );
};

export default CourseCard;
