import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import {
  DollarOutlined,
  SettingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { stripeCurrencyFormatter } from "../../utils/helpers";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
    // console.log("send balance request");
    const { data } = await axios.get(`/api/instructor/balance`);
    // console.log(data);
    setBalance(data);
  };

  const handlePayoutSetting = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get("/api/instructor/payout-settings");
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
     <div className="text-blue-900 text-sm rounded-md"style={{margin:"16px"}}>
        <ul className="flex">
          <li><a href="/instructor" className="underline font-semibold">Dashboard</a></li>
          <li><span className="mx-2">/</span></li>  
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
            <hr className="py-3"/>
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
            <hr className="py-3"/>
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
