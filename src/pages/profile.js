import Layout from '@components/Layout';
import UserSidebar from '@components/UserSidebar';
import UserMaincontent from '@components/UserMaincontent';
import { useUserState } from '@context/user';
import style from './Profile.module.css';

export default function Profile() {
  const { token, status, redirectToOAuth } = useUserState();

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
      <div className={style['profile-page']}>
        <UserSidebar />
        <UserMaincontent />
      </div>
    </Layout>
  );
}
