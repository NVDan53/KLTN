import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import {
  DollarOutlined,
  SettingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { stripeCurrencyFormatter } from "../../utils/helpers";
import { Context } from "../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const InstructorRevenue = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [balance, setBalance] = useState({ pending: [] });
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
    sendBalanceRequest();
  }, [token]);

  const sendBalanceRequest = async () => {
    // console.log("send balance request");
    const { data } = await axios.get(
      `https://stress-apps.herokuapp.com/api/instructor/balance`,
      {
        headers: { Authorization: token },
      }
    );
    // console.log(data);
    setBalance(data);
  };

  const handlePayoutSetting = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://stress-apps.herokuapp.com/api/instructor/payout-settings",
        {
          headers: { Authorization: token },
        }
      );
      console.log(data);
      window.location.href = data;
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Unable to access payout settings. Try again.");
    }
  };

  return (
    <InstructorRoute>
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
          <li>Revenue</li>
        </ul>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 p-5 bg-white">
            <h2 class="text-2xl ">
              Revenue Report <DollarOutlined className="float-right" />
            </h2>
            <small>
              You get paid directly from stripe to your bank account, every 2
              days.
            </small>
            <hr className="py-3" />
            <h4>
              Pending Balance
              {balance.pending &&
                balance.pending.map((bp, i) => (
                  <span key={i} className="float-right">
                    {stripeCurrencyFormatter(bp)}
                  </span>
                ))}
              <br />
            </h4>
            <small>For the last 2 days.</small>
            <hr className="py-3" />
            <h4>
              Payouts{" "}
              {!loading ? (
                <SettingOutlined
                  className="float-right pointer"
                  onClick={handlePayoutSetting}
                />
              ) : (
                <SyncOutlined spin className="float-right pointer" />
              )}
            </h4>
            <small>
              Update your stripe account details or view previous payouts.
            </small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
