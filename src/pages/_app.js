import React from 'react';
import { MissionsProvider } from '@context/missions';
import { UserProvider } from '@context/user';
import { StagesProvider } from '@context/stages';
import { AchievementProvider } from '@context/achievement';

// global styles
import '../styles/normalize.css';
import '../styles/global.css';

export default function Explorers({ Component, pageProps }) {
  return (
    <MissionsProvider>
      <UserProvider>
        <AchievementProvider>
          <StagesProvider>
            <Component {...pageProps} />
          </StagesProvider>
        </AchievementProvider>
      </UserProvider>
    </MissionsProvider>
  );
}
