import { Card, Badge } from "antd";
import Link from "next/link";

const { Meta } = Card;

const PostCard = ({ post }) => {
  // destructure
  const { title, thumbnail, slug, categories, postedBy } = post;
  return (
    <>
      <Link href="/article/[slug]" as={`/article/${slug}`}>
        <a>
          <div className="max-w-lg mx-auto my-4">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5  hover:shadow-2xl ">
              <img
                className="rounded-t-lg"
                src={thumbnail}
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
                alt=""
              />

              <div className="p-3">
                {categories.map((c) => (
                  <Badge
                    key={c._id}
                    count={c.name}
                    style={{ backgroundColor: "#03a9f4" }}
                    className="pb-2 mr-2"
                  />
                ))}
                <a href="#">
                  <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                    {title && title.substring(0, 160)}
                  </h5>
                </a>
                <p className="font-normal text-gray-700 mb-3">
                  by {postedBy.name}
                </p>
                <div className="flex justify-end">
                  <a
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                    href="#"
                  >
                    Read more
                    <svg
                      className="-mr-1 ml-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default PostCard;
