import Head from 'next/head';
import Link from 'next/link';
import SEO from '@components/SEO';

import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title key="title">Jamstack Explorers · Presented by Netlify</title>
      </Head>
      <SEO
        title="Jamstack Explorers"
        description="It's not flying; it's FTP with style!"
        url="https://explorers.netlify.com/"
        image="https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=85&fm=jpg&fit=crop&w=1600&h=800"
      />
      <header className={styles.header}>
        <Link href="/" passHref>
          <a className={styles.homeLink}>Jamstack Explorers</a>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        created with{' '}
        <img
          className={styles.netliheart}
          src="https://res.cloudinary.com/jlengstorf/image/upload/f_auto,q_auto,w_50/v1596146333/netlify/netliheart.png"
          alt="love"
        />{' '}
        by the{' '}
        <a href="https://www.netlify.com/?utm_source=jamstack-explorers&utm_medium=footer-link&utm_campaign=devex">
          Netlify
        </a>{' '}
        team
      </footer>
    </>
  );
}
