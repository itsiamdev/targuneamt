import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AttractionCardProps {
  title: string;
  description: string;
  image?: string;
  images?: string[];
  index: number;
  slug: string;
}

const AttractionCard = ({ title, description, image, images, index, slug }: AttractionCardProps) => {
  const navigate = useNavigate();
  const displayImage = images ? images[0] : image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/atractii/${slug}`)}
      className="group bg-card rounded-xl overflow-hidden shadow-medium hover:shadow-heavy transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gradient-nature">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default AttractionCard;
