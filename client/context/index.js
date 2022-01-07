import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// initial state
const initialState = {
  user: null,
  token: null,
};

// if auth is found in localstorage, use that as default value
if (process.browser && window.localStorage.getItem("user")) {
  initialState.auth = JSON.parse(window.localStorage.getItem("user"));
}

if (process.browser && window.localStorage.getItem("token")) {
  initialState.token = JSON.parse(window.localStorage.getItem("token"));
}

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null, token: null };
    case "GET_TOKEN":
      return { ...state, token: action.payload };
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

    dispatch({
      type: "GET_TOKEN",
      payload: JSON.parse(window.localStorage.getItem("token")),
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
      console.log("ERORRRRR:", error);

      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("http://localhost:8000/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              window.localStorage.removeItem("token");
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
      const { data } = await axios.get("http://localhost:8000/api/csrf-token");
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
