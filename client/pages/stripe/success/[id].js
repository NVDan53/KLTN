import { useEffect, useContext, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import UserRoute from "../../../components/routes/UserRoute";
import { useRouter } from "next/router";
import axios from "axios";
import { Context } from "../../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const StripeSuccess = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  // router
  const router = useRouter();
  const { id } = router.query;

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem("token"));
    }
  });

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenStorage);
  }, []);

  useEffect(() => {
    if (id) successRequest();
  }, [id, token]);

  const successRequest = async () => {
    try {
      const { data } = await axios.get(
        `https://stress-apps.herokuapp.com/api/stripe-success/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("STRIPE SUCCESS FROM BACKEND => ", data);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      router.push(`/user`);
    }
  };

  return (
    <UserRoute showNav={false}>
      {/* <h1 className="jumbotron text-center square">User Dashboard</h1> */}
      <div className="row text-center">
        <div className="col-md-9 pb-5">
          <div className="d-flex justify-content-center p-5">
            <SyncOutlined spin className="display-1 text-danger p-5 h4" />
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </UserRoute>
  );
};

export default StripeSuccess;
