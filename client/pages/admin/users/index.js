import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Tooltip } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import AdminRoute from "../../../components/routes/AdminRoute";

import { Context } from "../../../context";

const AdminUsersIndex = () => {
  const {
    state: { user, token },
    dispatch,
  } = useContext(Context);

  const [users, setUsers] = useState([
    {
      name: "",
      email: "",
      email_verified: Boolean,
      role: [],
      courses: [],
      stripe_account_id: "",
      stripe_seller: {},
      stripeSession: {},
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await axios.get(
      "https://stress-apps.herokuapp.com/api/admin/users",
      {
        headers: { Authorization: token },
      }
    );
    setUsers(data);
  };

  return (
    <AdminRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="/admin" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>List users</li>
        </ul>
      </div>
      <div>
        <div className="inline-block w-full shadow rounded-lg overflow-hidden mb-4">
          <table className="w-full bg-white leading-normal">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="xyz hover:bg-sky-100">
                  <td className="px-4 py-4 border-b border-gray-200  text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {" "}
                      {user.name}{" "}
                    </p>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200  text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {" "}
                      {user.email}
                    </p>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200   text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {JSON.stringify(user.role)}
                    </p>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200   text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
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

export default AdminUsersIndex;
