import { MissionsProvider } from '@context/missions';
import { UserProvider } from '@context/user';
import { StagesProvider } from '@context/stages';

// global styles
import '../styles/normalize.css';
import '../styles/global.css';

export default function Explorers({ Component, pageProps }) {
  return (
    <MissionsProvider>
      <UserProvider>
        <StagesProvider>
          <Component {...pageProps} />
        </StagesProvider>
      </UserProvider>
    </MissionsProvider>
  );
}
