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
          <Card
            // style={{ height: "320px" }}
            className="mb-4"
            //   cover={
            //     <img
            //       src={}
            //       alt={title}
            //       style={{ height: "200px", objectFit: "cover" }}
            //       className="p-1"
            //     />
            //   }
          >
            <img
              src={thumbnail}
              alt={title}
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
            <h2 className="h4 font-weight-bold mt-2">
              {title && title.substring(0, 160)}
            </h2>
            <cite>by {postedBy.name}</cite>

            {categories.map((c) => (
              <Badge
                key={c._id}
                count={c.name}
                style={{ backgroundColor: "#03a9f4" }}
                className="pb-2 mr-2"
              />
            ))}
          </Card>
        </a>
      </Link>
    </>
  );
};

export default PostCard;
