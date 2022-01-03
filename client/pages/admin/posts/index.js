import { useEffect, useState } from "react";
import axios from "axios";
import AdminRoute from "../../../components/routes/AdminRoute";
import Link from "next/link";
import { Avatar, Tooltip } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const AdminPostIndex = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/admin/posts"
    );
    setPosts(data);
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://stress-apps.herokuapp.com/api/admin/post/${post._id}`
      );
      loadPosts();
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
        `https://stress-apps.herokuapp.com/api/admin/post/publish/${post._id}`
      );
      // console.log("COURSE PUBLISHED RES", data);
      toast("Congrats. Your post live published!");
      loadPosts();
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
        `https://stress-apps.herokuapp.com/api/admin/post/unpublish/${post._id}`
      );
      toast("Your post is unpublished");
      loadPosts();
    } catch (err) {
      toast("Post unpublish failed. Try again");
    }
  };

  return (
    <AdminRoute>
         <div className="text-blue-900 text-sm rounded-md"style={{margin:"16px"}}>
        <ul className="flex">
          <li><a href="/admin" className="underline font-semibold">Dashboard</a></li>
          <li><span className="mx-2">/</span></li>  
          <li>List post</li>
        </ul>
      </div>

   
      <div className="text-gray-900 bg-gray-200">
        
        <div className="px-3 py-1.5 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3 text-right">Action</th>
              </tr>
              {posts &&
        posts.map((post, index) => (
              <tr className="border-b hover:bg-orange-100"key={post._id}>
                <td className="p-3">
                
                    <a>{post.title}</a>
                 
                </td>      
                <td className="p-3 flex justify-end">
                <div>
                                 
                {post.published ? (
                    <>
                      <Tooltip title="Unpublish">
                        <CloseCircleOutlined
                          onClick={() => handleUnpublish(post)}
                          className="h5 text-warning pr-2 pl-2"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          onClick={() => handleDelete(post)}
                          className="h5 text-danger pointer pr-2 pl-2"
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Publish">
                        <CheckCircleOutlined
                          onClick={() => handlePublish(post)}
                          className="h5 text-success pr-2 pl-2"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          onClick={() => handleDelete(post)}
                          className="h5 text-danger pointer pr-2 pl-2"
                        />
                      </Tooltip>
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

    </AdminRoute>
  );
};

export default AdminPostIndex;
