import React from "react";
import ReactMarkdown from "react-markdown";
import { Tag } from "antd";
import DisqusThread from "../../components/DisqusThread";
import CodeBlock from "../../components/marked/CodeBlock";
import Head from "next/head";
import { withRouter } from "next/router";
import { markdownToTxt } from "markdown-to-txt";
import axios from "axios";
import CoursePromo from "../../components/misc/CoursePromo";
import PostCard from "../../components/cards/PostCard";

const SinglePost = ({ postItem, posts }) => {
  // console.log("POST:", post);

  const head = () => (
    <Head>
      <title>
        {postItem.title} | {process.env.APP_NAME}
      </title>
      <meta
        name="description"
        content={markdownToTxt(postItem.body.substring(0, 300))}
      />
      <link
        rel="canonical"
        href={`${process.env.DOMAIN}/article/${postItem.slug}`}
      />
      <meta
        property="og:title"
        content={`${postItem.title} | ${process.env.APP_NAME}`}
      />
      <meta
        property="og:description"
        content={`${postItem.title} | ${process.env.APP_NAME}`}
      />
      <meta name="author" content={postItem.postedBy.name} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${process.env.DOMAIN}/post/${postItem.slug}`}
      />
      <meta property="og:site_name" content={process.env.APP_NAME} />
      <meta property="og:image" content={`${process.env.DOMAIN}/default.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${process.env.DOMAIN}/default.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} />
    </Head>
  );

  return (
    <>
      {head()}
      <div className="container-fluid">
        {/* full width row for heading */}
        <div className="row">
          <div className="col pt-3">
            <h1>{postItem.title}</h1>
            <p>
              <small className="text-muted">
                {postItem.postedBy ? postItem.postedBy.name : ""}{" "}
                {new Date(postItem.updatedAt).toLocaleDateString()}
              </small>
            </p>
          </div>
        </div>
        {/* col 8 for post */}
        <div className="row">
          <div className="col-md-8 single-post">
            <hr />
            <ReactMarkdown
              source={postItem.body}
              renderers={{ code: CodeBlock }}
              className="lead single-post"
            />
            <br />
            {postItem.categories &&
              postItem.categories.map((c) => (
                <Tag key={c.name}>
                  {c.name}
                  {/* <Link href="/category/[slug]" as={`/category/${c.slug}`}>
                <a>{c.name}</a>
              </Link> */}
                </Tag>
              ))}

            <div className="p-4"></div>

            <DisqusThread
              id={postItem._id}
              title={postItem.title}
              path={`/article/${postItem.slug}`}
            />
          </div>

          <div className="col-md-4">
            <h2>Relative blogs</h2>
            {/* <cite>(Comming soon by Henry)</cite> */}

            {posts
              ?.filter((post) => post.title !== postItem.title)
              .slice(0, 5)
              .map((post) => (
                <div key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        </div>
        {/* col 4 for promo */}
        {/* <div className="p-4"></div> */}

        {/* last row for disqus */}
        {/* <DisqusThread
          id={post._id}
          title={post.title}
          path={`/article/${post.slug}`}
        /> */}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(
    `${process.env.API}/post/${ctx.params.slug}`
  );
  const postList = await axios.get(`${process.env.API}/posts`);
  return {
    props: {
      postItem: data,
      posts: postList.data,
    },
  };
}

export default withRouter(SinglePost);
