'use client';
import { useState } from 'react';
import styles from '../styles/HeroSection.module.scss';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Hi, I’m <span className={styles.gradientWord}>Sinothabo</span> Zwane
        </h1>
        <p className={styles.subtitle}>
          Web Developer & Data Scientist
        </p>
        <div className={styles.ctaWrapper}>
          <a href="#projects" className={styles.cta}>
            Explore My Work<span className={styles.underline} />
          </a>
        </div>
      </div>

      <div
        className={styles.orb}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className={styles.orbInner} />
      </div>

      {menuOpen && (
        <div className={styles.orbMenu}>
          <a href="https://github.com/siino-z" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/sino-z" target="_blank">LinkedIn</a>
          <a href="https://siino-z.github.io" target="_blank">Data Portfolio</a>
        </div>
      )}
    </section>
  );
}
