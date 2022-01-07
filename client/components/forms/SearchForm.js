import React, { useRef, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Input } from "antd";
import Link from "next/link";
import axios from "axios";
import {
  LoginOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  CarryOutOutlined,
  TeamOutlined,
  CoffeeOutlined,
  AudioOutlined,
  DesktopOutlined,
  FormOutlined,
  EditOutlined,
  ReadOutlined,
} from "@ant-design/icons";
const { Search } = Input;

function SearchForm() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const typingTimeoutRef = useRef(null);

  const { courses, posts } = data;

  const handleResults = (e) => {
    if (e.target.tagName === "INPUT") return;
    setShowResults(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleResults);

    return () => {
      document.removeEventListener("click", handleResults);
    };
  }, []);

  const handleSearch = async (value, e) => {
    e.preventDefault();

    if (!value || value.search === "") return;
    try {
      setLoad(true);
      setShowResults(true);
      const res = await axios.get(
        `http://localhost:8000/api/search?name=${value.search}`
      );
      setData(res.data);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      setShowResults(false);
    }
  };

  const handleOnChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        search: value,
      };

      handleSearch(formValues, e);
    }, 400);
  };

  return (
    <form style={{ position: "relative" }} autoComplete="off">
      <Input
        placeholder="Search courses and blogs"
        loading={load}
        onChange={handleOnChange}
        onSearch={handleSearch}
        onFocus={() => setShowResults(true)}
        style={{
          marginLeft: "70px",
          width: "400px",
          borderRadius: "50px",
          marginTop: "5px",
          marginBottom: "5px",
        }}
        prefix={<i class="fas fa-search mr-2 text-gray-400"></i>}
      />

      {showResults && (
        <ul
          // className="border border-gray-900"
          style={{
            position: "absolute",
            zIndex: "99",
            color: "#333 !important",
            width: "100%",
            minWidth: "250px",
            maxHeight: "calc(100vh - 150px)",
            overflowY: "hidden",
            overflowX: "hidden",
            marginTop: "6px",
            background: "#fff",
            marginLeft: "70px",
            // padding: "0 11px",
            // border:"1px solid #333"
            // boxShadow:"0 0 7px 4px #33333326",
          }}
        >
          {search &&
            courses?.map((course) => {
              return (
                <li
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "1",
                    padding: "0 11px",
                  }}
                >
                  <Link href={`/course/${course.slug}`}>
                    <a
                      style={{
                        display: "block",
                      }}
                      className="reset-before text-dark"
                    >
                      <i className="fas fa-chalkboard-teacher mr-2 text-gray-400"></i>
                      {course.name}
                    </a>
                  </Link>
                </li>
              );
            })}

          {search &&
            posts?.map((post) => {
              return (
                <li
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "1",
                    padding: "0 11px",
                  }}
                >
                  <Link href={`/article/${post.slug}`}>
                    <a className="reset-before  text-dark">
                      <i className="far fa-file-alt mr-2 text-gray-400"></i>
                      {post.title}
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </form>
  );
}

export default SearchForm;
