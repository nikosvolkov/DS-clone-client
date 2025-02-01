import { useEffect, useLayoutEffect, useState } from 'react';
import './styles/App.css';
import $api from './api';
import Login from './pages/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Register from './pages/Register';
import Layout from './pages/Layout';
import LinkPage from './pages/LinkPage';
import User from './pages/User';

function App() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const fetchMe = async () => {
  //     try {
  //       const response = await $api.get('/v1/users/@me');
  //       setToken(response.data.token);
  //     } catch (error) {
  //       console.error('Token is empty: ', error);
  //       setToken(null);
  //     }
  //   };
  //   fetchMe();
  // }, []);

  // useLayoutEffect(() => {
  //   const authInterceptor = $api.interceptors.request.use((config) => {
  //     config.headers.Authorization =
  //       !config._retry && token
  //         ? `Bearer ${token}`
  //         : config.headers.Authorization;
  //     return config;
  //   });
  //   return () => {
  //     $api.interceptors.request.eject(authInterceptor);
  //   };
  // }, [token]);

  // useLayoutEffect(() => {
  //   const refreshInterceptor = $api.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     async (error) => {
  //       const originalRequest = error.config;
  //       // console.log(originalRequest);

  //       if (
  //         error.response.status === 401 &&
  //         error.response.message === 'Unauthorized'
  //       ) {
  //         try {
  //           const response = await $api.get('/v1/auth/refresh');

  //           setToken(response.data.token);
  //           originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
  //           originalRequest._retry = true;

  //           return $api(originalRequest);
  //         } catch (error) {
  //           console.error('Error during token refreshing', error);
  //           setToken(null);
  //         }
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  //   return () => {
  //     $api.interceptors.response.eject(refreshInterceptor);
  //   };
  // }, []);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={'register'} replace/>}/>
          <Route path="register" element={<Register />}/>
          <Route path="login" element={<Login />}/>
          <Route path="linkpage" element={<LinkPage />}/>
          <Route path="user" element={<User />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
