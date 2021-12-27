import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import { Menu } from "antd";
// unlike react-router-dom dont destructure {Link}
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import SearchForm from "../forms/SearchForm";

const TopNav = () => {
  const [current, setCurrent] = useState("");
  // context
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // router
  const router = useRouter();
  // destructure components from Menu
  const { Item, SubMenu, ItemGroup } = Menu;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);


  const logout = async () => {
    try {
      const { data } = await axios.get("/api/logout");
      dispatch({ type: "LOGOUT" });
      window.localStorage.removeItem("user");
      if (data) {
        toast(data.message);
        router.push("/");
      }
    } catch (err) {
      toast("Logout failed. Try again.");
    }
  };
 
  return (
    <>
     
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Item key="/">
          <Link href="/">
            <a className="">
            
              <img
                  src="/images/logo/codecontinue.png"
                  alt="code continue logo"
                  style={{ height: "34px", width: "100%", objectFit: "cover",marginBottom:"8px" }}     
                />
             
            </a>
          </Link>
        </Item>
        <Item>
          <SearchForm />
        </Item>
       
        <Item key="/listcourses">
          <Link href="/listcourses">
            <a className="typewriter">Courses</a>
          </Link>
        </Item>
       
        <Item key="/articles">
          <Link href="/articles">
            <a className="typewriter">Blog</a>
          </Link>
        </Item>
        {user && user.role && user.role.includes("Author") ? (
          <></>
        ) : (
          <Item key="/user/become-author">
            <Link href="/user/become-author">
              <a className="typewriter">Write Blog</a>
            </Link>
          </Item>
        )}

        {user &&
        user.role &&
        user.stripe_seller &&
        user.role.includes("Instructor") &&
        user.stripe_seller.charges_enabled ? (
          <></>
        ) : (
          <Item key="/user/become-instructor">
            <Link href="/user/become-instructor">
              <a className="typewriter">Tech on website</a>
            </Link>
          </Item>
        )}

        

        {user === null && (
          <>
            <Item
              key="/register"
              className="float-right border-2"
            >
              <Link href="/register">
                <a className="border-2">Register</a>
              </Link>
            </Item>

            <Item key="/login" className="float-right border-2">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>
          </>
        )}

        {user !== null && (
          <SubMenu
            title={user.name}
            className="float-right"
          >
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>

              <Item onClick={logout}>Logout</Item>
            </ItemGroup>
          </SubMenu>
        )}

        {user &&
          user.role &&
          user.stripe_seller &&
          user.role.includes("Instructor") &&
          user.stripe_seller.charges_enabled && (
            <Item
              key="/instructor"
              className="float-right"
            >
              <Link href="/instructor">
                <a className="typewriter">Instructor</a>
              </Link>
            </Item>
          )}

        {/* {user && user.courses && user.courses.length >= 1 && (
          <Item key="/user" className="float-right">
            <Link href="/user">
              <a className="typewriter">Student</a>
            </Link>
          </Item>
        )} */}

        {user && user.role && user.role.includes("Author") && (
          <Item key="/author" className="float-right">
            <Link href="/author">
              <a className="typewriter">Author</a>
            </Link>
          </Item>
        )}

        {user && user.role && user.role.includes("Admin") && (
          <Item key="/admin" className="float-right">
            <Link href="/admin">
              <a className="typewriter">Admin</a>
            </Link>
          </Item>
        )}
      </Menu>
    </>
  );
};

export default TopNav;
