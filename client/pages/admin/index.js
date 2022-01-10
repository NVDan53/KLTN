import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Tabs } from "antd";
import AdminRoute from "../../components/routes/AdminRoute";
import { Context } from "../../context";
// import { getToken } from "../../context";

const { TabPane } = Tabs;

const AdminIndex = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

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

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem("token"));
    }
  });

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenStorage);
  }, []);

  useEffect(() => {
    loadUsers();
    loadCategories();
    loadPosts();
    loadIssues();
    loadCourses();
  }, [token]);

  const loadUsers = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/admin/users",
      {
        headers: { Authorization: token },
      }
    );
    setUsers(data);
  };
  const loadCategories = async () => {
    try {
      let { data } = await axios.get(
        "https://stress-apps.herokuapp.com/api/categories"
      );
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadPosts = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/admin/posts"
    );
    setPosts(data);
  };
  const loadIssues = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/admin/issues",
      {
        headers: { Authorization: token },
      }
    );
    setIssues(data);
  };
  const loadCourses = async () => {
    try {
      const { data } = await axios.get(
        "https://stress-apps.herokuapp.com/api/courses"
      );
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminRoute>
      {/* <h1 className="jumbotron text-center square">...</h1> */}

      <div className="">
        {/* Statistics Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4"
          style={{ display: "flex" }}
        >
          <div
            className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-gray-600 text-white font-medium group"
            style={{ width: "300px" }}
          >
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <i className="fas fa-users text-dark text-2xl"></i>
            </div>
            <div className="text-right">
              <p className="text-2xl">{users.length}</p>
              <p>Users</p>
            </div>
          </div>
          <div
            className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-gray-600 text-white font-medium group"
            style={{ width: "300px" }}
          >
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <i className="fas fa-book text-dark text-2xl"></i>
            </div>
            <div className="text-right">
              <p className="text-2xl">{categories.length}</p>
              <p>Categories</p>
            </div>
          </div>
          <div
            className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-gray-600 text-white font-medium group"
            style={{ width: "300px" }}
          >
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <i className="fas fa-paste text-dark text-2xl"></i>
            </div>
            <div className="text-right">
              <p className="text-2xl">{posts.length}</p>
              <p>Posts</p>
            </div>
          </div>
          <div
            className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-gray-600 text-white font-medium group"
            style={{ width: "300px" }}
          >
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <i className="fas fa-video text-dark text-2xl"></i>
            </div>
            <div className="text-right">
              <p className="text-2xl">
                {courses.length > 1
                  ? `${courses.length} `
                  : `${courses.length} `}
              </p>
              <p>Courses</p>
            </div>
          </div>
        </div>
        {/* ./Statistics Cards */}
      </div>

      {/* Client Table */}
      <div className="m-4">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        {/* <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          />
                        </div> */}
                        <div>
                          <p className="font-semibold">{user.name} </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {JSON.stringify(user.role)}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ./Client Table */}
    </AdminRoute>
  );
};

export default AdminIndex;
