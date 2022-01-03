import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import AdminRoute from "../../components/routes/AdminRoute";
const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;
const { TabPane } = Tabs;

const AdminIndex = () => {
  const [users, setUsers] = useState([
    {
      name: "",
      email: "",
      email_verified: Boolean,
      role: [],
      courses: [],
      stripe_account_id: "",
      stripe_seller: {},
      stripeSession: {},
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [issues, setIssues] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadUsers();
    loadCategories();
    loadPosts();
    loadIssues();
    loadCourses();
  }, []);

  const loadUsers = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/admin/users"
    );
    setUsers(data);
  };
  const loadCategories = async () => {
    try {
      let { data } = await axios.get("/api/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadPosts = async () => {
    const { data } = await axios.get("/api/admin/posts");
    setPosts(data);
  };
  const loadIssues = async () => {
    const { data } = await axios.get("/api/admin/issues");
    setIssues(data);
  };
  const loadCourses = async () => {
    // const { data } = await axios.get(`${process.env.API}/courses`);
    // // console.log(data);
    // return {
    //   props: {
    //     courses: data,
    //   },
    //   setCourses(data);
    // };
    try {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminRoute>
      {/* <h1 className="jumbotron text-center square">...</h1> */}

      <p className="text-gray-900 whitespace-no-wrap font-semibold">
        {users.length} users
      </p>
      <p className="text-gray-900 whitespace-no-wrap font-semibold">
        {categories.length} categories
      </p>
      <p className="text-gray-900 whitespace-no-wrap font-semibold">
        {posts.length} posts
      </p>
      <p className="text-gray-900 whitespace-no-wrap font-semibold">
        {issues.length} issues
      </p>
      <p className="text-gray-900 whitespace-no-wrap font-semibold">
        {courses.length > 1
          ? `${courses.length} courses`
          : `${courses.length} course`}
      </p>
    </AdminRoute>
  );
};

export default AdminIndex;
