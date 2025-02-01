import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAxiosInterceptors from '../hooks/useAxiosInterceptors';

const User = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const $api = useAxiosInterceptors();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await $api.get('/v1/users/@me', {
          signal: controller.signal,
        });
        console.log(response);
        isMounted && setUser(response.data);
      } catch (error) {
        console.error('Error during user fetching: ', error);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <div>User</div>;
};

export default User;
