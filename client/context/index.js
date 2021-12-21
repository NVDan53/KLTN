import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

// initial state
const initialState = {
  user: null,
};

// if auth is found in localstorage, use that as default value
if (process.browser && window.localStorage.getItem("user")) {
  initialState.auth = JSON.parse(window.localStorage.getItem("user"));
}

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  // router
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("https://stress-apps.herokuapp.com/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((err) => {
              console.log("axios interceptor res error ==> ", err);
              reject(error);
            });
        });
      }

      return Promise.reject(error);
    }
  );

  // to protect from csrf
  // https://www.synopsys.com/glossary/what-is-csrf.html
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        "https://stress-apps.herokuapp.com/api/csrf-token"
      );
      // console.log(data);
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
