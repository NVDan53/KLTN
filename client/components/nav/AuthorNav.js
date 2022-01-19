import { useState, useEffect } from "react";
import Link from "next/link";

const AuthorNav = () => {
  const [current, setCurrent] = useState("");

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
          <Link href="/author">
            <a
              className={`nav-link ${current === "/author" && "active"}`}
              className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            >
              <i class="fas fa-tachometer-alt" style={{ fontSize: "24px" }}></i>
              <span className="mx-3">Dashboard</span>
            </a>
          </Link>
          <Link href="/author/post/create">
            <a
              className={`nav-link ${
                current === "/author/post/create" && "active"
              }`}
              className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            >
              <i class="fas fa-edit" style={{ fontSize: "24px" }}></i>
              <span className="mx-3">Write a post</span>
            </a>
          </Link>

          <Link href="/user/support">
            <a
              className={`nav-link ${current === "/user/support" && "active"}`}
              className="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              href="/tables"
            >
              <i
                class="far fa-question-circle h-6 w-6"
                style={{ fontSize: "24px" }}
              ></i>
              <span className="mx-3">Help</span>
            </a>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default AuthorNav;
