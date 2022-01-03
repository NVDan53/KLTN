import { useEffect, useState } from "react";
import axios from "axios";
import AuthorRoute from "../../components/routes/AuthorRoute";
import Link from "next/link";
import { Avatar, Tooltip } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const AuthorIndex = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPostsByAuthor();
  }, []);

  const loadPostsByAuthor = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/posts-by-author"
    );
    setPosts(data);
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://stress-apps.herokuapp.com/api/post/${post._id}`
      );
      loadPostsByAuthor();
      toast("Post deleted!");
    } catch (err) {
      toast("Error deleting! Try again.");
    }
  };

  const handlePublish = async (post) => {
    // console.log("handlePublish", post);
    // return;
    try {
      let answer = window.confirm("Are you sure you want to publish?");
      if (!answer) return;
      const { data } = await axios.put(
        `https://stress-apps.herokuapp.com/api/post/publish/${post._id}`
      );
      // console.log("COURSE PUBLISHED RES", data);
      toast("Congrats. Your post live published!");
      loadPostsByAuthor();
    } catch (err) {
      toast("Post publish failed. Try again");
    }
  };

  const handleUnpublish = async (post) => {
    // console.log("handleUnpublish", post);
    // return;
    try {
      let answer = window.confirm("Are you sure you want to unpublish?");
      if (!answer) return;
      const { data } = await axios.put(
        `https://stress-apps.herokuapp.com/api/post/unpublish/${post._id}`
      );
      toast("Your post is unpublished");
      loadPostsByAuthor();
    } catch (err) {
      toast("Post unpublish failed. Try again");
    }
  };

  return (
    <AuthorRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="#" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>List post</li>
        </ul>
      </div>

      <div className="text-gray-900 bg-gray-200">
        <div className="px-3 py-1.5 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3">Name</th>
                <th />
              </tr>
              {posts &&
                posts.map((post, index) => (
                  <tr className="border-b hover:bg-orange-100">
                    <td className="p-3">
                      <Link
                        href={`/author/post/${post.slug}`}
                        className="pointer"
                      >
                        <a>{post.title}</a>
                      </Link>
                    </td>
                    <td className="p-3 flex justify-end">
                      <div>
                        {post.published ? (
                          <>
                            <button
                              onClick={() => handleUnpublish(post)}
                              type="button"
                              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Unpublish
                            </button>
                            <button
                              onClick={() => handleDelete(post)}
                              type="button"
                              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handlePublish(post)}
                              type="button"
                              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Publish
                            </button>
                            <button
                              onClick={() => handleDelete(post)}
                              type="button"
                              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthorRoute>
  );
};

export default AuthorIndex;
