import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>SZ</div>
          <span>Sinothabo Zwane</span>
        </div>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Sinothabo Zwane. All rights reserved.
        </p>

        <div className={styles.socials}>
          <a href="https://github.com/siino-z" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/sino-z" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://siino-z.github.io" target="_blank" rel="noopener noreferrer">
            <FaGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
}
