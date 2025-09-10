import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedNeonLines = ({ className = '', intensity = 'normal' }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Define different line configurations
  const lineConfigs = [
    // Horizontal lines
    { 
      type: 'horizontal',
      color: '#00BFFF', // Electric blue
      startX: '10%', 
      startY: '15%', 
      length: '25%',
      duration: 3.5,
      delay: 0
    },
    { 
      type: 'horizontal',
      color: '#FF1493', // Hot pink
      startX: '60%', 
      startY: '25%', 
      length: '30%',
      duration: 4,
      delay: 0.5
    },
    { 
      type: 'horizontal',
      color: '#32FF32', // Lime green
      startX: '15%', 
      startY: '45%', 
      length: '20%',
      duration: 3,
      delay: 1
    },
    { 
      type: 'horizontal',
      color: '#FF6B35', // Orange
      startX: '70%', 
      startY: '55%', 
      length: '25%',
      duration: 3.8,
      delay: 1.5
    },
    { 
      type: 'horizontal',
      color: '#BF40BF', // Purple
      startX: '5%', 
      startY: '75%', 
      length: '35%',
      duration: 4.2,
      delay: 2
    },
    { 
      type: 'horizontal',
      color: '#00D4D4', // Cyan
      startX: '55%', 
      startY: '85%', 
      length: '28%',
      duration: 3.3,
      delay: 2.5
    },
    // Vertical lines
    { 
      type: 'vertical',
      color: '#FF4500', // Red-orange
      startX: '25%', 
      startY: '20%', 
      length: '30%',
      duration: 3.7,
      delay: 0.8
    },
    { 
      type: 'vertical',
      color: '#1DE9B6', // Teal
      startX: '45%', 
      startY: '10%', 
      length: '40%',
      duration: 4.1,
      delay: 1.3
    },
    { 
      type: 'vertical',
      color: '#9C27B0', // Deep purple
      startX: '80%', 
      startY: '30%', 
      length: '25%',
      duration: 3.6,
      delay: 1.8
    },
    // Diagonal lines
    { 
      type: 'diagonal',
      color: '#FFEB3B', // Yellow
      startX: '40%', 
      startY: '60%', 
      length: '20%',
      duration: 3.9,
      delay: 2.2,
      angle: 45
    },
    { 
      type: 'diagonal',
      color: '#E91E63', // Pink
      startX: '65%', 
      startY: '70%', 
      length: '18%',
      duration: 3.4,
      delay: 2.7,
      angle: -30
    }
  ];

  const getIntensityClass = (baseColor) => {
    switch (intensity) {
      case 'subtle':
        return 'neon-line-subtle';
      case 'intense':
        return 'neon-line-intense';
      default:
        return 'neon-line';
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg 
        className="absolute inset-0 w-full h-full" 
        style={{ zIndex: -1 }}
        viewBox={`0 0 ${windowSize.width || 1920} ${windowSize.height || 1080}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Gradient definitions for glow effects */}
        <defs>
          {lineConfigs.map((line, index) => (
            <React.Fragment key={`gradient-${index}`}>
              <linearGradient id={`glow-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={line.color} stopOpacity="0" />
                <stop offset="10%" stopColor={line.color} stopOpacity="0.3" />
                <stop offset="50%" stopColor={line.color} stopOpacity="1" />
                <stop offset="90%" stopColor={line.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={line.color} stopOpacity="0" />
              </linearGradient>
              <filter id={`blur-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </React.Fragment>
          ))}
        </defs>

        {lineConfigs.map((line, index) => {
          const startX = (windowSize.width * parseFloat(line.startX)) / 100;
          const startY = (windowSize.height * parseFloat(line.startY)) / 100;
          
          let endX, endY;
          const lengthPx = (windowSize.width * parseFloat(line.length)) / 100;
          
          if (line.type === 'horizontal') {
            endX = startX + lengthPx;
            endY = startY;
          } else if (line.type === 'vertical') {
            endX = startX;
            endY = startY + lengthPx;
          } else if (line.type === 'diagonal') {
            const angle = (line.angle || 45) * (Math.PI / 180);
            endX = startX + lengthPx * Math.cos(angle);
            endY = startY + lengthPx * Math.sin(angle);
          }

          return (
            <g key={index}>
              {/* Outer glow */}
              <motion.line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={line.color}
                strokeWidth="12"
                strokeOpacity="0.1"
                filter={`url(#blur-${index})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0.8, 1],
                  opacity: [0, 0.6, 0.3, 0.7]
                }}
                transition={{
                  duration: line.duration,
                  delay: line.delay,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
              
              {/* Main neon tube */}
              <motion.line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={line.color}
                strokeWidth="6"
                strokeOpacity="0.9"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0.9, 1],
                  opacity: [0, 1, 0.7, 0.95]
                }}
                transition={{
                  duration: line.duration,
                  delay: line.delay,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
                style={{
                  filter: `drop-shadow(0 0 8px ${line.color}) drop-shadow(0 0 16px ${line.color}40)`
                }}
              />
              
              {/* Inner bright core */}
              <motion.line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0.95, 1],
                  opacity: [0, 0.9, 0.6, 0.8]
                }}
                transition={{
                  duration: line.duration,
                  delay: line.delay + 0.1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
              
              {/* Flickering highlights */}
              <motion.line
                x1={startX + lengthPx * 0.3}
                y1={startY + (line.type === 'vertical' ? lengthPx * 0.3 : 0)}
                x2={startX + lengthPx * 0.7}
                y2={startY + (line.type === 'vertical' ? lengthPx * 0.7 : 0)}
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.9"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0, 0.8, 0, 1, 0]
                }}
                transition={{
                  duration: line.duration * 0.5,
                  delay: line.delay + 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AnimatedNeonLines;
