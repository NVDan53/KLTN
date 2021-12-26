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
        <Card
          className="mb-4 "
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
            />
          }
        >
          <h2 className="h4 font-weight-bold">{name}</h2>
          <p>by {instructor.name}</p>

          {categories.map((c) => (
            <Badge
              count={c.name}
              style={{ backgroundColor: "#03a9f4" }}
              className="pb-2 mr-2"
            />
          ))}

          <h4 className="pt-2">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}</h4>
        
        <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{name}</h1>
        <div className="my-2">
        <div className="flex space-x-1 items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <p>{instructor.name}</p>
          </div>
         
         
        
          <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Course</button>
        </div>
  
  </Card>
      </a>
      </Link>
  );
};

export default CourseCard;
