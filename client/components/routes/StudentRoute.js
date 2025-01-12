import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";
// import { getToken } from "../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const StudentRoute = ({ children, showNav = true }) => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [ok, setOk] = useState(false);
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem("token"));
    }
  });
  const router = useRouter();

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenStorage);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      let { data } = await axios.get(
        "https://stress-apps.herokuapp.com/api/current-user",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("current-user", data);
      //   console.log("data", data);
      if (data.ok) setOk(true);
    } catch (err) {
      // alert("no user");
      router.push("/login");
    }
  };

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <div className="container-fluid">{children}</div>
  );
};

export default StudentRoute;
