import Layout from '@components/Layout';
import Hero from '@components/Hero';
import UserSidebar from '@components/UserSidebar';
import { useUserState } from 'src/context/user';

export default function Profile() {
  const { token, user, status, redirectToOAuth } = useUserState();
  const placeholderdata = {
    minutes: 540,
    accredidation: 36
  }

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
      <div style={{
          display: `grid`,
          gridTemplateColumns: `1fr 2fr`,
          gridTemplateRows: `62px 1fr`,
          width: `100vw`,
          minHeight: `100vh`
      }}>
        <div style={{
          gridArea: `1 / 1 / 2 / 3`,
          background: `white`
        }}></div>
        <UserSidebar user={user} />
      </div>
    </Layout>
  );
}
