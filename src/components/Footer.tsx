import { Facebook, Instagram, Mail, Github, Linkedin, Globe, Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">Târgu Neamț</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Orașul Legendelor - Descoperă frumusețea și istoria Moldovei în inima Carpaților.
              </p>
            </div>

            {/* CEO */}
            <div>
              <h3 className="text-xl font-bold mb-4">CEO</h3>
              <p className="text-primary-foreground/80 mb-4">
                În conducerea organizatiei turistice locală, CEO-ul şi echipa sa lucrează pentru promovarea destinatiei Târgu Neamț.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/ceo-targuneamt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="LinkedIn CEO"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:ceo@targuneamt.ro"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Email CEO"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

           {/* Quick Links */}
           <div>
             <h3 className="text-xl font-bold mb-4">Link-uri Rapide</h3>
             <ul className="space-y-2">
               {['Acasă', 'Despre', 'Atracții', 'Evenimente', 'Hartă', 'Întrebări frecvente', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const id = item.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
                      const element = document.getElementById(id);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rețele Sociale</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dezvoltator</h3>
            <p className="text-primary-foreground/80 mb-4">
              Site dezvoltat cu pasiune pentru promovarea turismului local.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/itsiamdev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ioni%C8%9B%C4%83-aurel-mihai-20648536a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://ionitaaurelmihai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Contribuie Section */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Code className="w-6 h-6" />
              Contribuie
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Acest proiect este complet open source. Oricine poate contribui la dezvoltarea și îmbunătățirea acestei platforme dedicate promovării turismului din Târgu Neamț.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href="https://github.com/itsiamdev/targuneamt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Github className="w-5 h-5" />
                Vezi pe GitHub
              </a>
              <a
                href="https://github.com/itsiamdev/targuneamt/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Heart className="w-5 h-5" />
                Raportează o problemă
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {currentYear} Târgu Neamț. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
