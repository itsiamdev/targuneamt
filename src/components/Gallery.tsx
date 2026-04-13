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
    { src: '/cetatea neamt/img7.png', alt: 'Cetatea Neamțului' },
    { src: '/casa lui ion creanga/img1.png', alt: 'Casa Ion Creangă' },
    { src: '/manastirea neamt/img2.png', alt: 'Mănăstirea Neamț' },
    { src: agapia, alt: 'Mănăstirea Agapia' },
    { src: varatec, alt: 'Mănăstirea Văratec' },
    { src: museum, alt: 'Muzeu' },
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
