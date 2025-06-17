import React, { useRef, useEffect, useState } from 'react';

interface Skill {
  name: string;
  color: string;
  category: string;
}

interface SkillPosition extends Skill {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  targetX: number;
  targetY: number;
  pulse: number;
}

interface Category {
  name: string;
  icon: string;
}

const SKILLS: Skill[] = [
  { name: 'HTML5', color: '#E34F26', category: 'Standards' },
  { name: 'CSS3', color: '#1572B6', category: 'Standards' },
  { name: 'Sass', color: '#CC6699', category: 'Standards' },
  { name: 'JavaScript', color: '#F7DF1E', category: 'Languages' },
  { name: 'TypeScript', color: '#3178C6', category: 'Languages' },
  { name: 'React', color: '#61DAFB', category: 'Frameworks' },
  { name: 'Next.js', color: '#000000', category: 'Frameworks' },
  { name: 'Framer Motion', color: '#FF0055', category: 'Frameworks' },
  { name: 'Tailwind', color: '#06B6D4', category: 'Design' },
  { name: 'Figma', color: '#F24E1E', category: 'Design' },
  { name: 'ESLint', color: '#4B32C3', category: 'Testing' },
  { name: 'Git', color: '#F05032', category: 'Tools' },
  { name: 'VS Code', color: '#007ACC', category: 'Tools' },
  { name: 'npm', color: '#CB3837', category: 'Tools' }
];

const CATEGORIES: Category[] = [
  { name: 'Languages', icon: '💻' },
  { name: 'Standards', icon: '📋' },
  { name: 'Frameworks', icon: '⚡' },
  { name: 'Testing', icon: '🧪' },
  { name: 'Design', icon: '🎨' },
  { name: 'Tools', icon: '🔧' }
];

const SkillsConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skillPositions, setSkillPositions] = useState<SkillPosition[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Generate initial positions
    const positions: SkillPosition[] = SKILLS.map((skill) => ({
      ...skill,
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * (canvas.height - 100) + 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      originalX: 0,
      originalY: 0,
      targetX: 0,
      targetY: 0,
      pulse: Math.random() * Math.PI * 2
    }));

    // Set original positions
    positions.forEach(pos => {
      pos.originalX = pos.x;
      pos.originalY = pos.y;
      pos.targetX = pos.x;
      pos.targetY = pos.y;
    });

    setSkillPositions(positions);

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.lineWidth = 1;
      
      positions.forEach((skill, i) => {
        positions.slice(i + 1).forEach(otherSkill => {
          const distance = Math.sqrt(
            Math.pow(skill.x - otherSkill.x, 2) + 
            Math.pow(skill.y - otherSkill.y, 2)
          );
          
          if (distance < 150) {
            const opacity = 1 - (distance / 150);
            ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(skill.x, skill.y);
            ctx.lineTo(otherSkill.x, otherSkill.y);
            ctx.stroke();
          }
        });
      });

      // Update positions with gentle floating
      positions.forEach(skill => {
        skill.pulse += 0.02;
        
        if (hoveredSkill !== skill.name && hoveredCategory !== skill.category) {
          // Gentle floating animation
          skill.x += Math.sin(skill.pulse) * 0.3;
          skill.y += Math.cos(skill.pulse * 0.8) * 0.2;
          
          // Boundary constraints
          if (skill.x < 30) skill.x = 30;
          if (skill.x > canvas.width - 30) skill.x = canvas.width - 30;
          if (skill.y < 30) skill.y = 30;
          if (skill.y > canvas.height - 30) skill.y = canvas.height - 30;
        }
      });

      // Draw glowing particles
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const alpha = Math.random() * 0.1;
        
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = (): void => {
      const newRect = container.getBoundingClientRect();
      canvas.width = newRect.width;
      canvas.height = newRect.height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [hoveredSkill, hoveredCategory]);

  const handleSkillMouseEnter = (skillName: string): void => {
    setHoveredSkill(skillName);
  };

  const handleSkillMouseLeave = (): void => {
    setHoveredSkill(null);
  };

  const handleCategoryMouseEnter = (categoryName: string): void => {
    setHoveredCategory(categoryName);
  };

  const handleCategoryMouseLeave = (): void => {
    setHoveredCategory(null);
  };

  const getSkillAbbreviation = (skillName: string): string => {
    return skillName.length > 6 ? skillName.slice(0, 3) : skillName.slice(0, 4);
  };

  return (
    <section id="skills" className="skills-constellation">
      <section className="skills-constellation__section">
        
        {/* Heading */}
        <div className="skills-constellation__header">
          <h2 className="skills-constellation__title">
            Tech Stack
          </h2>
          <p className="skills-constellation__subtitle">
            Hover over the orbs or categories below to explore my frontend stack.
          </p>
        </div>

        {/* Main constellation container */}
        <div 
          ref={containerRef}
          className="skills-constellation__container"
        >
          {/* Background canvas for connections and particles */}
          <canvas
            ref={canvasRef}
            className="skills-constellation__canvas"
          />

          {/* Skill nodes */}
          {skillPositions.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            const isCategoryHovered = hoveredCategory === skill.category;
            const shouldHighlight = isHovered || isCategoryHovered;
            
            return (
              <div
                key={skill.name}
                className={`skills-constellation__skill ${shouldHighlight ? 'skills-constellation__skill--highlighted' : ''}`}
                style={{
                  left: `${skill.x}px`,
                  top: `${skill.y}px`,
                }}
                onMouseEnter={() => handleSkillMouseEnter(skill.name)}
                onMouseLeave={handleSkillMouseLeave}
              >
                {/* Skill orb */}
                <div 
                  className={`skills-constellation__orb ${shouldHighlight ? 'skills-constellation__orb--highlighted' : ''}`}
                  style={{ 
                    background: `linear-gradient(135deg, ${skill.color}, ${skill.color}cc)`,
                    boxShadow: shouldHighlight 
                      ? `0 0 40px ${skill.color}80, 0 0 80px ${skill.color}40` 
                      : `0 0 20px ${skill.color}40`
                  }}
                >
                  {/* Pulse ring */}
                  {shouldHighlight && (
                    <div 
                      className="skills-constellation__pulse-ring"
                      style={{ background: `${skill.color}30` }}
                    />
                  )}
                  
                  <span className="skills-constellation__orb-text">
                    {getSkillAbbreviation(skill.name)}
                  </span>
                </div>

                {/* Skill label */}
                <div className={`skills-constellation__label ${shouldHighlight ? 'skills-constellation__label--visible' : ''}`}>
                  <div className="skills-constellation__label-content">
                    <div className="skills-constellation__label-name">{skill.name}</div>
                    <div className="skills-constellation__label-category">{skill.category}</div>
                    <div className="skills-constellation__label-arrow"></div>
                  </div>
                </div>

                {/* Connection indicator */}
                {shouldHighlight && (
                  <div 
                    className="skills-constellation__connection-indicator" 
                    style={{ borderColor: skill.color }}
                  />
                )}
              </div>
            );
          })}

          {/* Floating elements */}
          <div className="skills-constellation__floating-elements">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="skills-constellation__floating-particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Compact categories */}
        <div className="skills-constellation__categories">
          {CATEGORIES.map((category) => {
            const isHovered = hoveredCategory === category.name;
            return (
              <div
                key={category.name}
                className={`skills-constellation__category ${isHovered ? 'skills-constellation__category--hovered' : ''}`}
                onMouseEnter={() => handleCategoryMouseEnter(category.name)}
                onMouseLeave={handleCategoryMouseLeave}
              >
                <span className="skills-constellation__category-icon">{category.icon}</span>
                {category.name}
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default SkillsConstellation;
