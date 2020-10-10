import Layout from '@components/Layout';
import Hero from '@components/Hero';
import { useUserState } from 'src/context/user';

export default function Profile() {
  const { token, user, status, redirectToOAuth } = useUserState();

  if (!token) {
    return (
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
    );
  }

  if (status === 'loading') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 500,
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      <Hero>
        <h1>Explorer: {user.full_name}</h1>
        <img src={user.avatar_url} alt={`${user.full_name}’s avatar`} />
      </Hero>
      <section>blah blah make edits here</section>
    </Layout>
  );
}
