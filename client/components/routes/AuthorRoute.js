import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import AuthorNav from "../nav/AuthorNav";
import { Context } from "../../context";
// import { getToken } from "../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const AuthorRoute = ({ children }) => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  // const [token, setToken] = useState(
  //   JSON.parse(window.localStorage.getItem("token"))
  // );

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem("token"));
    }
  });

  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenStorage);
  }, []);

  useEffect(() => {
    fetchAuthor();
  }, [token]);

  const fetchAuthor = async () => {
    try {
      let { data } = await axios.get(
        "https://stress-apps.herokuapp.com/api/current-author",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("current-author", data);
      //   console.log("data", data);
      if (data.ok) setOk(true);
    } catch (err) {
      // alert("no user");
      router.push("/");
    }
  };

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 bg-gray-200">
          <AuthorNav />
        </div>
        <div className="col-md-10 bg-gray-200">{children}</div>
      </div>
    </div>
  );
};

export default AuthorRoute;
