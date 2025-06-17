import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/AboutMe.module.scss';

const AboutMe = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showWork, setShowWork] = useState(false);
  
  const introRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  
  const fullText = 'About me?';

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTypewriterComplete(true);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Scroll-triggered animations using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            typewriterComplete // Only reveal after typewriter
          ) {
            if (entry.target === introRef.current && !showAnswer) {
              setShowAnswer(true);
            } else if (entry.target === workRef.current && !showWork) {
              setShowWork(true);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (introRef.current) observer.observe(introRef.current);
    if (workRef.current) observer.observe(workRef.current);

    return () => observer.disconnect();
  }, [typewriterComplete, showAnswer, showWork]);

  return (
    <section id="about" className={styles.container}>
      <div className={styles.typewriterSection}>
        <h1 className={styles.typewriter}>
        {typewriterText}
        {!typewriterComplete && <span className={styles.cursor}>|</span>}
        </h1>
      </div>

      <div 
        ref={introRef}
        className={`${styles.intro} ${showAnswer ? styles.visible : ''}`}
      >
        <p>
          Well, alongside developing ETLs and dashboards, I love building responsive UIs and optimizing user experiences one component at a time.
        </p>
        <p>
          Embracing every syntax tantrum, dependency conflict, and build error that comes with shipping modern web apps. 😉
        </p>
      </div>

      <div 
        ref={workRef}
        className={`${styles.workSection} ${showWork ? styles.visible : ''}`}
      >
        <h2 className={styles.workTitle}>I debug until it works</h2>
        <p className={styles.workSubtitle}>
          Every project pushes my skillset. Check out what I&apos;ve shipped.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
