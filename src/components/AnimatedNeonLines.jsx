import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedNeonLines = ({ className = '', intensity = 'normal', safeArea = null }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Define only horizontal lines (5-6), colors inspired by reference (blue and orange)
  const lineConfigs = [
    {
      type: 'horizontal',
      color: '#26A5FF', // neon blue
      startX: '8%',
      startY: '18%',
      length: '32%',
      duration: 3.6,
      delay: 0.1
    },
    {
      type: 'horizontal',
      color: '#FF5A3C', // neon orange/red
      startX: '58%',
      startY: '24%',
      length: '30%',
      duration: 3.8,
      delay: 0.6
    },
    {
      type: 'horizontal',
      color: '#26A5FF',
      startX: '12%',
      startY: '40%',
      length: '28%',
      duration: 3.2,
      delay: 1.0
    },
    {
      type: 'horizontal',
      color: '#FF5A3C',
      startX: '50%',
      startY: '56%',
      length: '26%',
      duration: 3.5,
      delay: 1.5
    },
    {
      type: 'horizontal',
      color: '#26A5FF',
      startX: '18%',
      startY: '72%',
      length: '34%',
      duration: 3.9,
      delay: 2.0
    },
    {
      type: 'horizontal',
      color: '#FF5A3C',
      startX: '62%',
      startY: '82%',
      length: '22%',
      duration: 3.1,
      delay: 2.4
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
          {/* Optional safe area mask to avoid text overlap */}
          {safeArea && (
            <mask id="safe-area-mask">
              {/* White shows, black hides */}
              <rect x="0" y="0" width={windowSize.width} height={windowSize.height} fill="white" />
              <rect 
                x={(windowSize.width * parseFloat(safeArea.x)) / 100}
                y={(windowSize.height * parseFloat(safeArea.y)) / 100}
                width={(windowSize.width * parseFloat(safeArea.width)) / 100}
                height={(windowSize.height * parseFloat(safeArea.height)) / 100}
                fill="black" 
                rx="24"
              />
            </mask>
          )}
        </defs>

        {(safeArea ? <g mask="url(#safe-area-mask)"> : <g>)}
        {lineConfigs.map((line, index) => {
          const startX = (windowSize.width * parseFloat(line.startX)) / 100;
          const startY = (windowSize.height * parseFloat(line.startY)) / 100;
          const lengthPx = (windowSize.width * parseFloat(line.length)) / 100;
          
          // All lines are horizontal
          const endX = startX + lengthPx;
          const endY = startY;

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
                y1={startY}
                x2={startX + lengthPx * 0.7}
                y2={startY}
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
        </g>
      </svg>
    </div>
  );
};

export default AnimatedNeonLines;
