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
    <div>
      <h1 className="jumbotron text-center bg-primary square">
        Enter new password
      </h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={data}
            onChange={handleChangePassword}
            placeholder="Enter new password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary p-2"
            disabled={!data || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default resetPassword;
