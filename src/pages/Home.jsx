import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedNeonLines from '../components/AnimatedNeonLines';

const Home = () => {
  console.log('🏠 HOME PAGE RENDERED - You are on the Home page');
  console.log('Current URL should be:', window.location.pathname);
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      title: 'Custom Neon',
      description: 'Bespoke neon designs tailored to your cyberpunk vision. Each piece is handcrafted with precision and artistry.',
      icon: '⚡',
      color: 'text-neon-orange-intense'
    },
    {
      title: 'Premium Quality',
      description: 'Ultra-bright LEDs and premium materials ensure your neon lights shine for decades in the digital wasteland.',
      icon: '💎',
      color: 'text-neon-teal-electric'
    },
    {
      title: 'Cyberpunk Style',
      description: 'Embrace the future with designs inspired by neo-noir aesthetics and cyberpunk culture.',
      icon: '🌐',
      color: 'text-neon-pink-hot'
    }
  ];

  return (
    <div className="min-h-screen cyberpunk-bg pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-audiowide font-bold text-neon-cyan animate-glow-pulse mb-6" style={{
              textShadow: '0 0 10px #00D4D4, 0 0 20px #00D4D4, 0 0 40px #00D4D4, 0 0 80px #00D4D4, 0 0 120px #00D4D4'
            }}>
              NOX NEON
            </h1>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-audiowide font-bold text-neon-orange mb-8" style={{
              textShadow: '0 0 10px #FF6B35, 0 0 20px #FF6B35, 0 0 40px #FF6B35, 0 0 80px #FF6B35, 0 0 120px #FF6B35'
            }}>
              LIGHTS
            </h2>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl font-orbitron text-neon-teal mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              textShadow: '0 0 5px #1DE9B6, 0 0 10px #1DE9B6, 0 0 20px #1DE9B6, 0 0 30px #1DE9B6'
            }}
          >
            Futuristic design meets <span className="text-neon-cyan" style={{
              textShadow: '0 0 5px #00D4D4, 0 0 10px #00D4D4, 0 0 20px #00D4D4'
            }}>luminous art</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/collection"
              className="px-8 py-4 bg-gradient-to-r from-neon-orange-bright via-neon-orange to-neon-red text-black font-orbitron font-bold text-lg rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 0 20px #FF6B35, 0 0 40px #FF6B35, 0 0 60px #FF6B35'
              }}
            >
              DISCOVER THE COLLECTION
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-neon-teal text-neon-teal font-orbitron font-bold text-lg rounded-lg neon-border hover:bg-neon-teal hover:text-black transition-all duration-300 hover:scale-105"
            >
              LEARN MORE
            </Link>
          </motion.div>
        </div>

        {/* Realistic animated neon lines background */}
        <AnimatedNeonLines 
          className="opacity-60" 
          safeArea={{
            x: '25%',    // 25% from left
            y: '35%',    // 35% from top  
            width: '50%', // 50% width
            height: '30%' // 30% height
          }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-audiowide font-bold text-neon-cyan text-neon mb-4">
              WHY CHOOSE NOX?
            </h2>
            <p className="text-lg font-orbitron text-white/70 max-w-2xl mx-auto">
              Experience the future of neon lighting with our cutting-edge technology and cyberpunk aesthetic.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="cyberpunk-card p-8 text-center hover:scale-105 transition-transform duration-300"
                variants={fadeInUp}
              >
                <div className={`text-6xl mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-audiowide font-bold mb-4 ${feature.color} text-neon-sm`}>
                  {feature.title}
                </h3>
                <p className="text-white/80 font-orbitron leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-neon-cyan/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-audiowide font-bold text-neon-orange text-neon mb-6">
              READY TO LIGHT UP THE NIGHT?
            </h2>
            <p className="text-lg font-orbitron text-white/70 mb-8">
              Join the neon revolution and transform your space into a cyberpunk paradise.
            </p>
            <Link
              to="/collection"
              className="inline-block px-10 py-5 bg-gradient-to-r from-neon-teal via-neon-orange-bright to-neon-red-deep text-black font-orbitron font-bold text-xl rounded-lg shadow-neon-lg hover:shadow-neon transition-all duration-300 hover:scale-105"
            >
              START YOUR JOURNEY
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
