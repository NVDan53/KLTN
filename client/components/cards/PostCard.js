import { Card, Badge } from "antd";
import Link from "next/link";

const { Meta } = Card;

const PostCard = ({ post }) => {
  // destructure
  const { title, thumbnail, slug, categories, postedBy, updatedAt } = post;
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
                  <h5 className="text-gray-900 font-bold tracking-tight mb-2">
                    {title && title.substring(0, 160)}
                  </h5>
                </a>
                <div>
                  <span className=" text-gray-700 float-left ">
                    {postedBy.name}
                  </span>
                  <span className=" text-gray-700 float-right">
                    {new Date(updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-10">
                  <a
                    className="item-center text-center px-4 py-2 block w-full text-white bg-blue-500 hover:bg-blue-700 rounded"
                    href="#"
                  >
                    Read more
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
