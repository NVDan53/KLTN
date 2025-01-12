import { useState, useEffect, useContext } from "react";
import UserRoute from "../../components/routes/UserRoute";
import ContactForm from "../../components/forms/ContactForm";
import axios from "axios";
import Link from "next/link";
import { Tooltip } from "antd";
import {
  CheckOutlined,
  LoadingOutlined,
  IssuesCloseOutlined,
  DeleteOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { Context } from "../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const UserIndex = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

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
    loadUserIssues();
  }, [token]);

  const loadUserIssues = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/user/issues",
      {
        headers: { Authorization: token },
      }
    );
    console.log(data);
    setIssues(data);
  };

  const markResolved = async (issueId) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `https://stress-apps.herokuapp.com/api/user/issue/mark-resolved`,
        {
          issueId,
        },
        {
          headers: { Authorization: token },
        }
      );
      loadUserIssues();
      // console.log("ISSUE RESOLVED =>", data);
      toast("You marked it resolved");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast("Error!");
      setLoading(false);
    }
  };

  const deleteIssue = async (issueId) => {
    console.log(issueId);
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `https://stress-apps.herokuapp.com/api/user/issue/delete/${issueId}`,
        {
          headers: { Authorization: token },
        }
      );
      loadUserIssues();
      // console.log("ISSUE RESOLVED =>", data);
      toast("Issue deleted");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast("Error!");
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="/user" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>Support</li>
        </ul>
      </div>

      <div className="container-fluid">
        <div className="row pt-2">
          <div className="col-md-12 pb-5">
            <div className="lead alert alert-primary">
              Contact our help and support team using the form below for any
              issues.
            </div>

            <ContactForm loadUserIssues={loadUserIssues} />
          </div>
        </div>

        {/* show provious support posts */}
        <div className="row pt-2">
          {/* <pre>{JSON.stringify(issues, null, 4)}</pre> */}

          {issues.map((issue) => (
            <div key={issue._id} className="col-md-12 pb-4">
              <ul className="list-group">
                <li className="list-group-item">
                  {issue.course_url ? (
                    <Link href={issue.course_url}>
                      <a target="_blank">{issue.course_url}</a>
                    </Link>
                  ) : (
                    "No URL"
                  )}
                </li>

                <li className="list-group-item">
                  {new Date(issue.createdAt).toLocaleDateString()} <br />
                  {issue.message}
                </li>
                {/* bottom icons */}
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    {!issue.resolved ? (
                      <>
                        {loading ? (
                          <LoadingOutlined className="text-success h4" />
                        ) : (
                          <span
                            onClick={() => markResolved(issue._id)}
                            className="pointer"
                          >
                            {
                              <IssuesCloseOutlined className="text-success h4" />
                            }{" "}
                            Mark Resolved
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <CheckOutlined className="text-success h4" /> You marked
                        it resolved on{" "}
                        {new Date(issue.updatedAt).toLocaleDateString()}{" "}
                      </>
                    )}

                    <Tooltip title="Delete">
                      <DeleteOutlined
                        onClick={() => deleteIssue(issue._id)}
                        className="text-danger h4"
                      />
                    </Tooltip>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
