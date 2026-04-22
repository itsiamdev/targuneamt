import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type EventCategory = 'all' | 'cultural' | 'festival' | 'concert';

interface LocalEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  category: Exclude<EventCategory, 'all'>;
  description: string;
  image: string;
}

const events: LocalEvent[] = [
  {
    id: 1,
    title: 'Festivalul Medieval al Cetății Neamț',
    date: '15-17 Iulie 2026',
    location: 'Cetatea Neamțului',
    category: 'festival',
    description: 'Cel mai mare festival medieval din Moldova. Spectacole de jongleri, reconstituiri istorice și torturi medievale autentice.',
    image: '/cetatea neamt/img7.png',
  },
  {
    id: 2,
    title: 'Serbările Varatecești',
    date: '14-16 August 2026',
    location: 'Mănăstirea Văratec',
    category: 'cultural',
    description: 'Sărbători religioase și culturale la cea mai mare mănăstire de maici din România.',
    image: '/manastirea varatec/img1.png',
  },
  {
    id: 3,
    title: 'Festivalul Culinar Moldovenesc',
    date: '22-24 Septembrie 2026',
    location: 'Parcul Central',
    category: 'festival',
    description: 'Descoperă gusturile autentice ale Moldovei: sarmale, plăcinte și vinuri locale.',
    image: '/muzeul de istorie si etnografie/img1.png',
  },
  {
    id: 4,
    title: 'Tabăra de Artă Agapia',
    date: '10-20 Iulie 2026',
    location: 'Mănăstirea Agapia',
    category: 'cultural',
    description: 'Tabără de pictură și arte vizuale pentru tineri, organizată cu artiști renumiți.',
    image: '/manastirea agapia/img1.png',
  },
  {
    id: 5,
    title: 'Concert de Gală - Muzică Clasică',
    date: '25 Iulie 2026',
    location: 'Casa de Cultură',
    category: 'concert',
    description: 'Seară de muzică clasică susținută de Orchestra Filarmonică din Iași.',
    image: '/casa culturii ion creanga/img1.png',
  },
  {
    id: 6,
    title: 'Spectacolul de Datini și Obiceiuri',
    date: '20 Decembrie 2026',
    location: 'Casa de Cultură',
    category: 'cultural',
    description: 'Spectacol de Crăciun cu datini și obiceiuri specifice zonei Neamț.',
    image: '/casa lui ion creanga/img1.png',
  },
];

const filters: { value: EventCategory; label: string }[] = [
  { value: 'all', label: 'Toate' },
  { value: 'cultural', label: 'Culturale' },
  { value: 'festival', label: 'Festivaluri' },
  { value: 'concert', label: 'Concerte' },
];

const Events = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<EventCategory>('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.category === activeFilter);

  return (
    <section id="events" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Evenimente
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descoperă cele mai recente evenimente din Târgu Neamț
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>

                 <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-colors group/btn" onClick={() => navigate(`/evenimente/${event.id}`)}>
                   <span>Vezi detalii</span>
                   <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nu există evenimente în această categorie.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;