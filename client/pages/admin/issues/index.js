import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Tooltip } from "antd";
import {
  CheckOutlined,
  LoadingOutlined,
  WarningOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AdminRoute from "../../../components/routes/AdminRoute";
import Link from "next/link";
import { toast } from "react-toastify";
import { Context } from "../../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const AdminIssuesIndex = () => {
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
    loadIssues();
  }, [token]);

  const loadIssues = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/admin/issues",
      {
        headers: { Authorization: token },
      }
    );
    setIssues(data);
  };

  // resolved, url, name, email, postedBy[name, email], createdAt
  /**
   * to resolve, admin need to know
   * the course url (to know the course user was trying to enroll)
   * the user id (to know who is trying to enroll)
   */

  const handleEnrollmentIssue = async (issue) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://stress-apps.herokuapp.com/api/admin/refresh-user-status`,
        {
          userId: issue.postedBy._id,
          courseUrl: issue.course_url,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log("SESSION REFRESH =>", data);
      toast(data.message);
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
        `https://stress-apps.herokuapp.com/api/admin/issue/delete/${issueId}`,
        {
          headers: { Authorization: token },
        }
      );
      loadIssues();
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
    <AdminRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="/instructor" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>List categories</li>
        </ul>
      </div>
      <div>
        <div className="inline-block w-full shadow rounded-lg overflow-hidden mb-4 mt-4">
          <table className="w-full bg-white leading-normal">
            <thead>
              <tr>
                <th className="pl-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Link course
                </th>
                <th className="pl-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>{" "}
                <th className="pl-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>{" "}
                <th className="pl-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>{" "}
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id} className="xyz hover:bg-sky-100">
                  <td className="pl-4 py-4 border-b border-gray-200  text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {issue.course_url ? (
                        <Link href={issue.course_url}>
                          <a target="_blank">{issue.course_url}</a>
                        </Link>
                      ) : (
                        "No URL"
                      )}
                    </p>
                  </td>
                  <td
                    className="pl-4 py-4 border-b border-gray-200  text-sm"
                    style={{ width: "500px" }}
                  >
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {issue.message}
                    </p>
                  </td>
                  <td className="pl-4 py-4 border-b border-gray-200  text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {issue.postedBy.email}
                    </p>
                  </td>
                  <td className="pl-4 py-4 border-b border-gray-200  text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 border-b border-gray-200  text-sm ">
                    {issue.resolved ? (
                      <Tooltip title="Resolved">
                        {loading ? (
                          <LoadingOutlined className="text-success h4 pr-2" />
                        ) : (
                          <CheckOutlined className="text-success h4 pr-2" />
                        )}
                      </Tooltip>
                    ) : (
                      <Tooltip title="Not resolved">
                        {loading ? (
                          <LoadingOutlined className="text-danger h4 pr-2" />
                        ) : (
                          <WarningOutlined
                            onClick={() => handleEnrollmentIssue(issue)}
                            className="text-danger h4 pointer pr-2"
                          />
                        )}
                      </Tooltip>
                    )}

                    <Tooltip title="Delete">
                      <DeleteOutlined
                        onClick={() => deleteIssue(issue._id)}
                        className="text-danger h4"
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminRoute>
  );
};

export default AdminIssuesIndex;
