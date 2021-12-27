import React, { useRef, useState } from "react";
import "antd/dist/antd.css";
import { Input } from "antd";
import Link from "next/link";
import axios from "axios";
const { Search } = Input;

function SearchForm() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const typingTimeoutRef = useRef(null);

  const { courses, posts } = data;

  const handleSearch = async (value, e) => {
    e.preventDefault();

    console.log("VALUE", value);
    if (!value || value.search === "") return;
    try {
      setLoad(true);
      const res = await axios.get(`/api/search?name=${value.search}`);
      console.log("SEARCH RESULT:", res);
      setData(res.data);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      console.log("ERRROR:", err);
    }
  };

  const handleOnChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    // if (!search) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        search: value,
      };

      handleSearch(formValues, e);
    }, 600);
  };

  return (
    <form style={{ position: "relative" }} autoComplete="off">
      <Input placeholder="Search courses and blogs" loading={load}
        onChange={handleOnChange}
        onSearch={handleSearch} 
        />
      {/* <Search
        value={search}
        placeholder="Find courses and blogs"
       
        size="large"
        loading={load}
        onChange={handleOnChange}
        onSearch={handleSearch}
      /> */}
      <ul
        style={{
          position: "absolute",
          zIndex: "99",
          color:"#333 !important",
          width: "100%",
          minWidth: "250px",
          maxHeight: "calc(100vh - 150px)",
          overflowY: "hidden",
          overflowX: "hidden",
          marginTop: "3px",
          background: "#fff",
          padding: "0 11px",
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
                }}
              >
                <Link href={`/course/${course.slug}`}>
                  <a
                    style={{
                      display: "block",
                    }}
                    className="reset-before"
                  >
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
                }}
              >
                <Link href={`/article/${post.slug}`}>
                  <a className="reset-before">{post.title}</a>
                </Link>
              </li>
            );
          })}
      </ul>
    </form>
  );
}

export default SearchForm;
