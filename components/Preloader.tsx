'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Preloader.module.scss';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 20;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 600);
        }
        return Math.min(next, 100);
      });
    }, 300);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.name}>Sinothabo Zwane</h1>
      <div className={styles.stack}>
        {['React', 'TypeScript', 'Next.js', 'SCSS', 'Framer Motion'].map((tech, i) => (
          <span key={tech} style={{ animationDelay: `${i * 0.2}s` }}>
            {tech}
          </span>
        ))}
      </div>
      <div className={styles.progress}>
        <div style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.percent}>{Math.floor(progress)}%</p>
    </div>
  );
}
