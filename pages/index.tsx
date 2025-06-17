import { useState } from 'react';
import Head from 'next/head';
import Preloader from '../components/Preloader';
import NavBar from '../components/Navigation/NavBar';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import ProjectsSection from '../components/ProjectsSection';
import SkillsConstellation from '../components/SkillsConstellation';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>Sinothabo Zwane | Portfolio</title>
      </Head>

      {isLoaded ? (
        <>
          <NavBar />
          <HeroSection />
          <AboutMe />
          <ProjectsSection />
          <SkillsConstellation />
          <ContactSection />
          <Footer />
        </>
      ) : (
        <Preloader onDone={() => setIsLoaded(true)} />
      )}
    </>
  );
}
