import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const ContactForm = ({ loadUserIssues = (f) => f }) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem("token"));
    }
  });

  // context
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem("token"));
    setToken(tokenStorage);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://stress-apps.herokuapp.com/api/contact-support",
        {
          url,
          name,
          email,
          message,
        },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      toast(
        "Thank you. We will try our best to resolve your issue as soon as possible"
      );
      //   console.log("contact support", data);
      setLoading(false);
      setUrl("");
      setMessage("");
      loadUserIssues();
    } catch (err) {
      toast("Form submit failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group pt-3">
        <label className="text-rr h5">
          Course URL{" "}
          <small>
            <u>
              Paste full url of the course you were trying to enroll (if any)
            </u>
          </small>{" "}
        </label>
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          className="form-control"
          value={url}
        />
      </div>

      <label className="text-rr h5">Issue</label>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="form-control"
        value={message}
        rows="5"
        required
      />
      <button
        type="submit"
        className="btn btn-lg btn-block btn-primary mt-4 bg-rr"
        style={{ border: "1px solid #fff" }}
        disabled={!message || loading}
      >
        {loading ? <SyncOutlined spin /> : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
