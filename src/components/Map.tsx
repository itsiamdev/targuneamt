import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Landmark, Church, Building2, MapPin, X, Layers, Map as MapIcon } from 'lucide-react';

// Fix for default markers - use unknown first
const iconDefaultProto = L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown };
if (iconDefaultProto._getIconUrl) {
  delete iconDefaultProto._getIconUrl;
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    "><svg transform="rotate(45deg)" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

type AttractionType = 'fortress' | 'monastery' | 'museum' | 'center';

interface Attraction {
  name: string;
  position: [number, number];
  type: AttractionType;
  description: string;
  image: string;
}

const attractions: Attraction[] = [
  {
    name: 'Cetatea Neamțului',
    position: [47.0833, 26.3333],
    type: 'fortress',
    description: 'Cetatea medievală din secolul al XIV-lea, unul dintre cele mai importante monumente fortificate din Moldova.',
    image: 'https://images.unsplash.com/photo-1565027447449-d5f6c43d8f5a?w=400',
  },
  {
    name: 'Casa Ion Creangă',
    position: [47.1167, 26.3667],
    type: 'museum',
    description: 'Casa memorială a marelui scriitor Ion Creangă, situată în Humulești.',
    image: 'https://images.unsplash.com/photo-1580845527765-39d5429da27d?w=400',
  },
  {
    name: 'Mănăstirea Neamț',
    position: [47.0833, 26.4],
    type: 'monastery',
    description: 'Cea mai veche mănăstire din Moldova, fondată în secolul al XIV-lea de către Alexandru cel Bun.',
    image: 'https://images.unsplash.com/photo-1548625361-e88c60eb355c?w=400',
  },
  {
    name: 'Mănăstirea Agapia',
    position: [47.0667, 26.4167],
    type: 'monastery',
    description: 'Mănăstire de maici renumită pentru picturile lui Negoiță și frumusețea naturii înconjurătoare.',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400',
  },
  {
    name: 'Mănăstirea Văratec',
    position: [47.1, 26.45],
    type: 'monastery',
    description: 'Cea mai mare mănăstire de maici din România, cu o istorie de peste 500 de ani.',
    image: 'https://images.unsplash.com/photo-1574513432664-5f77e2fce703?w=400',
  },
  {
    name: 'Târgu Neamț',
    position: [47.2, 26.3667],
    type: 'center',
    description: 'Centrul administrativ al zonei, cu piețe, magazine și atmosfera autentică a Moldovei.',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
  },
];

const typeColors: Record<AttractionType, string> = {
  fortress: '#dc2626',
  monastery: '#7c3aed',
  museum: '#0891b2',
  center: '#16a34a',
};

const typeLabels: Record<AttractionType, { ro: string; icon: React.ReactNode }> = {
  fortress: { ro: 'Cetate', icon: <Landmark className="w-4 h-4" /> },
  monastery: { ro: 'Mănăstire', icon: <Church className="w-4 h-4" /> },
  museum: { ro: 'Muzeu', icon: <Building2 className="w-4 h-4" /> },
  center: { ro: 'Centru', icon: <MapPin className="w-4 h-4" /> },
};

const Map = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [activeFilter, setActiveFilter] = useState<AttractionType | 'all'>('all');
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([47.12, 26.38], 11);

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Tile layer URLs
    const streetLayerUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    const satelliteLayerUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    // Add tile layer with custom styling
    const tileLayer = L.tileLayer(streetLayerUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    // Store tile layer reference for switching
    (map as L.Map & { _tileLayer?: L.TileLayer })._tileLayer = tileLayer;

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map type when satellite/street toggle changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const mapWithTile = map as L.Map & { _tileLayer?: L.TileLayer };
    
    // Remove existing tile layer
    if (mapWithTile._tileLayer) {
      map.removeLayer(mapWithTile._tileLayer);
    }

    // Add new tile layer based on map type
    if (mapType === 'satellite') {
      mapWithTile._tileLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri',
        }
      ).addTo(map);
    } else {
      mapWithTile._tileLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(map);
    }
  }, [mapType]);

  // Update markers when filter changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter attractions
    const filteredAttractions = activeFilter === 'all'
      ? attractions
      : attractions.filter(a => a.type === activeFilter);

    // Add markers
    filteredAttractions.forEach((attraction) => {
      const marker = L.marker(attraction.position, {
        icon: createCustomIcon(typeColors[attraction.type]),
      });

      const popupContent = `
        <div style="
          min-width: 200px;
          font-family: system-ui, -apple-system, sans-serif;
        ">
          <img 
            src="${attraction.image}" 
            alt="${attraction.name}"
            style="
              width: 100%;
              height: 120px;
              object-fit: cover;
              border-radius: 8px 8px 0 0;
              margin-bottom: 8px;
            "
          />
          <h3 style="
            margin: 0 0 4px 0;
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
          ">${attraction.name}</h3>
          <p style="
            margin: 0;
            font-size: 13px;
            color: #6b7280;
            line-height: 1.4;
          ">${attraction.description.substring(0, 80)}...</p>
          <button 
            onclick="window.dispatchEvent(new CustomEvent('selectAttraction', {detail: '${attraction.name}'}))"
            style="
              margin-top: 8px;
              padding: 6px 12px;
              background: #059669;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 12px;
              width: 100%;
            "
          >
            Vezi detalii
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-popup',
      });

      marker.on('click', () => {
        setSelectedAttraction(attraction);
      });

      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);
    });
  }, [activeFilter]);

  // Listen for custom events from popups
  useEffect(() => {
    const handleSelectAttraction = (e: CustomEvent) => {
      const attraction = attractions.find(a => a.name === e.detail);
      if (attraction) setSelectedAttraction(attraction);
    };

    window.addEventListener('selectAttraction', handleSelectAttraction as EventListener);
    return () => window.removeEventListener('selectAttraction', handleSelectAttraction as EventListener);
  }, []);

  const handleFilterClick = (type: AttractionType | 'all') => {
    setActiveFilter(type);
    
    // Pan to a central location for the filtered type
    if (mapInstanceRef.current) {
      const filtered = type === 'all' ? attractions : attractions.filter(a => a.type === type);
      if (filtered.length > 0) {
        const bounds = L.latLngBounds(filtered.map(a => a.position));
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  };

  return (
    <section id="map" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-nature">
            Hartă Interactivă
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explorează locațiile principale din zona Târgu Neamț
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <button
            onClick={() => handleFilterClick('all')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            }`}
          >
            Toate
          </button>
          {(Object.keys(typeLabels) as AttractionType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleFilterClick(type)}
              className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeFilter === type
                  ? 'text-white shadow-lg'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }}`}
              style={activeFilter === type ? { backgroundColor: typeColors[type] } : {}}
            >
              {typeLabels[type].icon}
              {typeLabels[type].ro}
            </button>
          ))}
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden shadow-heavy h-[500px] md:h-[600px]"
        >
          <div ref={mapRef} className="w-full h-full" />

          {/* Map Controls Overlay */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
            <p className="text-xs font-medium text-muted-foreground mb-2">Legenda</p>
            <div className="space-y-2">
              {(Object.keys(typeLabels) as AttractionType[]).map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: typeColors[type] }}
                  />
                  <span className="text-sm">{typeLabels[type].ro}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Type Toggle */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[1000] flex gap-1">
            <button
              onClick={() => setMapType('street')}
              className={`p-2 rounded transition-all ${
                mapType === 'street'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
              title="Hartă străzi"
            >
              <MapIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`p-2 rounded transition-all ${
                mapType === 'satellite'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
              title="Hartă satelit"
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>

          {/* Attribution */}
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground z-[1000]">
            Click pe markere pentru detalii
          </div>
        </motion.div>

        {/* Selected Attraction Detail Panel */}
        {selectedAttraction && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 w-80 md:w-96 bg-background rounded-2xl shadow-2xl z-[2000] overflow-hidden"
          >
            <div className="relative">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedAttraction(null)}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div
                className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: typeColors[selectedAttraction.type] }}
              >
                {typeLabels[selectedAttraction.type].ro}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-3">{selectedAttraction.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedAttraction.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  {selectedAttraction.position[0].toFixed(4)}, {selectedAttraction.position[1].toFixed(4)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Custom CSS for Leaflet popups */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </section>
  );
};

export default Map;
