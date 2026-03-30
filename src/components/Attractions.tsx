import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AttractionCard from './AttractionCard';
import cetateaNeamt from '@/assets/images/cetatea-neamt.jpg';
import casaCreanga from '@/assets/images/casa-creanga.jpg';
import manastireaNemt from '@/assets/images/manastirea-neamt.jpg';
import agapia from '@/assets/images/agapia.jpg';
import varatec from '@/assets/images/varatec.jpg';
import museum from '@/assets/images/museum.jpg';

const Attractions = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const attractions = [
    {
      title: 'Cetatea Neamțului',
      description:
        'Fortificație medievală impresionantă din secolul al XIV-lea, situată pe un deal strategic. Una dintre cele mai bine păstrate cetăți din România, oferă priveliști spectaculoase asupra împrejurimilor.',
      image: cetateaNeamt,
    },
    {
      title: 'Casa Ion Creangă - Humulești',
      description:
        'Casa memorială a celebrului scriitor Ion Creangă, păstrând atmosfera în care au fost scrise povestirile clasice românești. Un loc plin de istorie literară și nostalgie.',
      image: casaCreanga,
    },
    {
      title: 'Mănăstirea Neamț',
      description:
        'Una dintre cele mai vechi și importante mănăstiri din Moldova, fondată în secolul al XIV-lea. Centru spiritual și cultural de o importanță deosebită pentru ortodoxia românească.',
      image: manastireaNemt,
    },
    {
      title: 'Mănăstirea Agapia',
      description:
        'Complex monahal renumit pentru pictura în stil neobizantin a lui Nicolae Grigorescu. Situată într-un cadru natural de poveste, este un loc de linişte şi contemplare.',
      image: agapia,
    },
    {
      title: 'Mănăstirea Văratec',
      description:
        'Mănăstire de maici cunoscută pentru atmosfera sa pașnică și pentru frumoasele grădini. Un refugiu spiritual în mijlocul naturii verzi a Moldovei.',
      image: varatec,
    },
    {
      title: 'Muzeul de Istorie și Etnografie',
      description:
        'Muzeu care prezintă bogata moștenire istorică și culturală a zonei Neamț, cu exponate ce acoperă perioada de la preistorie până în epoca modernă.',
      image: museum,
    },
  ];

  return (
    <section id="attractions" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-nature">
            Atracții Turistice
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Descoperă comoarele istorice și spirituale ale zonei Târgu Neamț
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <AttractionCard
              key={attraction.title}
              {...attraction}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attractions;
