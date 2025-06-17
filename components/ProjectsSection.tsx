'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/ProjectsSection.module.scss';

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  hoverImage: string;
};

const projects: Project[] = [
  {
    title: 'Data Scince Portfolio Website',
    description: 'A fully responsive personal portfolio using a Bootstrap template; integrated interactive sections and custom JavaScript features.',
    link: 'https://siino-z.github.io/',
    image: '/img/ds1.svg',
    hoverImage: '/img/ds2.svg',
  },
  {
    title: 'Portfolio Website',
    description: 'This very website! Built with Next.js, TypeScript, and Framer Motion.',
    link: 'https://github.com/Siino-Z/sinozwane',
    image: '/img/portfolio-img1.svg',
    hoverImage: '/img/portfolio-img2.svg',
  },
  {
    title: 'Cape Town Crime Intelligence Hub',
    description: 'An interactive crime dashboard of the City of Cape Town using HTML, JavaScript and Leaflet.js.',
    link: 'https://siino-z.github.io/CPT-Crime-Info-hub/',
    image: '/img/cpt1.svg',
    hoverImage: '/img/cpt2.svg', 
  },
];

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className={styles.wrapper}>
      {projects.map((p, i) => (
        <section key={i} className={styles.projectSlide}>
          <span className={styles.bigNumber}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className={styles.cardContainer}>
            <div
              className={styles.imageSection}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={hoveredIndex === i ? p.hoverImage : p.image}
                alt={p.title}
                className={styles.projectImage}
                width={400}
                height={250}
                sizes="(max-width: 600px) 100vw, 400px"
                priority={i === 0}
              />
            </div>
            <motion.div
              className={styles.content}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.header}>
                <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                <h2 className={styles.title}>{p.title}</h2>
              </div>
              <p className={styles.desc}>{p.description}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {i === 1 ? "View Code ↗" : "View Live ↗"}
              </a>
            </motion.div>
          </div>
        </section>
      ))}
      <div className="profile-image-container">
        <Image
          src="/path/to/profile.jpg"
          alt="Profile"
          className="profile-image"
          width={150}
          height={150}
        />
      </div>
    </section>
  );
}
