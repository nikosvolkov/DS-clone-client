import { useState } from 'react';
import { useNavigate } from 'react-router';
import $api from '../api';
import { useFingerprint } from '../hooks/useFingerprint';
import { LOGIN_URL } from '../api/consts';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const fingerprint = useFingerprint();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.includes('@')) {
      setErrorMessage('Not a valid email');
      throw new Error('Not a valid email');
    }

    try {
      const response = await $api.post(LOGIN_URL, {
        email: email,
        password: password,
        fingerprint: fingerprint,
      });
      console.log(response);
      const accessToken = response?.data?.token;
      setAuth({ accessToken });
      console.log('Access token: ', accessToken);
      setEmail('');
      setPassword('');
      navigate('/linkpage');
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrorMessage('No Server Response');
      } else if (error.response?.status === 401) {
        setErrorMessage('Unauthorized');
      } else if (error.response?.status === 400) {
        setErrorMessage('Missing username or password');
      } else if (error.response?.status === 404) {
        setErrorMessage('User is not found');
      } else {
        setErrorMessage('Login failed');
      }
    }
  };

  return (
    <section className="formSection">
      <p className={errorMessage ? 'errorMessage' : 'offscreen'}>
        {errorMessage}
      </p>
      <h1 className="formHeader">Welcome Back!</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email address or phone number</label>
          <input
            className="formInput"
            type="text"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            className="formInput"
            type="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className="buttonsGroup">
          <button className="formButton">Login</button>
          <button
            className="formButton"
            onClick={() => {
              navigate('/register');
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
