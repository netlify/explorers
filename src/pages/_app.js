import React from 'react';
import { MissionsProvider } from '../context/missions';

// global styles
import '../styles/global.css';
import { StagesProvider } from 'src/context/stages';

export default function Explorers({ Component, pageProps }) {
  return (
    <MissionsProvider>
      <StagesProvider>
        <Component {...pageProps} />
      </StagesProvider>
    </MissionsProvider>
  );
}
