import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Attractions from '@/components/Attractions';
import Events from '@/components/Events';
import Map from '@/components/Map';
import DeviceShowcase from '@/components/DeviceShowcase';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    const fromAttractions = sessionStorage.getItem('fromAttractions');
    if (fromAttractions) {
      sessionStorage.removeItem('fromAttractions');
      setTimeout(() => {
        document.getElementById('attractions')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
        <Attractions />
      <Events />
      <Map />
      <DeviceShowcase />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
