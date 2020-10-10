import React from 'react';
import { MissionsProvider } from '../context/missions';
import { StagesProvider } from '../context/stages';

// global styles
import '../styles/global.css';

export default function Explorers({ Component, pageProps }) {
  return (
    <MissionsProvider>
      <StagesProvider>
        <Component {...pageProps} />
      </StagesProvider>
    </MissionsProvider>
  );
}
