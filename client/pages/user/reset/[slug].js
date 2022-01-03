import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

function resetPassword() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  // Context
  const {
    state: { user },
  } = useContext(Context);

  // Router
  const router = useRouter();
  const token = router.query.slug;

  console.log(token);

  const handleChangePassword = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resetPassword = async () => {
        const res = await axios.post(
          "https://stress-apps.herokuapp.com/api/reset-password",
          { password: data }
        );
        setLoading(false);
        toast(res.data.msg);
        router.push("/login");
      };
      resetPassword();
    } catch (error) {
      setLoading(false);
      error.response.data.msg && toast(error.response.data.msg);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
  
    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
    flex items-center justify-center">
      <div className="w-full h-100">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Reset Password?</h1>
        
        <form className="mt-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <input type="password" 
            name id placeholder="Enter new password" 
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" 
            autofocus autoComplete required
            value={data}
            onChange={handleChangePassword}/>
          </div>
         
          <button type="submit" 
         disabled={!data || loading}
          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
          px-4 py-3 mt-6">{loading ? <SyncOutlined spin /> : "Submit"}</button>
           
        </form>
  
      </div>
    </div>
    <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img src="/images/forgotpassswordbg.png" alt="" className="w-full h-full" />
    </div>
  </section>
  );
}

export default resetPassword;
