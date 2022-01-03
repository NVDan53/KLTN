import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../../context";
import { GoogleLogin } from "react-google-login";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // context
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  // redirect if already logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);
  const responseGoogle = async (response) => {
    console.log(response);
    try {
      setLoading(true);
      const res = await axios.post("/api/google_login", {
        tokenId: response.tokenId,
      });

      dispatch({
        type: "LOGIN",
        payload: res.data,
      });

      toast.success("Login successfully");

      window.localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role.includes("Admin")) {
        router.push("/admin");
      } else if (res.data.role.includes("Instructor")) {
        router.push("/instructor");
      } else {
        router.push("/user");
      }
      setLoading(false);
    } catch (error) {
      toast(error.response.data.msg);
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://stress-apps.herokuapp.com/api/register`,
        {
          name,
          email,
          password,
        }
      );
      // console.log(data);
      if (data.ok) {
        // toast("Registration successful. Please login");
        // toast("Please check your email and click on the activation link.");
        toast(data.msg);
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Create your account
            </h1>
            <form
              className="mt-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name
                  id
                  placeholder="Enter name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autoComplete
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name
                  id
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autofocus
                  autoComplete
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name
                  id
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={!name || !email || !password || loading}
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
              >
                {loading ? <SyncOutlined spin /> : "Sign Up"}
              </button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Have an account?{" "}
              <Link href="/login">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Log in now
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src="/images/registerbg.jpg" alt="" className="w-full h-full" />
        </div>
      </section>
    </>
  );
};

export default Register;
