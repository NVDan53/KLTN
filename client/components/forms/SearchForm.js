import React, { useState } from "react";
import "antd/dist/antd.css";
import { Input } from "antd";
import Link from "next/link";
import axios from "axios";
const { Search } = Input;

function SearchForm() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const { courses, posts } = data;

  const handleSearch = async (value, e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await axios.get(`/api/search?name=${search}`);
      console.log("SEARCH RESULT:", res);
      setData(res.data);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      console.log("ERRROR:", err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Search
        value={search}
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading={load}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />
      <div
        style={{
          position: "absolute",
          zIndex: "20",
          width: "100%",
          minWidth: "250px",
          maxHeight: "calc(100vh - 150px)",
          overflow: "auto",
          marginTop: "3px",
          background: "#333",
        }}
      >
        {search && courses?.map((course) => <p>{course.name}</p>)}

        {search &&
          posts?.map((post) => {
            return (
              <li>
                <Link href={`/article/${post.slug}`}>
                  <a className="reset-before">{post.title}</a>
                </Link>
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default SearchForm;
