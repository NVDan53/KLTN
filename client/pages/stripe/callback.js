import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context';
import { SyncOutlined } from '@ant-design/icons';
import UserRoute from '../../components/routes/UserRoute';
import axios from 'axios';

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem('token'));
    }
  });

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem('token'));
    setToken(tokenStorage);
  }, []);

  useEffect(() => {
    // console.log(user);
    if (user)
      axios
        .post(
          'https://stress-apps.herokuapp.com/api/get-account-status',
          null,
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          console.log('GET_ACCOUNT_STATUS_RES -> ', res);
          dispatch({
            type: 'LOGIN',
            payload: res.data,
          });
          window.localStorage.setItem('user', JSON.stringify(res.data));
          window.location.href = '/instructor';
        });
  }, [user, token]);

  return (
    <UserRoute>
      <SyncOutlined
        spin
        className="d-flex justify-content-center display-1 text-primary p-5"
      />
    </UserRoute>
  );
};

export default StripeCallback;
