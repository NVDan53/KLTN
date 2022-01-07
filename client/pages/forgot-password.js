import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [success, setSuccess] = useState(false);
  // const [code, setCode] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // context
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // router
  const router = useRouter();

  // redirect if already logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // send code to user email
      let { data } = await axios.post(
        `http://localhost:8000/api/forgot-password`,
        {
          email,
        }
      );
      // shoe code input field
      // setSuccess(true);
      setLoading(false);
      // ask user to check email and enter code
      toast("Check your email for the secret code.");
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
              Forgot Password?
            </h1>

            <form
              className="mt-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
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

              <button
                type="submit"
                disabled={!email || loading}
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
              >
                {loading ? <SyncOutlined spin /> : "Reset Password"}
              </button>
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
            </form>
          </div>
        </div>
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="/images/forgotpassswordbg.png"
            alt=""
            className="w-full h-full"
          />
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
