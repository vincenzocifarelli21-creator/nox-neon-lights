import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
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
      color: 'text-neon-orange'
    },
    {
      title: 'Premium Quality',
      description: 'Ultra-bright LEDs and premium materials ensure your neon lights shine for decades in the digital wasteland.',
      icon: '💎',
      color: 'text-neon-cyan'
    },
    {
      title: 'Cyberpunk Style',
      description: 'Embrace the future with designs inspired by neo-noir aesthetics and cyberpunk culture.',
      icon: '🌐',
      color: 'text-neon-red'
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
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-audiowide font-bold text-neon-cyan text-neon-lg animate-glow-pulse mb-6">
              NOX NEON
            </h1>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-audiowide font-bold text-neon-orange text-neon mb-8">
              LIGHTS
            </h2>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl font-orbitron text-white/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Illuminate your world with cutting-edge neon technology. 
            Step into the future of lighting design.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/collection"
              className="px-8 py-4 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold text-lg rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:scale-105"
            >
              EXPLORE COLLECTION
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-orbitron font-bold text-lg rounded-lg neon-border hover:bg-neon-cyan hover:text-black transition-all duration-300 hover:scale-105"
            >
              LEARN MORE
            </Link>
          </motion.div>
        </div>

        {/* Floating neon elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-10 w-2 h-32 bg-neon-yellow rounded-full opacity-60"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              boxShadow: '0 0 20px #ffcc00, 0 0 40px #ffcc00'
            }}
          />
          
          <motion.div
            className="absolute top-1/3 right-16 w-3 h-24 bg-neon-red rounded-full opacity-60"
            animate={{
              y: [20, -20, 20],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              boxShadow: '0 0 20px #ff0044, 0 0 40px #ff0044'
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-1 h-20 bg-neon-cyan rounded-full opacity-60"
            animate={{
              y: [-15, 15, -15],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            style={{
              boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff'
            }}
          />
        </div>
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
              className="inline-block px-10 py-5 bg-gradient-to-r from-neon-cyan via-neon-orange to-neon-red text-black font-orbitron font-bold text-xl rounded-lg shadow-neon-lg hover:shadow-neon transition-all duration-300 hover:scale-105"
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
