import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Building, 
  ExternalLink, 
  HelpCircle, 
  CheckCircle, 
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { SCHEMES_DATABASE, INDIAN_STATES, GovernmentScheme } from '../data/schemes';
import { SchemeDetailModal } from './SchemeDetailModal';
import { InteractiveMapPicker } from './InteractiveMapPicker';

interface SchemeExplorerProps {
  initialState?: string;
  initialLocationType?: 'rural' | 'semi' | 'urban';
  onAskAI?: (prompt: string) => void;
}

export const SchemeExplorer: React.FC<SchemeExplorerProps> = ({
  initialState = 'all',
  initialLocationType = 'rural',
  onAskAI,
}) => {
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [locationType, setLocationType] = useState<'rural' | 'semi' | 'urban'>(initialLocationType);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalScheme, setActiveModalScheme] = useState<GovernmentScheme | null>(null);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>('');

  // Sector Categories
  const sectors = [
    { id: 'all', label: 'All Sectors' },
    { id: 'dairy', label: 'Dairy & Cattle' },
    { id: 'poultry', label: 'Poultry & Livestock' },
    { id: 'food', label: 'Food Processing & Spices' },
    { id: 'tailoring', label: 'Tailoring & PM Vishwakarma' },
    { id: 'grocery', label: 'Retail & Grocery Store' },
    { id: 'agriculture', label: 'Agri Equipment & Farming' },
    { id: 'services', label: 'Services & Transport' },
  ];

  // Filter schemes dynamically based on Location (State + Rural/Urban) & Sector
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATABASE.filter((scheme) => {
      // 1. State filter
      const matchesState =
        selectedState === 'all' ||
        scheme.applicableStates.includes('all') ||
        scheme.applicableStates.includes(selectedState);
      if (!matchesState) return false;

      // 2. Location type (rural / semi / urban)
      const matchesLocation = scheme.locationTypes.includes(locationType);
      if (!matchesLocation) return false;

      // 3. Sector
      if (selectedSector !== 'all') {
        const matchesSector =
          scheme.targetSectors.includes('all') ||
          scheme.targetSectors.includes(selectedSector) ||
          scheme.targetSectors.includes('general');
        if (!matchesSector) return false;
      }

      // 4. Search text
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inName = scheme.name.toLowerCase().includes(q) || scheme.shortName.toLowerCase().includes(q);
        const inDesc = scheme.description.toLowerCase().includes(q);
        const inNodal = scheme.nodalAgency.toLowerCase().includes(q);
        const inSector = scheme.targetSectors.some((s) => s.toLowerCase().includes(q));
        if (!inName && !inDesc && !inNodal && !inSector) return false;
      }

      return true;
    });
  }, [selectedState, locationType, selectedSector, searchQuery]);

  const currentStateName = INDIAN_STATES.find((s) => s.id === selectedState)?.name || 'All India';

  return (
    <section id="government-schemes" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-3">
            <Landmark className="w-3.5 h-3.5" />
            <span>Dedicated Government Schemes Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified Government Schemes & Subsidies by Location
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Discover central and state government loans, interest subsidies, and capital grants accurately filtered for your village, town, or state in 2025-2026.
          </p>
        </div>

        {/* Location & Filter Control Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* 1. State Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Your State / Region</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowMap(!showMap)}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>{showMap ? 'Hide Map' : '🗺️ Open Map'}</span>
                </button>
              </div>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  const stName = INDIAN_STATES.find(s => s.id === e.target.value)?.name || '';
                  setLocationName(stName);
                }}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Area Type (Rural vs Urban) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Location Area Type</span>
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLocationType('rural')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    locationType === 'rural'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Rural Village
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('semi')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    locationType === 'semi'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semi-Urban
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('urban')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    locationType === 'urban'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Urban City
                </button>
              </div>
            </div>

            {/* 3. Search Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>Search by Keyword / Scheme</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. PMEGP, Mudra, Subsidy, Dairy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl pl-9 pr-3.5 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* Sector Filter Chips */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Sector:
            </span>
            {sectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedSector === sec.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Optional Collapsible Map for Scheme Explorer */}
          {showMap && (
            <div className="pt-4 border-t border-slate-200">
              <InteractiveMapPicker
                selectedState={selectedState}
                locationName={locationName}
                onLocationChange={(loc) => setLocationName(loc)}
                areaType={locationType}
                onAreaTypeChange={(area) => setLocationType(area)}
              />
            </div>
          )}
        </div>

        {/* Location Verification Status Box */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  Location Verified: {currentStateName} • {locationType === 'rural' ? 'Rural Village / Block' : locationType === 'semi' ? 'Semi-Urban Town' : 'Urban Area'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                  2025-2026 Guidelines Verified
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {locationType === 'rural'
                  ? 'Rural locations are eligible for up to 35% margin money subsidy under PMEGP & CMEGP (vs 15-25% in urban areas).'
                  : 'Displaying schemes currently active for urban and semi-urban entrepreneurs with applicable subsidy rates.'}
              </p>
            </div>
          </div>

          {onAskAI && (
            <button
              onClick={() => onAskAI(`What are the latest government subsidies and loan schemes available in ${currentStateName} for ${locationType} areas in 2025-2026?`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Verify with AI Assistant</span>
            </button>
          )}
        </div>

        {/* Results Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No schemes found matching this filter</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try switching your state to "All India (Central Schemes)" or selecting "All Sectors" to view universal loan and subsidy programs.
            </p>
            <button
              onClick={() => {
                setSelectedState('all');
                setSelectedSector('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => {
              const isRural = locationType === 'rural';
              const subsidyText = isRural && scheme.subsidyRate.ruralSpecial
                ? scheme.subsidyRate.ruralSpecial
                : scheme.subsidyRate.flat || scheme.subsidyRate.ruralGeneral || 'Variable subsidy';

              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-blue-400"
                >
                  {/* Card Top */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {scheme.level === 'central' ? 'Central Scheme' : `${currentStateName} State`}
                      </span>
                      <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1" /> Active
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {scheme.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {scheme.description}
                    </p>

                    {/* Subsidy Highlight */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 font-medium">Max Funding</span>
                        <span className="font-bold text-slate-900">₹{(scheme.maxLoan).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-emerald-700 font-semibold block text-[11px] truncate">
                          ★ {subsidyText}
                        </span>
                      </div>
                    </div>

                    {/* Key features preview */}
                    <div className="mt-3 space-y-1">
                      {scheme.keyBenefits.slice(0, 2).map((kb, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
                          <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                          <span className="truncate">{kb}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom / Action Buttons */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalScheme(scheme)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-blue-50"
                    >
                      <span>Full Eligibility</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={scheme.officialPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Helpful Info Guide */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">How Are Rural vs Urban Subsidies Calculated?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">1. Higher Rural Subsidy Percentage</strong>
              <p>Under PMEGP and State CMEGPs, projects situated in Village / Gram Panchayat areas receive 35% margin money subsidy for special categories (women, SC/ST, OBC, youth) versus only 25% in urban areas.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">2. Zero Collateral (CGTMSE Cover)</strong>
              <p>Loans under Mudra (up to ₹20 Lakh) and PM Vishwakarma (up to ₹3 Lakh at 5%) are 100% collateral-free, guaranteed by the government’s Credit Guarantee Fund.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">3. Direct Online Application</strong>
              <p>You do not need middlemen or bribes. You can apply directly on national portals like JanSamarth.in, KVIC PMEGP, or your State District Industries Centre (DIC).</p>
            </div>
          </div>
        </div>

      </div>

      {/* Scheme Detail Modal */}
      {activeModalScheme && (
        <SchemeDetailModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
          selectedStateName={currentStateName}
          selectedLocationType={locationType === 'rural' ? 'Rural Village' : locationType === 'semi' ? 'Semi-Urban Town' : 'Urban City'}
        />
      )}
    </section>
  );
};
