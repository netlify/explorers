import React from 'react';
import { Helmet } from 'react-helmet';
import { SEO } from './seo';
import { Link } from 'gatsby';

// global styles
import '../styles/global.css';

import styles from '../styles/layout.module.css';

export function Layout({ children }) {
  return (
    <>
      <Helmet
        titleTemplate="%s · Jamstack Explorers"
        defaultTitle="Jamstack Explorers · Presented by Netlify"
      >
        <html lang="en" />
        <meta charSet="utf-8" />
      </Helmet>
      <SEO
        title="Jamstack Explorers"
        description="It’s not flying; it’s FTP with style!"
        url="https://explorers.netlify.com/"
        image="https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?q=85&fm=jpg&fit=crop&w=1600&h=800"
      />
      <header className={styles.header}>
        <Link to="/" className={styles.home}>
          Jamstack Explorers
        </Link>
      </header>
      <main>{children}</main>
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
