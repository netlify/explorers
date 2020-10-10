import React from 'react';
import { MissionsProvider } from '../context/missions';
import { UserProvider } from '../context/user';

// global styles
import '../styles/global.css';

export default function Explorers({ Component, pageProps }) {
  return (
    <MissionsProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </MissionsProvider>
  );
}
