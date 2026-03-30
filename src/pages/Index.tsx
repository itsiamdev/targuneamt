import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Attractions from '@/components/Attractions';
import Events from '@/components/Events';
import Map from '@/components/Map';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Attractions />
      <Events />
      <Map />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
