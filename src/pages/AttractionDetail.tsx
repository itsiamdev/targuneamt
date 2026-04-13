import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import casaCreanga from '@/assets/images/casa-creanga.jpg';
import manastireaNemt from '@/assets/images/manastirea-neamt.jpg';
import agapia from '@/assets/images/agapia.jpg';
import varatec from '@/assets/images/varatec.jpg';
import museum from '@/assets/images/museum.jpg';

const attractionsData = {
  'cetatea-neamt': {
    title: 'Cetatea Neamțului',
    description: 'Fortificație medievală impresionantă din secolul al XIV-lea, situată pe un deal strategic. Una dintre cele mai bine păstrate cetăți din România, oferă priveliști spectaculoase asupra împrejurimilor.',
    image: '/cetatea neamt/img1.png',
    fullDescription: `Cetatea Neamțului este una dintre cele mai importante fortificații medievale din România, construită în secolul al XIV-lea în timpul domniei lui Petru Mușat. Așezată pe un deal stâncos la 480m altitudine, cetatea domina valea Ozanei și controla drumul comercial dintre Moldova și Transilvania.

În timpul lui Ștefan cel Mare, cetatea a fost consolidată și au fost adăugate turnuri de apărare masive. Zidurile de piatră au o grosime de până la 3 metri în unele locuri, iar turnurile de colț ofereau poziții strategice pentru apărare.

Astăzi, vizitatorii pot explora ruinele bine conservate ale cetății, pot urca pe ziduri pentru priveliști panoramice și pot vizita micul muzeu amenajat în incintă. Cetatea rămâne un simbol al rezistenței și ingeniozității arhitecturale medievale românești.`,
    location: 'Târgu Neamț, județul Neamț',
    period: 'Secolul XIV',
    accessibility: 'Accesibil turiștilor',
    schedule: {
      'Luni-Duminică': '09:00 - 18:00',
    },
    admission: {
      'Adulți': '10 RON',
      'Elevi/Studenți': '5 RON',
      'Pensionari': '7 RON',
    },
    gallery: [
      '/cetatea neamt/img1.png',
      '/cetatea neamt/img2.png',
      '/cetatea neamt/img3.png',
      '/cetatea neamt/img4.png',
      '/cetatea neamt/img5.png',
      '/cetatea neamt/img6.png',
      '/cetatea neamt/img7.png',
      '/cetatea neamt/img8.png',
      '/cetatea neamt/img9.png',
      '/cetatea neamt/img10.png',
      '/cetatea neamt/img11.png',
      '/cetatea neamt/img12.png',
      '/cetatea neamt/img13.png',
      '/cetatea neamt/img14.png',
      '/cetatea neamt/img15.png',
      '/cetatea neamt/img16.png',
      '/cetatea neamt/img17.png',
      '/cetatea neamt/img18.png',
      '/cetatea neamt/img19.png',
      '/cetatea neamt/img20.png',
      '/cetatea neamt/img21.png',
    ],
  },
  'casa-creanga': {
    title: 'Casa Ion Creangă - Humulești',
    description: 'Casa memorială a celebrului scriitor Ion Creangă, păstrând atmosfera în care au fost scrise povestirile clasice românești. Un loc plin de istorie literară și nostalgie.',
    image: '/casa lui ion creanga/img1.png',
    fullDescription: `Casa memorială Ion Creangă din Humulești este locul unde s-a născut și a copilărit unul dintre cei mai iubiți scriitori români. Construită în stil tradițional moldovenesc, casa a fost restaurată pentru a păstra atmosfera autentică din secolul al XIX-lea.

În interior, vizitatorii pot vedea obiecte personale ale scriitorului, manuscrise originale, ediții rare ale operelor sale și mobilier de epocă. Fiecare cameră spune o poveste despre viața și creația literară a lui Creangă.

Grădina casei include un mic muzeu etnografic cu unelte agricole tradiționale și obiecte casnice din perioada respectivă. Acest loc magic continuă să inspire generații de cititori și să păstreze vie memoria marelui povestitor român.`,
    location: 'Humulești, Târgu Neamț',
    period: 'Secolul XIX',
    accessibility: 'Muzeu memorial',
    schedule: {
      'Marți-Duminică': '10:00 - 17:00',
      'Luni': 'Închis',
    },
    admission: {
      'Adulți': '8 RON',
      'Elevi/Studenți': '4 RON',
      'Pensionari': '6 RON',
    },
    gallery: [
      '/casa lui ion creanga/img1.png',
      '/casa lui ion creanga/img2.png',
      '/casa lui ion creanga/img3.png',
      '/casa lui ion creanga/img4.png',
      '/casa lui ion creanga/img5.png',
      '/casa lui ion creanga/img6.png',
      '/casa lui ion creanga/img7.png',
      '/casa lui ion creanga/img8.png',
      '/casa lui ion creanga/img9.png',
      '/casa lui ion creanga/img10.png',
      '/casa lui ion creanga/img11.png',
      '/casa lui ion creanga/img12.png',
      '/casa lui ion creanga/img13.png',
      '/casa lui ion creanga/img14.png',
      '/casa lui ion creanga/img15.png',
      '/casa lui ion creanga/img16.png',
      '/casa lui ion creanga/img17.png',
      '/casa lui ion creanga/img18.png',
      '/casa lui ion creanga/img19.png',
      '/casa lui ion creanga/img20.png',
    ],
  },
  'manastirea-neamt': {
    title: 'Mănăstirea Neamț',
    description: 'Una dintre cele mai vechi și importante mănăstiri din Moldova, fondată în secolul al XIV-lea. Centru spiritual și cultural de o importanță deosebită pentru ortodoxia românească.',
    image: '/manastirea neamt/img2.png',
    fullDescription: `Mănăstirea Neamț este unul dintre cele mai importante așezăminte monahale din România, cu o istorie care se întinde pe peste șase secole. Fondată în timpul domniei lui Petru Mușat, mănăstirea a devenit un centru major de cultură și spiritualitate ortodoxă.

Biserica mănăstirii, construită în stil moldovenesc tradițional, găzduiește o colecție valoroasă de icoane vechi și manuscrise. Biblioteca mănăstirii conține cărți rare și documente istorice de valoare inestimabilă.

De-a lungul secolelor, Mănăstirea Neamț a jucat un rol crucial în păstrarea identității naționale și culturale românești, fiind un refugiu pentru cărturari și artiști în vremuri tulburi.`,
    location: 'Vânători-Neamț, județul Neamț',
    period: 'Secolul XIV',
    accessibility: 'Mănăstire activă',
    schedule: {
      'Luni-Duminică': '06:00 - 20:00',
    },
    admission: {
      'Acces': 'Gratuit',
      'Donatii': 'Opțional',
    },
    gallery: [
      '/manastirea neamt/img1.png',
      '/manastirea neamt/img2.png',
      '/manastirea neamt/img3.png',
      '/manastirea neamt/img4.png',
    ],
  },
  'agapia': {
    title: 'Mănăstirea Agapia',
    description: 'Complex monahal renumit pentru pictura în stil neobizantin a lui Nicolae Grigorescu. Situată într-un cadru natural de poveste, este un loc de liniște și contemplare.',
    image: '/manastirea agapia/img1.png',
    fullDescription: `Mănăstirea Agapia, situată într-o poiană înconjurată de păduri seculare, este renumită pentru frumusețea sa arhitecturală și pentru picturile murale realizate de tânărul Nicolae Grigorescu. Acesta a decorat biserica mănăstirii în 1858-1860, înainte de a deveni celebru ca pictor.

Complexul monahal include mai multe clădiri construite în diferite perioade istorice, fiecare adăugând un strat la bogata istorie a locului. Biserica principală, cu turnurile sale zvelte, domină peisajul și poate fi văzută de la distanță.

Mănăstirea găzduiește o comunitate activă de călugărițe care se dedică rugăciunii, muncii manuale și primirii pelerinilor. Grădinile îngrijite și atmosfera pașnică fac din Agapia un loc ideal pentru retragere spirituală.`,
    location: 'Agapia, județul Neamț',
    period: 'Secolul XVII',
    accessibility: 'Mănăstire activă',
    schedule: {
      'Luni-Duminică': '07:00 - 19:00',
    },
    admission: {
      'Acces': 'Gratuit',
      'Donatii': 'Opțional',
    },
    gallery: [
      '/manastirea agapia/img1.png',
      '/manastirea agapia/img2.png',
      '/manastirea agapia/img3.png',
      '/manastirea agapia/img4.png',
      '/manastirea agapia/img5.png',
      '/manastirea agapia/img6.png',
      '/manastirea agapia/img7.png',
      '/manastirea agapia/img8.png',
      '/manastirea agapia/img9.png',
      '/manastirea agapia/img10.png',
      '/manastirea agapia/img11.png',
      '/manastirea agapia/img12.png',
      '/manastirea agapia/img13.png',
      '/manastirea agapia/img14.png',
    ],
  },
  'varatec': {
    title: 'Mănăstirea Văratec',
    description: 'Mănăstire de maici cunoscută pentru atmosfera sa pașnică și pentru frumoasele grădini. Un refugiu spiritual în mijlocul naturii verzi a Moldovei.',
    image: '/manastirea varatec/img1.png',
    fullDescription: `Mănăstirea Văratec este una dintre cele mai mari mănăstiri de maici din România, fondată la sfârșitul secolului al XVIII-lea. Situată într-un cadru natural de o frumusețe rară, mănăstirea este înconjurată de grădini bine întreținute și păduri bătrâne.

Arhitectura complexului reflectă diferite perioade istorice, cu clădiri construite și renovate de-a lungul timpului. Biserica principală, cu hramul Adormirea Maicii Domnului, este un exemplu frumos de arhitectură religioasă moldovenească.

Mănăstirea este cunoscută pentru tradiția sa în iconografie și broderie, iar maicile de aici continuă să practice aceste arte tradiționale. Vizitatorii sunt impresionați de liniștea locului și de căldura cu care sunt primiți.`,
    location: 'Văratec, județul Neamț',
    period: 'Secolul XVIII',
    accessibility: 'Mănăstire activă',
    schedule: {
      'Luni-Duminică': '07:00 - 19:00',
    },
    admission: {
      'Acces': 'Gratuit',
      'Donatii': 'Opțional',
    },
    gallery: [
      '/manastirea varatec/img1.png',
      '/manastirea varatec/img2.png',
      '/manastirea varatec/img3.png',
      '/manastirea varatec/img4.png',
      '/manastirea varatec/img5.png',
      '/manastirea varatec/img6.png',
      '/manastirea varatec/img7.png',
      '/manastirea varatec/img8.png',
      '/manastirea varatec/img9.png',
      '/manastirea varatec/img10.png',
      '/manastirea varatec/img11.png',
      '/manastirea varatec/img12.png',
      '/manastirea varatec/img13.png',
    ],
  },
  'muzeu-istorie': {
    title: 'Muzeul de Istorie și Etnografie',
    description: 'Muzeu care prezintă bogata moștenire istorică și culturală a zonei Neamț, cu exponate ce acoperă perioada de la preistorie până în epoca modernă.',
    image: '/muzeul de istorie si etnografie/img1.png',
    fullDescription: `Muzeul de Istorie și Etnografie din Târgu Neamț este o instituție culturală importantă care păstrează și prezintă patrimoniul istoric al zonei. Colecțiile muzeului includ artefacte din toate perioadele istorice, de la unelte neolitice până la obiecte din epoca modernă.

Secția de arheologie expune descoperiri din siturile antice din apropiere, inclusiv obiecte din cultura Cucuteni, una dintre cele mai vechi civilizații europene. Secția de istorie medievală se concentrează pe perioada de glorie a Cetății Neamțului.

Secția etnografică prezintă costume tradiționale, unelte agricole, obiecte casnice și meșteșuguri tradiționale specifice zonei Neamț. Muzeul organizează periodic expoziții temporare și evenimente culturale care promovează tradițiile locale.`,
    location: 'Târgu Neamț, județul Neamț',
    period: 'Diverse perioade',
    accessibility: 'Muzeu public',
    schedule: {
      'Marți-Duminică': '10:00 - 18:00',
      'Luni': 'Închis',
    },
    admission: {
      'Adulți': '12 RON',
      'Elevi/Studenți': '6 RON',
      'Pensionari': '8 RON',
    },
    gallery: [
      '/muzeul de istorie si etnografie/img1.png',
      '/muzeul de istorie si etnografie/img2.png',
      '/muzeul de istorie si etnografie/img3.png',
      '/muzeul de istorie si etnografie/img4.png',
      '/muzeul de istorie si etnografie/img5.png',
      '/muzeul de istorie si etnografie/img6.png',
      '/muzeul de istorie si etnografie/img7.png',
      '/muzeul de istorie si etnografie/img8.png',
      '/muzeul de istorie si etnografie/img9.png',
      '/muzeul de istorie si etnografie/img10.png',
    ],
  },
};

const AttractionDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const attraction = slug ? attractionsData[slug as keyof typeof attractionsData] : null;
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
    if (attraction) {
      setCurrentIndex((prev) => (prev + 1) % attraction.gallery.length);
    }
  }, [attraction]);

  const prevImage = useCallback(() => {
    if (attraction) {
      setCurrentIndex((prev) => (prev - 1 + attraction.gallery.length) % attraction.gallery.length);
    }
  }, [attraction]);

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

  if (!attraction) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Obiectivul nu a fost găsit</h1>
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
            src={attraction.image}
            alt={attraction.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Button
                onClick={() => {
                  sessionStorage.setItem('fromAttractions', 'true');
                  navigate('/');
                }}
                variant="outline"
                className="mb-6 gap-2 bg-background/80 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Înapoi
              </Button>
              <h1 className="text-4xl md:text-6xl font-bold text-gradient-nature mb-4">
                {attraction.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {attraction.description}
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
                  {attraction.fullDescription}
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
                  {attraction.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/3] rounded-xl overflow-hidden shadow-medium hover:shadow-heavy transition-all duration-300 cursor-pointer"
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={img}
                        alt={`${attraction.title} - ${idx + 1}`}
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
                    <div>
                      <p className="text-sm text-muted-foreground">Locație</p>
                      <p className="font-medium">{attraction.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Perioadă</p>
                      <p className="font-medium">{attraction.period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accesibilitate</p>
                      <p className="font-medium">{attraction.accessibility}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-gradient-nature">
                    Program de Vizitare
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(attraction.schedule).map(([days, hours]) => (
                      <div key={days} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{days}</span>
                        <span className="font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-gradient-nature">
                    Taxe de Acces
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(attraction.admission).map(([category, price]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{category}</span>
                        <span className="font-medium">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
            src={attraction.gallery[currentIndex]}
            alt={`${attraction.title} - ${currentIndex + 1}`}
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
            {currentIndex + 1} / {attraction.gallery.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AttractionDetail;
