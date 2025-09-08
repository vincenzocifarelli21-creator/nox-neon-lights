/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-orange': '#FF6B35',
        'neon-orange-bright': '#FF4500',
        'neon-orange-intense': '#FF2D00',
        'neon-red': '#FF3D00',
        'neon-red-deep': '#E91E63',
        'neon-red-hot': '#FF1493',
        'neon-yellow': '#ffcc00',
        'neon-yellow-electric': '#FFFF00',
        'neon-cyan': '#00D4D4',
        'neon-cyan-bright': '#00FFFF',
        'neon-teal': '#1DE9B6',
        'neon-teal-electric': '#00FFA5',
        'neon-blue': '#00BCD4',
        'neon-blue-electric': '#00BFFF',
        'neon-purple': '#BF40BF',
        'neon-purple-bright': '#DA70D6',
        'neon-green': '#32FF32',
        'neon-green-lime': '#00FF00',
        'neon-pink': '#FF69B4',
        'neon-pink-hot': '#FF1493',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'audiowide': ['Audiowide', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor',
        'neon-sm': '0 0 10px currentColor, 0 0 20px currentColor',
        'neon-lg': '0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        'glow-pulse': {
          'from': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
          },
          'to': {
            textShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor, 0 0 120px currentColor',
          },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-neon': {
          textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
        },
        '.text-neon-sm': {
          textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
        },
        '.text-neon-lg': {
          textShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor',
        },
        '.text-neon-xl': {
          textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor, 0 0 120px currentColor',
        },
        '.text-neon-intense': {
          textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
