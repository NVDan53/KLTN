import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";
import { Context } from "../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const InstructorRoute = ({ children }) => {
  const {
    state: { user, token },
    dispatch,
  } = useContext(Context);

  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      let { data } = await axios.get(
        "https://stress-apps.herokuapp.com/api/current-instructor",
        {
          headers: { Authorization: token },
        }
      );
      // console.log("current-user", data);
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
        <div className="col-md-2 bg-gray-100">
          <InstructorNav />
        </div>
        <div className="col-md-10 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default InstructorRoute;
