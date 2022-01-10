import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../context";

export default function withAuth(Component) {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem("token"));
    }
  });

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenStorage);
  }, []);

  const withAuth = (props) => {
    return <Component {...props} />;
  };

  withAuth.getServerSideProps = async (ctx) => {
    try {
      const { data } = await axios.get(
        `https://stress-apps.herokuapp.com/api/current-user`,
        {
          headers: { Authorization: token },
        }
      );
      console.log("data ===> ", data);
      if (data)
        return {
          props: {
            ok: true,
          },
        };
    } catch (err) {
      console.log(err);
      // return { props: { ok: false } };
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  };

  return withAuth;
}
