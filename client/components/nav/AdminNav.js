import { useState, useEffect } from "react";
import Link from "next/link";

const AdminNav = () => {
  const [current, setCurrent] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <>
      <div
        className="min-h-screen bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
        style={{ height: "100%", marginLeft: "-15px" }}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="text-white text-2xl mx-2 font-semibold">Menu</span>
          </div>
        </div>
        <nav className="mt-10">
          <Link href="/admin">
            <a
              className={`nav-link ${current === "/admin" && "active"}`}
              className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            >
              <i class="fas fa-tachometer-alt" style={{ fontSize: "24px" }}></i>
              <span className="mx-3">Dashboard</span>
            </a>
          </Link>
          {/* <Link href="/admin/users">
            <a className={`nav-link ${current === "/admin/users" && "active"}`}className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
            <i class="fas fa-users"style={{fontSize:"24px"}}></i>
          <span className="mx-3">List Users</span>
        </a>
        </Link> */}

          <Link href="/admin/category">
            <a
              className={`nav-link ${
                current === "/admin/category" && "active"
              }`}
              className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              href="/tables"
            >
              <i class="fas fa-book h-6 w-6" style={{ fontSize: "24px" }}></i>
              <span className="mx-3">List Categories</span>
            </a>
          </Link>

          <Link href="/admin/issues">
            <a
              className={`nav-link ${current === "/admin/issues" && "active"}`}
              className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              href="/tables"
            >
              <i
                class="fas fa-envelope h-6 w-6"
                style={{ fontSize: "24px" }}
              ></i>
              <span className="mx-3">List Issues</span>
            </a>
          </Link>

          <Link href="/admin/posts">
            <a
              className={`nav-link ${
                current === "/admin/category" && "active"
              }`}
              className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              href="/tables"
            >
              <i class="fas fa-paste h-6 w-6" style={{ fontSize: "24px" }}></i>
              <span className="mx-3">List Posts</span>
            </a>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default AdminNav;
