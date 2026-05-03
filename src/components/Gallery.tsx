import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import casaCreanga from '@/assets/images/casa-creanga.jpg';
import manastireaNemt from '@/assets/images/manastirea-neamt.jpg';
import agapia from '/manastirea agapia/img1.png';
import varatec from '/manastirea varatec/img1.png';
import museum from '/muzeul de istorie si etnografie/img1.png';

const Gallery = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const images = [
    // Local images
    { src: '/cetatea neamt/img1.png', alt: 'Cetatea Neamțului - Vista panoramică' },
    { src: '/casa lui ion creanga/img1.png', alt: 'Casa Ion Creangă - Frontispiciu' },
    { src: agapia, alt: 'Mănăstirea Agapia - Picturi murale' },
    { src: varatec, alt: 'Mănăstirea Văratec - Grădini florite' },
    { src: museum, alt: 'Muzeul de Istorie și Etnografie' },
    
    // Internet images of Târgu Neamț
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cetatea_Neam%C5%A3ului_%28T%C3%A2rgu_Neam%C5%A3%29.jpg/1024px-Cetatea_Neam%C5%A3ului_%28T%C3%A2rgu_Neam%C5%A3%29.jpg', alt: 'Cetatea Neamțului - Wikipedia' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Palatul_Culturilor_T%C3%A2rgu_Neam%C5%A3.jpg/1024px-Palatul_Culturilor_T%C3%A2rgu_Neam%C5%A3.jpg', alt: 'Palatul Culturilor Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Biserica_Din%C4%83tic%C4%83_%28T%C3%A2rgu_Neam%C5%A3%29.jpg/1024px-Biserica_Din%C4%83tic%C4%83_%28T%C3%A2rgu_Neam%C5%A3%29.jpg', alt: 'Biserica Dintrică Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Parcul_Cetate_T%C3%A2rgu_Neam%C5%A3.jpg/1024px-Parcul_Cetate_T%C3%A2rgu_Neam%C5%A3.jpg', alt: 'Parcul Cetate Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Monumentul_Eroilor_T%C3%A2rgu_Neam%C5%A3.jpg/1024px-Monumentul_Eroilor_T%C3%A2rgu_Neam%C5%A3.jpg', alt: 'Monumentul Eroilor Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Strada_Stefan_cel_Mare_Targu_Neamt.jpg/1024px-Strada_Stefan_cel_Mare_Targu_Neamt.jpg', alt: 'Strada Ștefan cel Mare Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Statua_Ion_Creanga_Targu_Neamt.jpg/1024px-Statua_Ion_Creanga_Targu_Neamt.jpg', alt: 'Statuia lui Ion Creangă Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Biserica_sf_Treime_Targu_Neamt.jpg/1024px-Biserica_sf_Treime_Targu_Neamt.jpg', alt: 'Biserica Sfânta Treime Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gr%C4%83din%C4%83_Publica_Targu_Neamt.jpg/1024px-Gr%C4%83din%C4%83_Publica_Targu_Neamt.jpg', alt: 'Grădină Publică Târgu Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cladirea_Prefecturii_Judet_Neamt.jpg/1024px-Cladirea_Prefecturii_Judet_Neamt.jpg', alt: 'Prefectura Județului Neamț' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Gamma_Targu_Neamt_Hotel.jpg/1024px-Gamma_Targu_Neamt_Hotel.jpg', alt: 'Hotel Gamma Târgu Neamț' },
  ];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-nature">
            Galerie Foto
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Imagini din cele mai frumoase locuri din Târgu Neamț
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-medium hover:shadow-heavy transition-all duration-300"
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-white font-bold text-xl">{image.alt}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
