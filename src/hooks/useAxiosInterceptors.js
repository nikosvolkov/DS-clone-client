import React, { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import $api from '../api';
import useAuth from './useAuth';

const useAxiosInterceptors = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = $api.interceptors.request.use(
      (config) => {
        console.log('Config headers: ',config.headers);
        
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        console.log('Отправляемый токен: ', config.headers['Authorization']);

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = $api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log(prevRequest);
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log("Токен истек, обновляем...");
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return $api(prevRequest);
        }
      }
    );
    return () => {
      console.log('Удаляем интерцепторы')
      $api.interceptors.response.eject(responseInterceptor);
      $api.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return $api;
};

export default useAxiosInterceptors;
