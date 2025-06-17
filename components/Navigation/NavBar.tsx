'use client';
import { useState, useEffect } from 'react';
import styles from '../../styles/components/NavBar.module.scss';

interface MenuItem {
  label: string;
  href: string;
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems: MenuItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  // Calculate positions for circular menu - FIXED
  const getCircularPosition = (index: number, total: number) => {
    let radius = 120; // Reduced from 170 to prevent overlap
    if (typeof window !== "undefined") {
      if (window.innerWidth < 500) radius = 80;
      else if (window.innerWidth < 800) radius = 100;
    }
    
    // Start from top (-90 degrees) and distribute evenly
    const angleStep = 360 / total;
    const angle = (index * angleStep) - 90; // Start from top
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y, angle };
  };

  return (
    <>
      {/* Backdrop */}
      {menuOpen && (
        <div 
          className={styles.backdrop} 
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <span className={styles.logoText}>SZ</span>
            <div className={styles.logoDot}></div>
          </div>

          {/* Circular menu trigger */}
          <div className={styles.menuContainer}>
            <button
              className={`${styles.menuTrigger} ${menuOpen ? styles.active : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className={styles.triggerIcon}>
                <span className={styles.triggerDot}></span>
                <span className={styles.triggerDot}></span>
                <span className={styles.triggerDot}></span>
              </div>
            </button>

            {/* Radial menu items */}
            {menuOpen && (
              <div className={styles.radialMenu}>
                {/* Center pulse effect */}
                <div className={styles.centerPulse}></div>
                
                {/* Menu items in circle */}
                {menuItems.map((item, index) => {
                  const { x, y } = getCircularPosition(index, menuItems.length);
                  return (
                    <div
                      key={item.label}
                      className={styles.menuItemWrapper}
                      style={{
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1)`,
                        opacity: 1,
                        transition: `opacity 0.4s ${index * 0.1}s, transform 0.4s ${index * 0.1}s`
                      }}
                    >
                      <a
                        href={item.href}
                        className={styles.menuItem}
                        onClick={handleMenuItemClick}
                      >
                        <span className={styles.itemText}>{item.label}</span>
                        <div className={styles.itemGlow}></div>
                      </a>
                      
                      {/* Connection line to center */}
                      <div 
                        className={styles.connectionLine}
                        style={{
                          transform: `rotate(${Math.atan2(-y, -x) * (180 / Math.PI)}deg)`
                        }}
                      ></div>
                    </div>
                  );
                })}
                
                {/* Orbital rings */}
                <div
                  className={styles.orbitalRing}
                  style={{ 
                    '--ring-size': '140px',
                    zIndex: 99 
                  } as React.CSSProperties}
                ></div>
                <div
                  className={styles.orbitalRing}
                  style={{ 
                    '--ring-size': '180px',
                    zIndex: 99 
                  } as React.CSSProperties}
                ></div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}