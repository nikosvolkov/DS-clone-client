import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import $api from '../api';
import { useFingerprint } from '../hooks/useFingerprint';
import { REGISTER_URL } from '../api/consts';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const fingerprint = useFingerprint();

  useEffect(() => {
    setErrorMessage('');
  }, [login, password, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password.length < 6){
      setErrorMessage('Password should be from 6 to 32 digits')
      throw new Error('Not valid password')
    }

    try {
      const response = await $api.post(REGISTER_URL, {
        login,
        email,
        password,
        fingerprint,
      });
      console.log(response);
      setLogin('');
      setPassword('');
      navigate('/main');
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrorMessage('No Server Response');
      } else if (error.response?.status === 409) {
        setErrorMessage('Username Taken');
      } else {
        setErrorMessage('Registration Failed');
      }
    }
  };

  return (
    <section className="formSection">
      <p className={errorMessage ? 'errorMessage' : 'offscreen'}>
        {errorMessage}
      </p>
      <h1 className="formHeader">Create an account</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="username">Nickname</label>
          <input
            className="formInput"
            type="text"
            id="username"
            autoComplete="off"
            value={login}
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email address or phone number</label>
          <input
            className="formInput"
            type="email"
            id="email"
            autoComplete="no-please"
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
          <button
            className="formButton"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </button>
          <button className="formButton">Sign up</button>
        </div>
      </form>
    </section>
  );
};

export default Register;
