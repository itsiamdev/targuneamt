import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Users, Calendar, Landmark } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const stats = [
    {
      icon: MapPin,
      label: 'Locație',
      value: 'Județul Neamț, Moldova',
    },
    {
      icon: Users,
      label: 'Populație',
      value: '~19,000 locuitori',
    },
    {
      icon: Calendar,
      label: 'Fondat',
      value: 'Secolul al XIV-lea',
    },
    {
      icon: Landmark,
      label: 'Statut',
      value: 'Oraș istoric',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-nature">
            Despre Târgu Neamț
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Târgu Neamț este un oraș istoric situat în nordul Moldovei, în județul Neamț, 
            renumit pentru bogăția sa culturală și naturală. Așezat la poalele Carpaților Orientali, 
            orașul oferă o combinație unică între moștenirea medievală și frumusețea naturii înconjurătoare.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-medium hover:shadow-heavy transition-all duration-300 hover:-translate-y-2"
            >
              <stat.icon className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* History Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-legend">
            Istorie și Cultură
          </h3>
          <div className="space-y-4 text-muted-foreground">
            <p className="text-base md:text-lg leading-relaxed">
              Târgu Neamț își are originile în Evul Mediu, fiind menționat documentar pentru prima 
              dată în secolul al XIV-lea. Orașul a fost un important centru comercial și militar, 
              fiind apărat de impozanta Cetate a Neamțului, una dintre cele mai vechi și mai impresionante 
              fortificații medievale din România.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              În apropierea orașului se află celebrele mănăstiri din zona Neamț - Agapia, Văratec, 
              și Mănăstirea Neamț - adevărate comori ale arhitecturii religioase românești și centre 
              spirituale de o importanță deosebită.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Orașul este, de asemenea, cunoscut pentru legătura sa cu marele scriitor Ion Creangă, 
              a cărui casă memorială din Humulești atrage vizitatori din întreaga țară, păstrând vie 
              memoria unuia dintre cei mai iubiți autori români.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
