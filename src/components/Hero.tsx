import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import heroBg from '@/assets/images/hero-bg.jpg';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Leaf positions for frame effect
  const leaves = [
    { id: 1, x: '5%', y: '10%', rotation: -15, delay: 0 },
    { id: 2, x: '15%', y: '5%', rotation: 10, delay: 0.1 },
    { id: 3, x: '85%', y: '8%', rotation: 15, delay: 0.2 },
    { id: 4, x: '92%', y: '15%', rotation: -10, delay: 0.3 },
    { id: 5, x: '8%', y: '85%', rotation: 20, delay: 0.4 },
    { id: 6, x: '15%', y: '92%', rotation: -20, delay: 0.5 },
    { id: 7, x: '88%', y: '88%', rotation: 10, delay: 0.6 },
    { id: 8, x: '95%', y: '82%', rotation: -15, delay: 0.7 },
  ];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/60" />
      </motion.div>

      {/* Animated Leaves Frame */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute w-12 h-12 md:w-20 md:h-20"
          style={{
            left: leaf.x,
            top: leaf.y,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: leaf.rotation,
          }}
          transition={{
            duration: 1,
            delay: leaf.delay,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-lg"
            animate={{
              y: [0, -10, 0],
              rotate: [leaf.rotation, leaf.rotation + 5, leaf.rotation],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <path
              d="M50 10 Q70 30 80 50 Q70 70 50 90 Q30 70 20 50 Q30 30 50 10"
              fill="hsl(145 50% 45%)"
              opacity="0.8"
            />
            <path
              d="M50 10 L50 90"
              stroke="hsl(150 45% 25%)"
              strokeWidth="2"
              fill="none"
            />
          </motion.svg>
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Târgu Neamț
            </h1>
            <motion.p
              className="text-xl md:text-3xl text-secondary font-semibold drop-shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Orașul Legendelor
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-12"
          >
            <motion.button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg shadow-heavy hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Descoperă Orașul
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
