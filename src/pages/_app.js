import React from 'react';
import { MissionsProvider } from '../context/missions';

// global styles
import '../styles/global.css';

export default function Explorers({ Component, pageProps }) {
  return (
    <MissionsProvider>
      <Component {...pageProps} />
    </MissionsProvider>
  );
}
