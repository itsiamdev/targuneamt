import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const eventsData = {
  1: {
    title: 'Festivalul Medieval al Cetății Neamț',
    date: '15-17 Iulie 2026',
    location: 'Cetatea Neamțului',
    category: 'festival',
    shortDescription: 'Cel mai mare festival medieval din Moldova. Spectacole de jongleri, reconstituiri istorice și torturi medievale autentice.',
    fullDescription: `Festivalul Medieval al Cetății Neamțului este cel mai important eveniment cultural din regiune, care reuneiește anual mii de vizitatori pasionați de istorie și tradiții.

    În decursul a trei zile, cetatea medievală se transformă într-o adevărată cetate a evului mediu, cu corturile cavalerilor, meșteșugarii care demonstrează artere tradiționale, și spectacole care evocă atmosfera vremurilor beduin.

    Programul evenimentului include:
    - Spectacole de jongleri și artiști de stradă
    - Reconstituiri istorice cu armură și arme autentice
    - Târgul medieval cu meșteșuguri tradiționale
    - Concurs de arme și demonstrări de luptă
    - Mâncare și băuturi medievale
    - Concerte cu muzică populară și instrumentală,

    Evenimentul este organizat de consiliul local în colaborare cu direcția muzeelor și are loc în incinta Cetății Neamțului, oferind o experiență autentică de viață medievală.`,
    image: '/cetatea neamt/img7.png',
    schedule: {
      'Vineri': '10:00 - 22:00',
      'Sâmbătă': '09:00 - 24:00',
      'Duminică': '09:00 - 20:00',
    },
    admission: {
      'Adulți': '25 RON',
      'Copii (7-18 ani)': '15 RON',
      'Familie (2+2)': '60 RON',
    },
    gallery: [
      '/cetatea neamt/img7.png',
      '/cetatea neamt/img8.png',
      '/cetatea neamt/img9.png',
      '/cetatea neamt/img10.png',
      '/cetatea neamt/img11.png',
      '/cetatea neamt/img12.png',
    ],
  },
  2: {
    title: 'Serbările Varatecești',
    date: '14-16 August 2026',
    location: 'Mănăstirea Văratec',
    category: 'cultural',
    shortDescription: 'Sărbători religioase și culturale la cea mai mare mănăstire de maici din România.',
    fullDescription: `Serbările Varatecești reprezintă una dintre cele mai importante sărbători religioase și culturale din Moldova, ce are loc anual la mănăstirea Văratec.

    Evenimentul este organizat în onoarea Adormirii Maicii Domnului, hramul mănăstirii, și atragă tot mai mulți pelerini și turiști dornici să experiementeze tradițiile ortodoxe românești.

    Programul include:
    - Divine liturghii și rugăciuni comunitare
    - Processiuni religioase în curtea mănăstirii
    - Expoziții de artă religioasă și iconografie
    - Concerte de muzică bisericească și cântece tradiționale
    - Târg de meșteșuguri tradiționale și produse monastice
    - Degustări de mâncare tradițională moldovenească

    Mănăstirea Văratec, cu arhitectura sa impresionantă și grădinile sale bine întreținute, oferă un cadru perfect pentru această sărbătoare spirituală și culturală.`,
    image: '/manastirea varatec/img1.png',
    schedule: {
      'Vineri': '08:00 - 20:00',
      'Sâmbătă': '07:00 - 22:00',
      'Duminică': '06:00 - 18:00',
    },
    admission: {
      'Acces general': 'Gratuit',
      'Donatii': 'Binevenite',
    },
    gallery: [
      '/manastirea varatec/img1.png',
      '/manastirea varatec/img2.png',
      '/manastirea varatec/img3.png',
      '/manastirea varatec/img4.png',
      '/manastirea varatec/img5.png',
    ],
  },
  3: {
    title: 'Festivalul Culinar Moldovenesc',
    date: '22-24 Septembrie 2026',
    location: 'Parcul Central',
    category: 'festival',
    shortDescription: 'Descoperă gusturile autentice ale Moldovei: sarmale, plăcinte și vinuri locale.',
    fullDescription: `Festivalul Culinar Moldovenesc este o celebrare a tradițiilor gastronomice ale Moldovei, care reunește cei mai buni chef-uri locali, producători de vin și meșteșugari de alimente tradiționale.

    Vizitatorii pot degusta o varietate impresionantă de preparate tradiționale, de la sarmale și mămăligă, până la plăcinte cu diversi umpluturi și deserturi autentice.

    În cadrul festivalului:
    - Standuri cu preparate culinare tradiționale
    - Demonstrații de gătit cu rețete vechi de familie
    - Târg de produse locale și bio
    - Concursuri de Gastronomie
    - Concerte cu muzică live folk
    - Ateliere pentru copii despre alimentație sănătoasă

    Festivalul se desfășoară în Parcul Central din Târgu Neamț și este un eveniment families, ideal pentru iubitorii de mâncare tradițională și cultură locală.`,
    image: '/muzeul de istorie si etnografie/img1.png',
    schedule: {
      'Vineri': '11:00 - 22:00',
      'Sâmbătă': '10:00 - 23:00',
      'Duminică': '10:00 - 20:00',
    },
    admission: {
      'Acces general': 'Gratuit',
      'Degustări': 'Conform meniului',
    },
    gallery: [
      '/muzeul de istorie si etnografie/img1.png',
      '/muzeul de istorie si etnografie/img2.png',
      '/muzeul de istorie si etnografie/img3.png',
    ],
  },
  4: {
    title: 'Tabăra de Artă Agapia',
    date: '10-20 Iulie 2026',
    location: 'Mănăstirea Agapia',
    category: 'cultural',
    shortDescription: 'Tabără de pictură și arte vizuale pentru tineri, organizată cu artiști renumiți.',
    fullDescription: `Tabăra de Artă Agapia este un program educațional și cultural destinat tinerilor pasionați de arte vizuale, care se desfășorează în cadrul painters al mănăstirii Agapia, un loc de o frumusețe și liniște deosebită.

    Sub îndrumarea artiștilor renumiți din țară și străinătate, participanii își pot dezvolta abilitățile în pictură, desen, sculptură și alte forme de artă vizuală. Tabăra este organizată de Asociația Culturală Agapia în parteneriat cu mănăstirea și sprijinul Primăriei Târgu Neamț.

    Activități principale:
    - Ateliere de pictură și desen
    - Cursuri de istoria artei și tehnici artistice
    - Sesiuni de schiță și studiu pe natură
    - Expoziții de artele participanților
    - Vizite la mănăstire și circuit turistic
    - Conferințe cu artiști invitați

    Locatia oferă o sursă constantă de inspirație, cu peisajul natural impresionant și atmosfera de spiritualitate care influențează pozitiv creația artistică.`,
    image: '/manastirea agapia/img1.png',
    schedule: {
      'Zilele de lucru': '09:00 - 17:00',
      'Sâmbătă-Duminică': '10:00 - 18:00',
    },
    admission: {
      'Participanți': '300 RON (întregul tabăr)',
      'Reduceri': 'Disponibile pentru elevi',
    },
    gallery: [
      '/manastirea agapia/img1.png',
      '/manastirea agapia/img2.png',
      '/manastirea agapia/img3.png',
      '/manastirea agapia/img4.png',
    ],
  },
  5: {
    title: 'Concert de Gală - Muzică Clasică',
    date: '25 Iulie 2026',
    location: 'Casa de Cultură',
    category: 'concert',
    shortDescription: 'Seară de muzică clasică susținută de Orchestra Filarmonică din Iași.',
    fullDescription: `Concertul de Gală cu muzică clasică reprezintă unul dintre evenimentele musicale de prestigiu din calendarul cultural al Târgu Neamțului, organizat în parteneriat cu Orchestra Filarmonică din Iași.

    În program, lucrări ale compositorilor renumiți din perioada clasică și romantică, interpretate de muzicieni profesioniști. Concertul are loc în sala de concerte a Casei de Cultură Ion Creangă, cu o acustică excelentă și o atmosferă elegantă.

    Programul concertei:
    - Ludwig van Beethoven – Sinfonia nr. 5
    - Wolfgang Amadeus Mozart – Concert pentru pian
    - Pyotr Ilyich Tchaikovsky – Selecții din balete
    - George Enescu – Poeme românești

    Este o oportunitate excelentă pentru iubitorii de muzică clasică să se bucure de o performanță de calitate într-o locație accesibilă.`,
    image: '/casa culturii ion creanga/img1.png',
    schedule: {
      'Data': '25 Iulie 2026',
      'Începere': '19:00',
      'Acces': '18:30',
    },
    admission: {
      'Adulți': '50 RON',
      'Studenți': '30 RON',
      'Elevi': '20 RON',
    },
    gallery: [
      '/casa culturii ion creanga/img1.png',
      '/casa culturii ion creanga/img2.png',
      '/casa culturii ion creanga/img3.png',
    ],
  },
  6: {
    title: 'Spectacolul de Datini și Obiceiuri',
    date: '20 Decembrie 2026',
    location: 'Casa de Cultură',
    category: 'cultural',
    shortDescription: 'Spectacol de Crăciun cu datini și obiceiuri specifice zonei Neamț.',
    fullDescription: `Spectacolul de Datini și Obiceiuri este un eveniment annual care prezintă tradițiile de iarnă și sărbătorile de Crăciun specifice zonei Neamțului și Moldovei.

    Organized by local cultural groups and schools, the show features:
    - Cântece și dansuri tradiționale de iarnă
    - Jocuri și obiceiuri din Crăciun
    - Povestiri și povești despre Moș Crăciun și urâtul
    - Expoziție de obiecte tradiționale de iarnă
    - Prezentări de artizanat local
    - Meșteșugari care demonstrează lucrurile tradiionale

    Evenimentul este o festivitate de culminare a anualului, care reunește comunitatea locală și vizitatorii într-o atmosferă de bilețel și tradiție.`,
    image: '/casa lui ion creanga/img1.png',
    schedule: {
      'Data': '20 Decembrie 2026',
      'Începere': '18:00',
      'Acces': '17:30',
    },
    admission: {
      'Adulți': '20 RON',
      'Copii': '10 RON',
    },
    gallery: [
      '/casa lui ion creanga/img1.png',
      '/casa lui ion creanga/img2.png',
      '/casa lui ion creanga/img3.png',
      '/casa lui ion creanga/img4.png',
    ],
  },
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = id ? eventsData[Number(id) as keyof typeof eventsData] : null;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback(() => {
    if (event) {
      setCurrentIndex((prev) => (prev + 1) % event.gallery.length);
    }
  }, [event]);

  const prevImage = useCallback(() => {
    if (event) {
      setCurrentIndex((prev) => (prev - 1 + event.gallery.length) % event.gallery.length);
    }
  }, [event]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Evenimentul nu a fost găsit</h1>
          <Button onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Înapoi la pagina principală
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Button
                onClick={() => navigate('/evenimente')}
                variant="outline"
                className="mb-6 gap-2 bg-background/80 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Înapoi la evenimente
              </Button>
              <h1 className="text-4xl md:text-6xl font-bold text-gradient-nature mb-4">
                {event.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {event.shortDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.fullDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12"
              >
                <h2 className="text-2xl font-bold mb-6 text-gradient-nature">
                  Galerie Foto
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/3] rounded-xl overflow-hidden shadow-medium hover:shadow-heavy transition-all duration-300 cursor-pointer"
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={img}
                        alt={`${event.title} - ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card rounded-xl p-6 shadow-medium sticky top-24 space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gradient-nature">
                    Informații
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p className="font-medium">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Locație</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Program</p>
                        <div className="space-y-1">
                          {Object.entries(event.schedule).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="text-sm text-muted-foreground">{day}</span>
                              <span className="font-medium">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-gradient-nature">
                    Taxe de Acces
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(event.admission).map(([category, price]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{category}</span>
                        <span className="font-medium">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full gap-2">
                  <Ticket className="w-4 h-4" />
                  Rezervă bilet
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={event.gallery[currentIndex]}
            alt={`${event.title} - ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {event.gallery.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EventDetail;
