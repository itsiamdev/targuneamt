import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Music, Palette, Utensils, Theater, Flame } from 'lucide-react';
import cetateaNeamt from '@/assets/images/cetatea-neamt.jpg';
import agapia from '@/assets/images/agapia.jpg';
import varatec from '@/assets/images/varatec.jpg';
import museum from '@/assets/images/museum.jpg';
import casaCreanga from '@/assets/images/casa-creanga.jpg';
import manastireaNeamt from '@/assets/images/manastirea-neamt.jpg';

type EventCategory = 'festival' | 'fair' | 'cultural' | 'food' | 'performance' | 'traditional';

interface LocalEvent {
  name: string;
  date: string;
  location: string;
  category: EventCategory;
  description: string;
  image: string;
}

const events: LocalEvent[] = [
  {
    name: 'Festivalul Medieval al Cetății Neamț',
    date: '15-17 Iulie 2026',
    location: 'Cetatea Neamțului',
    category: 'festival',
    description: 'Cel mai mare festival medieval din Moldova, cu spectacole de jongleri, reconstituiri istorice și torturi medievale.',
    image: cetateaNeamt,
  },
  {
    name: 'Târgul Mărțișorului',
    date: '1 Martie 2026',
    location: 'Centrul Târgu Neamț',
    category: 'fair',
    description: 'Târg tradițional cu obiecte hand-made, mărțișoare și produse meșteșugărești locale.',
    image: agapia,
  },
  {
    name: 'Serbările Varatecești',
    date: '14-16 August 2026',
    location: 'Mănăstirea Văratec',
    category: 'traditional',
    description: 'Sărbători religioase și culturale la cea mai mare mănăstire de maici din România.',
    image: varatec,
  },
  {
    name: 'Festivalul Culinar Moldovenesc',
    date: '22-24 Septembrie 2026',
    location: 'Parcul Central Târgu Neamț',
    category: 'food',
    description: 'Descoperă gusturile autentice ale Moldovei: sarmale, plăcinte, cozonaci și vinuri locale.',
    image: museum,
  },
  {
    name: 'Tabăra de Artă Agapia',
    date: '10-20 Iulie 2026',
    location: 'Mănăstirea Agapia',
    category: 'cultural',
    description: 'Tabără de pictură și arte vizuale pentru tineri, organizată în colaborare cu artiști renumiți.',
    image: agapia,
  },
  {
    name: 'Spectacolul de Datini și Obiceiuri',
    date: '20 Decembrie 2026',
    location: 'Casa de Cultură Târgu Neamț',
    category: 'performance',
    description: 'Spectacol de Crăciun cu datini și obiceiuri specifice zonei Neamț.',
    image: casaCreanga,
  },
  {
    name: 'Târgul de Toamnă',
    date: '15 Octombrie 2026',
    location: 'Piața Centrală',
    category: 'fair',
    description: 'Târg de produse tradiționale: miere, legume, fructe și preparate din sezon.',
    image: manastireaNeamt,
  },
  {
    name: 'Ziua Culturii Românești',
    date: '15 Octombrie 2026',
    location: 'Muzeul de Istorie și Etnografie',
    category: 'cultural',
    description: 'Eveniment dedicat culturii românești cu expoziții, lecturi și ateliere pentru copii.',
    image: museum,
  },
];

const categoryIcons: Record<EventCategory, React.ReactNode> = {
  festival: <Music className="w-5 h-5" />,
  fair: <Calendar className="w-5 h-5" />,
  cultural: <Palette className="w-5 h-5" />,
  food: <Utensils className="w-5 h-5" />,
  performance: <Theater className="w-5 h-5" />,
  traditional: <Flame className="w-5 h-5" />,
};

const categoryColors: Record<EventCategory, string> = {
  festival: '#dc2626',
  fair: '#ea580c',
  cultural: '#7c3aed',
  food: '#ca8a04',
  performance: '#0891b2',
  traditional: '#16a34a',
};

const categoryLabels: Record<EventCategory, string> = {
  festival: 'Festival',
  fair: 'Târg',
  cultural: 'Cultural',
  food: 'Gastronomic',
  performance: 'Spectacol',
  traditional: 'Tradițional',
};

const Events = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="events" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-nature">
            Evenimente Locale
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Descoperă festivalurile, târgurile și evenimentele culturale din zona Târgu Neamț
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border/50"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: categoryColors[event.category] }}
                >
                  {categoryIcons[event.category]}
                  {categoryLabels[event.category]}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {event.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t border-border">
                  <span className="font-medium">Locație:</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            ✨ Mai multe evenimente vor fi adăugate pe măsură ce se apropie sezonul
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;