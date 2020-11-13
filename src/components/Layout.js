import Head from 'next/head';
import SEO from '@components/SEO';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';

import styles from './Layout.module.css';

export default function Layout({ children, navtheme }) {
  return (
    <div className={styles.container}>
      <Head>
        <title key="title">Jamstack Explorers · Presented by Netlify</title>
      </Head>
      <SEO
        title="Jamstack Explorers"
        description="It's not flying; it's FTP with style!"
        url="https://explorers.netlify.com/"
        image="https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=85&fm=jpg&fit=crop&w=1600&h=800"
      />
      <Navigation theme={navtheme} />
      <main>{children}</main>
      <Footer className={styles.footer} />
    </div>
  );
}
