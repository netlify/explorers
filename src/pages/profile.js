import { useEffect, useState } from 'react';
import Layout from '@components/Layout';
import Hero from '@components/Hero';
import { redirectToOAuth, getTokenFromHash } from '../util/oauth';

export default function Profile() {
  const [token, setToken] = useState();

  useEffect(() => {
    const storedToken = window.localStorage.getItem('nf-session');
    const accessToken = storedToken
      ? JSON.parse(storedToken)?.access_token
      : false;

    setToken(accessToken || getTokenFromHash());
  }, []);

  return (
    <Layout>
      {token ? (
        <>
          <Hero>
            <h1>Explorer Sarah</h1>
            <img src="https://placekitten.com/250/250" alt={`explorer's pic`} />
          </Hero>
          <section>blah blah make edits here</section>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 500,
          }}
        >
          <button onClick={() => redirectToOAuth()}>Log In With Netlify</button>
        </div>
      )}
    </Layout>
  );
}
