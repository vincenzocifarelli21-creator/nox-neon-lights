import { motion } from 'framer-motion';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
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

  const teamMembers = [
    {
      name: 'Aria Chen',
      role: 'Founder & Lead Designer',
      description: 'Former corporate architect turned neon artist. Aria brings 15 years of design experience to create the impossible.',
      color: 'neon-cyan'
    },
    {
      name: 'Marcus Vale',
      role: 'Chief Technology Officer',
      description: 'Ex-tech corp engineer specializing in advanced LED systems and smart integration technologies.',
      color: 'neon-orange'
    },
    {
      name: 'Luna Sato',
      role: 'Creative Director',
      description: 'Street art legend with a passion for cyberpunk culture. Luna transforms urban aesthetics into luminous masterpieces.',
      color: 'neon-red'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We push the boundaries of what\'s possible with light, technology, and design.',
      icon: '🔬',
      color: 'neon-cyan'
    },
    {
      title: 'Authenticity',
      description: 'Every piece we create is a genuine expression of cyberpunk culture and artistry.',
      icon: '🎨',
      color: 'neon-orange'
    },
    {
      title: 'Quality',
      description: 'We use only the finest materials and cutting-edge technology in every creation.',
      icon: '💎',
      color: 'neon-red'
    },
    {
      title: 'Community',
      description: 'We believe in building a community of creators, dreamers, and tech enthusiasts.',
      icon: '🤝',
      color: 'neon-yellow'
    }
  ];

  return (
    <div className="min-h-screen cyberpunk-bg pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-audiowide font-bold text-neon-cyan text-neon-lg mb-6">
              THE NOX STORY
            </h1>
            <p className="text-xl sm:text-2xl font-orbitron text-neon-orange text-neon-sm mb-8">
              Illuminating the Future, One Neon at a Time
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="cyberpunk-card p-8">
              <h2 className="text-3xl font-audiowide font-bold text-neon-orange text-neon mb-6">
                BORN IN THE DIGITAL UNDERGROUND
              </h2>
              <div className="space-y-6 text-white/80 font-orbitron leading-relaxed">
                <p>
                  In the neon-soaked streets of Neo Tokyo, 2019, three visionaries came together with a shared dream: 
                  to bring the electric soul of cyberpunk culture into the real world. What started as late-night 
                  experiments in a basement workshop has evolved into the premier destination for cyberpunk lighting.
                </p>
                <p>
                  NOX NEON LIGHTS was born from the belief that the future doesn't have to wait. In a world 
                  increasingly dominated by sterile digital screens, we create tangible, luminous art that 
                  bridges the gap between the virtual and the real.
                </p>
                <p>
                  Every piece we craft tells a story of rebellion against the mundane, a celebration of 
                  the electric dreams that power our cyberpunk hearts.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="cyberpunk-card p-8">
              <h2 className="text-3xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
                OUR MISSION
              </h2>
              <div className="space-y-6 text-white/80 font-orbitron leading-relaxed">
                <p>
                  To democratize the cyberpunk aesthetic and make it accessible to everyone who dreams 
                  of a more luminous future. We believe that everyone deserves to live in a world that 
                  reflects their inner light.
                </p>
                <p>
                  Through cutting-edge LED technology, sustainable manufacturing practices, and 
                  uncompromising attention to detail, we create more than just lighting – we create 
                  experiences, emotions, and memories that glow long after the lights go out.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-neon-cyan/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-audiowide font-bold text-neon-red text-neon-lg mb-4">
              OUR VALUES
            </h2>
            <p className="text-lg font-orbitron text-white/70 max-w-2xl mx-auto">
              The principles that guide us through the neon-lit path to the future.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="cyberpunk-card p-6 text-center hover:scale-105 transition-transform duration-300"
                variants={fadeInUp}
              >
                <div className="text-5xl mb-4">
                  {value.icon}
                </div>
                <h3 className={`text-xl font-audiowide font-bold mb-3 text-${value.color} text-neon-sm`}>
                  {value.title}
                </h3>
                <p className="text-white/80 font-orbitron text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-audiowide font-bold text-neon-yellow text-neon-lg mb-4">
              MEET THE TEAM
            </h2>
            <p className="text-lg font-orbitron text-white/70 max-w-2xl mx-auto">
              The brilliant minds behind the neon revolution.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="cyberpunk-card p-8 text-center hover:scale-105 transition-transform duration-300"
                variants={fadeInUp}
              >
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-${member.color} to-black border-2 border-${member.color} flex items-center justify-center`}>
                  <div className={`text-2xl text-${member.color}`}>👤</div>
                </div>
                <h3 className={`text-2xl font-audiowide font-bold mb-2 text-${member.color} text-neon-sm`}>
                  {member.name}
                </h3>
                <p className="text-neon-orange font-orbitron font-bold text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-white/80 font-orbitron text-sm leading-relaxed">
                  {member.description}
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
            <h2 className="text-3xl sm:text-4xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
              JOIN THE NEON REVOLUTION
            </h2>
            <p className="text-lg font-orbitron text-white/70 mb-8 max-w-2xl mx-auto">
              Ready to transform your world with the power of neon? 
              Explore our collection and find your perfect piece of the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="/collection"
                className="inline-block px-10 py-5 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold text-xl rounded-lg shadow-neon-lg hover:shadow-neon transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EXPLORE COLLECTION
              </motion.a>
              <motion.button
                className="px-10 py-5 border-2 border-neon-cyan text-neon-cyan font-orbitron font-bold text-xl rounded-lg neon-border hover:bg-neon-cyan hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONTACT US
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
