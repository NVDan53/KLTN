import { useState, useEffect } from "react";
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

const AdminIssuesIndex = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    const { data } = await axios.get("/api/admin/issues");
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
      const { data } = await axios.post(`/api/admin/refresh-user-status`, {
        userId: issue.postedBy._id,
        courseUrl: issue.course_url,
      });
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
      const { data } = await axios.delete(`/api/admin/issue/delete/${issueId}`);
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
         <div className="text-blue-900 text-sm rounded-md"style={{margin:"16px"}}>
        <ul className="flex">
          <li><a href="/admin" className="underline font-semibold">Dashboard</a></li>
          <li><span className="mx-2">/</span></li>  
          <li>List issues</li>
        </ul>
      </div>


      <div className="inline-block w-full shadow rounded-lg overflow-hidden mb-4">
     <table className="w-full bg-white leading-normal">
       <thead>
         <tr>
           <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Link course
           </th>
           <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Message
           </th>
           <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Email
           </th>
           <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Created at
           </th>
           <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
           Action
           </th>
         </tr>
       </thead>
       <tbody>
       {issues.map((issue) => (
            
         <tr key={issue._id}  className="xyz hover:bg-sky-100">
          
           <td className="px-4 py-4 border-b border-gray-200  text-sm">
             <p className="text-gray-900 whitespace-no-wrap font-semibold"> {issue.course_url ? (
                  <Link href={issue.course_url}>
                    <a target="_blank">{issue.course_url}</a>
                  </Link>
                ) : (
                  "No URL"
                )}</p>
           </td>
           <td className="px-4 py-4 border-b border-gray-200  text-sm">
             <p className="text-gray-900 whitespace-no-wrap font-semibold"style={{width:"430px"}}>{issue.message}</p>
           </td>
           <td className="px-4 py-4 border-b border-gray-200   text-sm">
             <p className="text-gray-900 whitespace-no-wrap">
             {issue.postedBy.email}
             </p>
           </td>
           <td className="px-4 py-4 border-b border-gray-200   text-sm">
             <p className="text-gray-900 whitespace-no-wrap">
             {new Date(issue.createdAt).toLocaleDateString()}
             </p>
           </td>
           <td className="px-4 py-4 border-b border-gray-200  text-sm">
             <p className="text-gray-900 whitespace-no-wrap font-semibold">  {issue.resolved ? (
                    <Tooltip title="Resolved">
                      {loading ? (
                        <LoadingOutlined className="text-success h4" />
                      ) : (
                        <CheckOutlined className="text-success h4" />
                      )}
                    </Tooltip>
                  ) : (
                    <Tooltip title="Not resolved">
                      {loading ? (
                        <LoadingOutlined className="text-danger h4" />
                      ) : (
                        <WarningOutlined
                          onClick={() => handleEnrollmentIssue(issue)}
                          className="text-danger h4 pointer"
                        />
                      )}
                    </Tooltip>
                  )}

                  <Tooltip title="Delete">
                    <DeleteOutlined
                      onClick={() => deleteIssue(issue._id)}
                      className="text-danger h4"
                    />
                  </Tooltip></p>
           </td>
         </tr>
        
         ))}
       </tbody>
     </table>
     
  
 
</div>
    </AdminRoute>
  );
};

export default AdminIssuesIndex;
