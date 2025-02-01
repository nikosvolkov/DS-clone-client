import useAuth from './useAuth';
import { REFRESH_URL } from '../api/consts';
import $api from '../api';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await $api.post(REFRESH_URL);
    setAuth((prev) => {
      console.log('Prev token: ', prev.accessToken);
      console.log('New token: ', response.data.token);
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
