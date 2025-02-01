import React from 'react';
import { Link } from 'react-router';
import useRefreshToken from '../hooks/useRefreshToken';

const LinkPage = () => {
  const refresh = useRefreshToken();
  return (
    <section className="formSection">
      <h1 className="formHeader">Pages</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '5px' }}>
        <Link to={'/user'}>Go to user page</Link>
        <Link to={'/server'}>Go to server page</Link>
      </div>

      <button onClick={refresh}>refresh token</button>
    </section>
  );
};

export default LinkPage;
