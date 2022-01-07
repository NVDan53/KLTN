import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import { Context } from "../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const UserRoute = ({ children, showNav = true }) => {
  const {
    state: { user, token },
    dispatch,
  } = useContext(Context);

  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let { data } = await axios.get("http://localhost:8000/api/current-user", {
        headers: { Authorization: token },
      });
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 bg-gray-100">{showNav && <UserNav />}</div>
        <div className="col-md-10 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default UserRoute;
