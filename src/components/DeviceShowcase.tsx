const DeviceShowcase = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Explorează Târgu Neamț
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Descoperă frumusețile și legendele celui mai pitoresc oraș din Moldova. Un ghid complet pentru turiști și vizitatori.
        </p>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left max-w-lg">
            <h3 className="text-2xl font-bold mb-4">Tot ce ai nevoie într-un singur loc</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">✓</span>
                <span>Ghid complet al obiectivelor turistice</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">✓</span>
                <span>Site 100% responsive - funcționează pe orice dispozitiv</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">✓</span>
                <span>Informații despre mănăstiri și cetăți</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">✓</span>
                <span>Evenimente și festivaluri locale</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">✓</span>
                <span>Galerie foto și video</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">✓</span>
                <span>Hartă interactivă a zonei</span>
              </li>
            </ul>
          </div>
          
          {/* Right side - Device mockup image */}
          <div className="hidden lg:block">
            <img 
              src="/apple-responsive-devices-mockup (1).png" 
              alt="Device mockup" 
              className="max-w-md w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceShowcase;