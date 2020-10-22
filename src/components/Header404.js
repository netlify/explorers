import styles from './Header404.module.css';
import FloatingAstronaut from './FloatingAstronaut';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

function Header404() {
  useEffect(() => {
    gsap.to('.hover', {
      duration: 3,
      x: gsap.utils.random(5, 10),
      y: gsap.utils.random(10, 100),
      rotation: gsap.utils.random(-20, 20),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      transformOrigin: '50% 50%',
    });
  });

  return (
    <section className={styles.container}>
      <div className="section-contain margintop-lg">
        <h1 className={styles.h1}>404</h1>
        <h2 className={styles.h2}>Lost in space?</h2>
        <Link href="/">
          <a>
            <button className="btn btnprimary">Go back home</button>
          </a>
        </Link>
        <br />
        <div className={`hover ${styles.floating}`}>
          <FloatingAstronaut />
        </div>
      </div>
    </section>
  );
}

export default Header404;
