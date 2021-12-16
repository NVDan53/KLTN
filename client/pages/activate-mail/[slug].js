import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const URL_DEPLOY = process.env.URL_DEPLOY;

function ActivationEmail() {
  const router = useRouter();
  const activation_token = router.query.slug;
  console.log(activation_token);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${URL_DEPLOY}/api/activate`, {
            activation_token,
          });
          setSuccess(res.data.msg);
          toast(res.data.msg);
        } catch (error) {
          error.response.data.msg && setError(error.response.data.msg);
          toast(res.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="active_page">
      {success && <p>Active successfully</p>}
      {error && <p>Active failed</p>}
    </div>
  );
}

export default ActivationEmail;
