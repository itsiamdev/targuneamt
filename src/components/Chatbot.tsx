import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface QuickReply {
  label: string;
  query: string;
}

const quickReplies: QuickReply[] = [
  { label: "Atracții turistice", query: "Ce atracții turistice sunt în Târgu Neamț?" },
  { label: "Program vizitare", query: "Care este programul de vizitare?" },
  { label: "Prețuri bilete", query: "Cât costă biletele de intrare?" },
  { label: "Cum ajung?", query: "Cum pot ajunge la Târgu Neamț?" },
  { label: "Evenimente", query: "Ce evenimente sunt în Târgu Neamț?" },
  { label: "Contact", query: "Cum pot contacta centrul de informare?" },
];

const botResponses: Record<string, string> = {
  atractii: `🏰 **Principalele atracții turistice din Târgu Neamț:**

• **Cetatea Neamțului** - Cetatea medievală construită în secolul XIV, situată pe dealul Cetății. Un simbol al istoriei Moldovei!

• **Casa Memorială Ion Creangă** din Humulești - Aici s-a născut marele povestitor român. Puteți vizita casa părintească și muzeul.

• **Mănăstirea Neamț** - Una dintre cele mai vechi și importante mănăstiri din Moldova, datând din secolul XIV.

• **Mănăstirea Văratec** - Mănăstire de maici cu o arhitectură impresionantă și un aer de liniște.

• **Mănăstirea Agapia** - Cunoscută pentru picturile murale și pentru că aici a trăit Maica Veneranda.

• **Muzeul de Istorie și Etnografie** - Colecții bogate care prezintă istoria și tradițiile zonei.

• **Rezervația naturală Codrii de Aramă** - O zonă naturală deosebită, perfectă pentru drumeții.

Recomandăm să alocați cel puțin 2-3 zile pentru a vizita toate aceste obiective! 🌿`,

  program: `🕐 **Program de vizitare pentru principalele atracții:**

• **Cetatea Neamțului**
  - Luni-Duminică: 09:00 - 18:00 (vară)
  - Luni-Duminică: 09:00 - 16:00 (iarnă)

• **Casa Memorială Ion Creangă**
  - Marți-Duminică: 09:00 - 17:00
  - Luni: Închis

• **Mănăstirea Neamț**
  - Zilnic: 06:00 - 20:00
  - Slujbe: 06:00, 09:00, 17:00

• **Mănăstirea Văratec**
  - Zilnic: 07:00 - 20:00

• **Mănăstirea Agapia**
  - Zilnic: 07:00 - 19:00

• **Muzeul de Istorie și Etnografie**
  - Marți-Duminică: 10:00 - 18:00
  - Luni: Închis

⚠️ Programul poate varia în funcție de sezon. Vă recomandăm să verificați înainte de vizită!`,

  preturi: `🎟️ **Prețuri bilete de intrare:**

• **Cetatea Neamțului**
  - Adulți: 10 Lei
  - Elevi/Studenți: 2 Lei
  - Pensionari: 5 Lei
  - Copii sub 7 ani: Gratuit

• **Casa Memorială Ion Creangă**
  - Adulți: 8 Lei
  - Elevi/Studenți: 2 Lei
  - Pensionari: 4 Lei
  - Copii sub 7 ani: Gratuit

• **Muzeul de Istorie și Etnografie**
  - Adulți: 6 Lei
  - Elevi/Studenți: 1,50 Lei
  - Pensionari: 3 Lei

• **Mănăstirile** - Intrare gratuită 🙏

🎁 **Bilet combinat** (Cetate + Casa Creangă + Muzeu): 20 Lei / adult

💡 *Gratuit pentru persoanele cu dizabilități și însoțitorii acestora.*`,

  locatie: `📍 **Cum să ajungeți la Târgu Neamț:**

**Cu mașina:**
• Din **Iași**: DN28 -> DN15B, aprox. 90 km (1h 30min)
• Din **Piatra-Neamț**: DN15C, aprox. 40 km (50 min)
• Din **București**: DN2 -> DN15, aprox. 350 km (5h)
• Din **Cluj-Napoca**: DN15 prin Toplița, aprox. 320 km (5h 30min)

**Cu autobuzul:**
• Curse regulate din Piatra-Neamț, Iași, Roman și București
• Autogara Târgu Neamț: Str. Ștefan cel Mare

**Cu trenul:**
• Cea mai apropiată gară este în **Roman** (30 km)
• De la Roman, se poate continua cu autobuzul sau taxiul

🅿️ **Parcare:** Există parcări gratuite în centrul orașului și lângă principalele atracții.`,

  evenimente: `🎉 **Evenimente importante în Târgu Neamț:**

• **Ziua Cetății Neamțului** (august) - Festival medieval cu reconstituiri istorice, meșteșugari și muzică populară

• **Târgul de la Neamț** - Eveniment tradițional cu produse locale, meșteșuguri și gastronomie regională

• **Festivalul „Ion Creangă"** - Dedicat marelui povestitor, cu spectacole teatrale și activități culturale

• **Sărbătoarea Mănăstirii Neamț** - Hramul mănăstirii, un eveniment religios important

• **Festivalul de Datini și Obiceiuri de Iarnă** - Colinde, tradiții și obiceiuri de Crăciun și Anul Nou

• **Concursul de Fotografie „Peisaje din Neamț"** - Deschis tuturor iubitorilor de natură și fotografie

📅 Pentru informații actualizate despre evenimente, vizitați site-ul primăriei sau contactați centrul de informare turistică!`,

  contact: `📞 **Informații de contact:**

**Centrul de Informare Turistică Târgu Neamț**
• 📍 Str. Ștefan cel Mare nr. 12, Târgu Neamț
• 📞 0233 260 XXX
• 📧 info@targuneamt.ro
• 🌐 www.targuneamt.ro

**Program:**
• Luni-Vineri: 08:00 - 16:00
• Sâmbătă-Duminică: 09:00 - 14:00

**Social Media:**
• Facebook: @TurismTarguNeamt
• Instagram: @targuneamt_turism

Nu ezitați să ne contactați pentru orice informații suplimentare! Vă așteptăm cu drag! 😊`,
};

function getBotResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (
    lowerQuery.includes("atrac") ||
    lowerQuery.includes("vizita") ||
    lowerQuery.includes("ce pot vedea") ||
    lowerQuery.includes("obiective") ||
    lowerQuery.includes("cetate") ||
    lowerQuery.includes("creangă") ||
    lowerQuery.includes("creanga") ||
    lowerQuery.includes("mănăstire") ||
    lowerQuery.includes("manastire") ||
    lowerQuery.includes("muzeu")
  ) {
    return botResponses.atractii;
  }

  if (
    lowerQuery.includes("program") ||
    lowerQuery.includes("orar") ||
    lowerQuery.includes("ore") ||
    lowerQuery.includes("când") ||
    lowerQuery.includes("cand") ||
    lowerQuery.includes("deschis") ||
    lowerQuery.includes("închis") ||
    lowerQuery.includes("inchis")
  ) {
    return botResponses.program;
  }

  if (
    lowerQuery.includes("preț") ||
    lowerQuery.includes("pret") ||
    lowerQuery.includes("bilet") ||
    lowerQuery.includes("cost") ||
    lowerQuery.includes("cât costă") ||
    lowerQuery.includes("cat costa") ||
    lowerQuery.includes("taxă") ||
    lowerQuery.includes("taxa") ||
    lowerQuery.includes("intrare") ||
    lowerQuery.includes("gratuit")
  ) {
    return botResponses.preturi;
  }

  if (
    lowerQuery.includes("cum ajung") ||
    lowerQuery.includes("direcții") ||
    lowerQuery.includes("directii") ||
    lowerQuery.includes("drum") ||
    lowerQuery.includes("mașină") ||
    lowerQuery.includes("masina") ||
    lowerQuery.includes("autobuz") ||
    lowerQuery.includes("tren") ||
    lowerQuery.includes("parcare") ||
    lowerQuery.includes("locație") ||
    lowerQuery.includes("locatie") ||
    lowerQuery.includes("adresă") ||
    lowerQuery.includes("adresa")
  ) {
    return botResponses.locatie;
  }

  if (
    lowerQuery.includes("eveniment") ||
    lowerQuery.includes("festival") ||
    lowerQuery.includes("târg") ||
    lowerQuery.includes("targ") ||
    lowerQuery.includes("sărbătoare") ||
    lowerQuery.includes("sarbatoare") ||
    lowerQuery.includes("activități") ||
    lowerQuery.includes("activitati")
  ) {
    return botResponses.evenimente;
  }

  if (
    lowerQuery.includes("contact") ||
    lowerQuery.includes("telefon") ||
    lowerQuery.includes("email") ||
    lowerQuery.includes("adresă") ||
    lowerQuery.includes("adresa") ||
    lowerQuery.includes("informații") ||
    lowerQuery.includes("informatii") ||
    lowerQuery.includes("sun") ||
    lowerQuery.includes("apel") ||
    lowerQuery.includes("social")
  ) {
    return botResponses.contact;
  }

  return `Mulțumesc pentru întrebare! 😊

Sunt aici să vă ajut cu informații despre Târgu Neamț. Puteți selecta una dintre opțiunile rapide de mai jos!`;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Bună ziua! 👋 Bine ați venit la centrul de informare turistică Târgu Neamț. Cu ce vă pot ajuta?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: query,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(query);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  const formatMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-140px)] rounded-2xl shadow-2xl overflow-hidden border border-border/50 bg-background flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground text-sm">
                    Asistent Virtual
                  </h3>
                  <p className="text-xs text-primary-foreground/80">
                    Târgu Neamț Turism
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Închide chat"
              >
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card text-card-foreground border border-border/50 rounded-bl-md shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {formatMessageText(message.text)}
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-primary/50"
                      />
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-primary/50"
                      />
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-primary/50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-3 border-t border-border/50 bg-background shrink-0">
              <p className="text-xs text-muted-foreground mb-2">Întrebări frecvente:</p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.query}
                    onClick={() => handleSend(reply.query)}
                    className="shrink-0 px-3 py-1.5 text-xs rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Închide chat" : "Deschide chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default Chatbot;
