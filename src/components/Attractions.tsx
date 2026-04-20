import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AttractionCard from './AttractionCard';

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
      image: '/cetatea neamt/img7.png',
      slug: 'cetatea-neamt',
    },
    {
      title: 'Casa Ion Creangă - Humulești',
      description:
        'Casa memorială a celebrului scriitor Ion Creangă, păstrând atmosfera în care au fost scrise povestirile clasice românești. Un loc plin de istorie literară și nostalgie.',
      image: '/casa lui ion creanga/img1.png',
      slug: 'casa-creanga',
    },
    {
      title: 'Mănăstirea Neamț',
      description:
        'Una dintre cele mai vechi și importante mănăstiri din Moldova, fondată în secolul al XIV-lea. Centru spiritual și cultural de o importanță deosebită pentru ortodoxia românească.',
      image: '/manastirea neamt/img2.png',
      slug: 'manastirea-neamt',
    },
    {
      title: 'Mănăstirea Agapia',
      description:
        'Complex monahal renumit pentru pictura în stil neobizantin a lui Nicolae Grigorescu. Situată într-un cadru natural de poveste, este un loc de linişte şi contemplare.',
      image: '/manastirea agapia/img1.png',
      slug: 'agapia',
    },
    {
      title: 'Mănăstirea Văratec',
      description:
        'Mănăstire de maici cunoscută pentru atmosfera sa pașnică și pentru frumoasele grădini. Un refugiu spiritual în mijlocul naturii verzi a Moldovei.',
      image: '/manastirea varatec/img1.png',
      slug: 'varatec',
    },
    {
      title: 'Muzeul de Istorie și Etnografie',
      description:
        'Muzeu care prezintă bogata moștenire istorică și culturală a zonei Neamț, cu exponate ce acoperă perioada de la preistorie până în epoca modernă.',
      image: '/muzeul de istorie si etnografie/img1.png',
      slug: 'muzeu-istorie',
    },
    {
      title: 'Parcul Cetate',
      description:
        'Parc istoric situat la poalele Cetății Neamțului, cu alei pavate și vegetație seculară. Loc ideal pentru plimbări și priveliști spre cetate.',
      image: 'public/parc cetate/img1.jpeg',
      slug: 'parc-cetate',
    },
    {
      title: 'Casa Memorială Veronica Micle',
      description:
        'Casa memorială a celebrei poete Veronica Micle, soția lui Ion Creangă. Un loc dedicat memoriei marii poete a literaturii române.',
      image: '/casa memoriala veronica micle/img1.png',
      images: [
        '/casa memoriala veronica micle/img1.png',
        '/casa memoriala veronica micle/img2.png',
        '/casa memoriala veronica micle/img3.png',
        '/casa memoriala veronica micle/img4.png',
        '/casa memoriala veronica micle/img5.png',
      ],
      slug: 'casa-memoriala-veronica-micle',
    },
    {
      title: 'Cimitirul Evreiesc',
      description:
        'Cimitirul evreiesc istoric din Târgu Neamț, cu pietre funerare sculptate și inscripții în ebraică. Mărturie a comunității evreiești importante din zonă.',
      image: '/cimitirul evreiesc/img1.jpeg',
      images: [
        '/cimitirul evreiesc/img1.jpeg',
        '/cimitirul evreiesc/img2.jpeg',
        '/cimitirul evreiesc/img3.jpeg',
        '/cimitirul evreiesc/img4.jpeg',
        '/cimitirul evreiesc/img5.jpeg',
        '/cimitirul evreiesc/img6.jpeg',
        '/cimitirul evreiesc/img7.jpeg',
      ],
      slug: 'cimitirul-evreiesc',
    },
    {
      title: 'Biserica Adormirii Maicii Domnului',
      description:
        'Biserică monument istoric din centrul Târgu Neamțului, cu arhitectură moldovenească tradițională și icoane valoroase.',
      image: 'public/biserica adormirii maicii domnului/img1.png',
      images: [
        'public/biserica adormirii maicii domnului/img1.png',
        'public/biserica adormirii maicii domnului/img2.png',
        'public/biserica adormirii maicii domnului/img3.png',
        'public/biserica adormirii maicii domnului/img4.png',
        'public/biserica adormirii maicii domnului/img5.png',
      ],
      slug: 'biserica-adormirii-maicii-domnului',
    },
    {
      title: 'Casa Culturii Ion Creangă',
      description:
        'Centru cultural cu săli de expoziție, bibliotecă și spectacole. Poartă numele marelui scriitor Ion Creangă.',
      image: '/casa culturii ion creanga/img1.png',
      slug: 'casa-culturi-ion-creanga',
    },
    {
      title: 'Stadionul Cetate',
      description:
        'Stadionul municipal din Târgu Neamț, cu vedere spre cetatea medievală. Arena sportivă a orașului.',
      image: '/stadion cetate/img1.png',
      slug: 'stadion-cetate',
    },
    {
      title: 'Statuia lui Ion Creangă',
      description:
        'Monumentul sculptural dedicat marelui scriitor Ion Creangă, situat în centrul orașului Târgu Neamț.',
      image: '/statuia ion creanga/img1.png',
      slug: 'statuia-ion-creanga',
    },
    {
      title: 'Monumentul Eroilor',
      description:
        'Monument commemorativ ridicat în cinșta eroilor români din Primul Război Mondial și Al Doilea Război Mondial.',
      image: '/monumentul eroilor/img1.png',
      slug: 'monumentul-eroilor',
    },
    {
      title: 'Parcul Natural Vânători-Neamț',
      description:
        'Arie protejată de interes național cu floră și faună specifică Carpaților Orientali. Habitat pentru zimbri și urși.',
      image: '/parcul natural vanatori-neamt/img1.png',
      slug: 'parcul-natural-vanatori-neamt',
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
              title={attraction.title}
              description={attraction.description}
              image={attraction.image}
              slug={attraction.slug}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attractions;
