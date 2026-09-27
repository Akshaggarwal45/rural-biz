import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  LocateFixed, 
  Search, 
  Loader2, 
  Info
} from 'lucide-react';
import { STATE_GEO_DATA, StateGeoInfo } from '../data/geoData';

interface InteractiveMapPickerProps {
  selectedState: string;
  locationName: string;
  onLocationChange: (locName: string, lat?: number, lng?: number) => void;
  areaType?: 'rural' | 'semi' | 'urban';
  onAreaTypeChange?: (area: 'rural' | 'semi' | 'urban') => void;
}

export const InteractiveMapPicker: React.FC<InteractiveMapPickerProps> = ({
  selectedState,
  locationName,
  onLocationChange,
  areaType = 'rural',
  onAreaTypeChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [inputVal, setInputVal] = useState<string>(locationName || '');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [addressDetails, setAddressDetails] = useState<string>('');

  // Sync external locationName only when it actually differs
  useEffect(() => {
    if (locationName !== undefined && locationName !== inputVal) {
      setInputVal(locationName);
    }
  }, [selectedState]);

  // Load Leaflet dynamically via CDN
  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      // 1. Add CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // 2. Add Script
      if (!(window as any).L) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      if (!isMounted || !mapContainerRef.current) return;

      const L = (window as any).L;
      if (!L) return;

      const stateInfo: StateGeoInfo = STATE_GEO_DATA[selectedState] || STATE_GEO_DATA.up;
      const initialLat = stateInfo.center[0];
      const initialLng = stateInfo.center[1];
      const initialZoom = stateInfo.zoom;

      // Prevent duplicate map instances
      if (!leafletMapRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: initialZoom,
          zoomControl: true,
          scrollWheelZoom: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `<div style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            background: #2563eb;
            color: #ffffff;
            border: 3px solid #ffffff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          ">
            <div style="transform: rotate(45deg); font-weight: bold; font-size: 14px;">📍</div>
          </div>`,
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -36]
        });

        const marker = L.marker([initialLat, initialLng], {
          icon: customIcon,
          draggable: true,
        }).addTo(map);

        markerRef.current = marker;
        leafletMapRef.current = map;
        setGeoCoords({ lat: initialLat, lng: initialLng });

        // Fix grey tiles on mount
        setTimeout(() => {
          if (map) map.invalidateSize();
        }, 200);

        // Map Click
        map.on('click', async (e: any) => {
          const { lat, lng } = e.latlng;
          marker.setLatLng([lat, lng]);
          setGeoCoords({ lat, lng });
          await reverseGeocode(lat, lng);
        });

        // Pin Drag
        marker.on('dragend', async () => {
          const { lat, lng } = marker.getLatLng();
          setGeoCoords({ lat, lng });
          await reverseGeocode(lat, lng);
        });
      }
    };

    loadLeaflet();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // When selectedState changes -> Pan and Zoom smoothly to that state
  useEffect(() => {
    if (!leafletMapRef.current) return;
    const stateInfo: StateGeoInfo = STATE_GEO_DATA[selectedState] || STATE_GEO_DATA.up;
    const [lat, lng] = stateInfo.center;
    const zoom = stateInfo.zoom;

    const map = leafletMapRef.current;
    map.flyTo([lat, lng], zoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      setGeoCoords({ lat, lng });
      setAddressDetails(`${stateInfo.name} (${stateInfo.capital} Region)`);
      setInputVal(stateInfo.name);
      onLocationChange(stateInfo.name, lat, lng);
    }
  }, [selectedState]);

  // Reverse Geocoding
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.address) {
        const addr = data.address;
        const placeName = 
          addr.village || 
          addr.town || 
          addr.suburb || 
          addr.city_district || 
          addr.city || 
          addr.county || 
          addr.state_district || 
          '';
        const district = addr.state_district || addr.county || '';
        const state = addr.state || '';

        const fullLabel = [placeName, district, state].filter(Boolean).join(', ');
        const displayLabel = fullLabel || data.display_name?.split(',').slice(0, 3).join(',') || `Lat: ${lat.toFixed(3)}, Lng: ${lng.toFixed(3)}`;

        setInputVal(displayLabel);
        setAddressDetails(data.display_name || '');
        onLocationChange(displayLabel, lat, lng);

        if (onAreaTypeChange) {
          if (addr.village || addr.hamlet || addr.isolated_dwelling) {
            onAreaTypeChange('rural');
          } else if (addr.city || addr.municipality) {
            onAreaTypeChange('urban');
          } else if (addr.town || addr.suburb) {
            onAreaTypeChange('semi');
          }
        }
      }
    } catch (e) {
      console.warn('Reverse geocode error:', e);
    }
  };

  // Search Location
  const handleSearchLocation = async (queryText?: string) => {
    const q = (queryText !== undefined ? queryText : inputVal).trim();
    if (!q) return;

    setIsSearching(true);
    try {
      const stateInfo = STATE_GEO_DATA[selectedState];
      const refinedQuery = stateInfo && !q.toLowerCase().includes(stateInfo.name.toLowerCase()) 
        ? `${q}, ${stateInfo.name}, India` 
        : `${q}, India`;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(refinedQuery)}&countrycodes=in&limit=1`
      );
      const results = await res.json();

      if (results && results.length > 0) {
        const item = results[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);

        if (leafletMapRef.current && markerRef.current) {
          leafletMapRef.current.flyTo([lat, lng], 13, { duration: 1.2 });
          markerRef.current.setLatLng([lat, lng]);
          setGeoCoords({ lat, lng });
          setAddressDetails(item.display_name);

          setInputVal(q);
          onLocationChange(q, lat, lng);
        }
      }
    } catch (err) {
      console.error('Search location error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // GPS "Locate Me"
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsLocating(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (leafletMapRef.current && markerRef.current) {
          leafletMapRef.current.flyTo([lat, lng], 14, { duration: 1.5 });
          markerRef.current.setLatLng([lat, lng]);
          setGeoCoords({ lat, lng });
          await reverseGeocode(lat, lng);
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err.message);
        alert('Could not access your location. Please check browser permissions or type your town/village name.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const stateInfo = STATE_GEO_DATA[selectedState] || STATE_GEO_DATA.up;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Interactive Real-Time Location Map</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                {stateInfo.name}
              </span>
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Type your village/district, tap the map, or click <strong>"Locate Me"</strong>. Real-time updates automatically sync your subsidies.
          </p>
        </div>

        {/* Quick GPS "Locate Me" Button */}
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-blue-700 border border-blue-200 shadow-xs transition-all cursor-pointer hover:shadow active:scale-95 disabled:opacity-60"
        >
          {isLocating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
          ) : (
            <LocateFixed className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span>{isLocating ? 'Detecting GPS...' : 'Locate Me (GPS)'}</span>
        </button>
      </div>

      {/* Real-time Location Search Input Box */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Enter Your Village, Block, or District Name
        </label>
        <div className="relative flex items-center shadow-xs rounded-xl overflow-hidden border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <div className="pl-3.5 text-slate-400">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <input
            type="text"
            value={inputVal}
            placeholder={`e.g. ${stateInfo.popularDistricts[0] || 'Varanasi'}, Village Rampur...`}
            onChange={(e) => setInputVal(e.target.value)}
            onBlur={() => onLocationChange(inputVal, geoCoords?.lat, geoCoords?.lng)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchLocation();
              }
            }}
            className="w-full px-3 py-2.5 text-sm text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => handleSearchLocation()}
            disabled={isSearching}
            className="h-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
          >
            {isSearching ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Update Map</span>
          </button>
        </div>

        {/* Quick District Chips */}
        {stateInfo.popularDistricts && stateInfo.popularDistricts.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] font-semibold text-slate-500">Quick select in {stateInfo.name}:</span>
            {stateInfo.popularDistricts.slice(0, 5).map((dist) => (
              <button
                key={dist}
                type="button"
                onClick={() => {
                  setInputVal(dist);
                  handleSearchLocation(dist);
                }}
                className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
              >
                {dist}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Viewport Container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-200">
        <div 
          ref={mapContainerRef} 
          className="w-full h-64 sm:h-72 z-0" 
          style={{ minHeight: '260px' }}
        />

        {/* Real-time Status Overlay */}
        <div className="absolute bottom-2 left-2 right-2 bg-slate-900/85 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs flex items-center justify-between z-[400] shadow-md border border-white/10">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="truncate text-slate-200 font-medium">
              {addressDetails || inputVal || `Centered on ${stateInfo.name}`}
            </span>
          </div>

          {geoCoords && (
            <span className="text-[10px] text-slate-400 shrink-0 ml-2 font-mono">
              {geoCoords.lat.toFixed(2)}°, {geoCoords.lng.toFixed(2)}°
            </span>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Tip: </span> 
          You can drag the blue pin 📍 to your exact farmland, shop location, or gram panchayat. Subsidies under <strong>PMEGP</strong> and <strong>Mudra</strong> are calculated according to this exact point.
        </div>
      </div>
    </div>
  );
};
