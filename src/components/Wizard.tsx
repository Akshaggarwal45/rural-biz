import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  IndianRupee, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  RotateCcw,
  Landmark,
  FileText
} from 'lucide-react';
import { BUSINESS_CATALOG, BusinessIdea } from '../data/businesses';
import { SCHEMES_DATABASE, INDIAN_STATES, GovernmentScheme } from '../data/schemes';
import { SchemeDetailModal } from './SchemeDetailModal';

export const Wizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  // Step 1 State
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');
  const [userState, setUserState] = useState<string>('up');
  const [userArea, setUserArea] = useState<'rural' | 'semi' | 'urban'>('rural');
  const [userCapital, setUserCapital] = useState<number>(100000);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['land']);

  // Step 2 State
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessIdea>(BUSINESS_CATALOG.dairy);

  // Step 3 State
  const [userContribution, setUserContribution] = useState<number>(75000);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(9.5);

  // Modal State
  const [modalScheme, setModalScheme] = useState<GovernmentScheme | null>(null);

  // Toggle skills
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Get matching recommendations
  const getRecommendations = () => {
    const list = Object.values(BUSINESS_CATALOG);
    const scored = list.map((biz) => {
      let score = 0;
      // Capital match
      if (userCapital >= biz.minCapital && userCapital <= biz.maxCapital * 1.8) score += 3;
      else if (userCapital >= biz.minCapital) score += 1;

      // State match
      if (biz.bestForStates.includes('all') || biz.bestForStates.includes(userState)) score += 2;

      // Skills match
      const matchingSkills = biz.skillsRequired.filter((s) => selectedSkills.includes(s));
      score += matchingSkills.length * 2;

      return { biz, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.biz);
  };

  // Select business in Step 2
  const handleSelectBusiness = (biz: BusinessIdea) => {
    setSelectedBusiness(biz);
    // suggest 25-30% contribution
    const suggested = Math.round(biz.setupCost * 0.25);
    setUserContribution(suggested);
  };

  // Loan & EMI Calculations
  const setupCost = selectedBusiness.setupCost;
  const loanRequired = Math.max(0, setupCost - userContribution);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  let emi = 0;
  let totalInterest = 0;
  if (loanRequired > 0 && monthlyRate > 0) {
    emi = (loanRequired * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);
    totalInterest = emi * totalMonths - loanRequired;
  }

  const monthlyProfit = selectedBusiness.monthlyRevenue - selectedBusiness.monthlyCost;
  const clearanceMonths = monthlyProfit > 0 && loanRequired > 0 ? Math.ceil(loanRequired / monthlyProfit) : 0;
  const clearanceYears = (clearanceMonths / 12).toFixed(1);

  // Matched Government Schemes for Step 4
  const matchedSchemes = SCHEMES_DATABASE.filter((scheme) => {
    // 1. Matches State or Central
    const stateMatch =
      scheme.applicableStates.includes('all') || scheme.applicableStates.includes(userState);
    if (!stateMatch) return false;

    // 2. Matches Location Type (Rural/Urban)
    if (!scheme.locationTypes.includes(userArea)) return false;

    // 3. Matches sector
    const sectorMatch =
      scheme.targetSectors.includes('all') ||
      scheme.targetSectors.includes('general') ||
      scheme.targetSectors.includes(selectedBusiness.sectorKey);

    return sectorMatch;
  });

  const selectedStateName = INDIAN_STATES.find((s) => s.id === userState)?.name || 'Your State';
  const areaLabel = userArea === 'rural' ? 'Rural Village' : userArea === 'semi' ? 'Semi-Urban Town' : 'Urban City';

  const handleNext = () => {
    if (currentStep === 1) {
      if (!userName.trim()) {
        alert('Please enter your name to continue.');
        return;
      }
    }
    if (currentStep === 3) {
      if (userContribution < 0) {
        alert('Please enter a valid personal contribution.');
        return;
      }
      if (userContribution > setupCost) {
        alert('Your contribution cannot exceed the total setup cost.');
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedBusiness(BUSINESS_CATALOG.dairy);
    setUserContribution(75000);
  };

  return (
    <section id="wizard" className="py-12 bg-slate-100/60 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Business & Scheme Matcher</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Rural Business Setup & Government Scheme Planner
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            4 simple steps to calculate startup costs, loan EMI, and verified location-based government subsidies.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          
          {/* Progress Header */}
          <div className="bg-slate-900 text-white p-5 sm:p-6">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              {[
                { step: 1, label: 'Profile & Location' },
                { step: 2, label: 'Recommendations' },
                { step: 3, label: 'Financial Plan' },
                { step: 4, label: 'Schemes & EMI' },
              ].map((s, idx) => (
                <React.Fragment key={s.step}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        currentStep === s.step
                          ? 'bg-blue-600 text-white ring-4 ring-blue-500/30'
                          : currentStep > s.step
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
                    </div>
                    <span className="text-[11px] font-medium text-slate-300 mt-1.5 hidden sm:block">
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-all ${
                        currentStep > idx + 1 ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            
            {/* STEP 1: USER PROFILE & LOCATION */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Step 1: Tell Us About Your Location & Resources</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Subsidies vary significantly based on your State and whether you are located in a Rural Village or Urban area.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Age
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 28"
                      value={userAge}
                      onChange={(e) => setUserAge(e.target.value)}
                      min={18}
                      max={75}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>State (For State-Specific Subsidies) <span className="text-red-500">*</span></span>
                    </label>
                    <select
                      value={userState}
                      onChange={(e) => setUserState(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {INDIAN_STATES.filter((s) => s.id !== 'all').map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Area Type (Affects Subsidy %) <span className="text-red-500">*</span></span>
                    </label>
                    <select
                      value={userArea}
                      onChange={(e) => setUserArea(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="rural">Rural Village / Gram Panchayat (Up to 35% subsidy)</option>
                      <option value="semi">Semi-Urban / Block Level Town</option>
                      <option value="urban">Urban City Area (15-25% subsidy)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                    <span>Your Investment Capacity / Savings (₹)</span>
                  </label>
                  <select
                    value={userCapital}
                    onChange={(e) => setUserCapital(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value={50000}>Up to ₹50,000</option>
                    <option value={100000}>₹50,000 - ₹1,00,000</option>
                    <option value={250000}>₹1,00,000 - ₹2,50,000</option>
                    <option value={500000}>₹2,50,000 - ₹5,00,000</option>
                    <option value={1000000}>Above ₹5,00,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Skills & Resources You Already Have
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'land', label: 'Farmland / Land' },
                      { id: 'shop', label: 'Commercial Shop' },
                      { id: 'animals', label: 'Cattle Experience' },
                      { id: 'cooking', label: 'Cooking / Spices' },
                      { id: 'tailoring', label: 'Sewing / Tailoring' },
                      { id: 'vehicle', label: 'Vehicle / Tempo' },
                      { id: 'tech', label: 'Basic Computer' },
                      { id: 'sales', label: 'Local Sales / Trade' },
                    ].map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                          selectedSkills.includes(item.id)
                            ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(item.id)}
                          onChange={() => toggleSkill(item.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: BUSINESS RECOMMENDATIONS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Step 2: Recommended Businesses for Your Profile</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Filtered for <strong className="text-slate-700">{selectedStateName}</strong> ({areaLabel}) with ₹{userCapital.toLocaleString('en-IN')} capital capacity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getRecommendations().slice(0, 4).map((biz) => {
                    const isSelected = selectedBusiness.id === biz.id;
                    const profit = biz.monthlyRevenue - biz.monthlyCost;

                    return (
                      <div
                        key={biz.id}
                        onClick={() => handleSelectBusiness(biz)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/50 shadow-md'
                            : 'border-slate-200 hover:border-blue-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                          {biz.tag}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1.5">{biz.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{biz.description}</p>

                        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Setup Cost</span>
                            <span className="font-bold text-slate-800">₹{biz.setupCost.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Monthly Profit</span>
                            <span className="font-bold text-emerald-600">₹{profit.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: FINANCIAL PLANNING & CONTRIBUTION */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Step 3: Loan & Contribution Calculator</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Selected Venture: <strong className="text-slate-800">{selectedBusiness.name}</strong> (Setup: ₹{setupCost.toLocaleString('en-IN')})
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Machinery / Setup:</span>
                    <span className="font-semibold text-slate-800">{selectedBusiness.equipment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Initial Working Capital & Materials:</span>
                    <span className="font-semibold text-slate-800">{selectedBusiness.rawMaterials}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                    <span>Total Required Project Cost:</span>
                    <span>₹{setupCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Own Contribution (₹)
                    </label>
                    <input
                      type="number"
                      value={userContribution}
                      onChange={(e) => setUserContribution(Number(e.target.value))}
                      max={setupCost}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Govt schemes require minimum 5% to 10% own equity.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Loan Tenure (Years)
                    </label>
                    <select
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value={3}>3 Years (36 Months)</option>
                      <option value={5}>5 Years (60 Months - Recommended)</option>
                      <option value={7}>7 Years (84 Months)</option>
                      <option value={10}>10 Years (120 Months)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Interest Rate (% p.a.)
                    </label>
                    <select
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value={5}>5.0% (PM Vishwakarma Concessional)</option>
                      <option value={7}>7.0% (Subsidized Priority / DAY-NRLM)</option>
                      <option value={9.5}>9.5% (Standard MUDRA / Public Bank)</option>
                      <option value={11}>11.0% (Private Commercial Bank)</option>
                    </select>
                  </div>
                </div>

                {/* Instant Calculation Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-blue-50/70 border border-blue-100 rounded-2xl">
                  <div>
                    <span className="text-[11px] font-semibold text-blue-800 uppercase block">Bank Loan</span>
                    <span className="text-base font-bold text-slate-900">₹{loanRequired.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-blue-800 uppercase block">Monthly EMI</span>
                    <span className="text-base font-bold text-blue-700">₹{Math.round(emi).toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-blue-800 uppercase block">Expected Revenue</span>
                    <span className="text-base font-bold text-slate-900">₹{selectedBusiness.monthlyRevenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-blue-800 uppercase block">Net Profit</span>
                    <span className="text-base font-bold text-emerald-600">₹{monthlyProfit.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: RESULTS & LOCATION-VERIFIED SCHEMES */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                {/* Highlight Card */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                          {selectedStateName} • {areaLabel}
                        </span>
                        <span className="text-xs text-blue-100 font-medium">Business: {selectedBusiness.name}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold">₹{Math.round(emi).toLocaleString('en-IN')}</h3>
                      <p className="text-xs text-blue-100 mt-0.5">Estimated Monthly Bank EMI for {loanTenureYears} Years</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 text-right">
                      <span className="text-[11px] text-blue-100 block font-semibold uppercase">Net Monthly Profit</span>
                      <span className="text-lg font-bold text-emerald-300">₹{monthlyProfit.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-blue-200 block">Clearance: ~{clearanceYears} Years</span>
                    </div>
                  </div>
                </div>

                {/* Financial Summary Table */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-xs sm:text-sm">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Financial Breakdown</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Total Project Cost</span>
                      <span className="text-sm font-bold text-slate-900">₹{setupCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Your Contribution</span>
                      <span className="text-sm font-bold text-slate-900">₹{userContribution.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Loan Required</span>
                      <span className="text-sm font-bold text-blue-700">₹{loanRequired.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Total Interest</span>
                      <span className="text-sm font-bold text-slate-900">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* LOCATION-MATCHED GOVERNMENT SCHEMES */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                        <Landmark className="w-4 h-4 text-blue-600" />
                        <span>Government Schemes & Subsidies You Qualify For in {selectedStateName}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Verified for <strong className="text-slate-700">{areaLabel}</strong> in 2025-2026.
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {matchedSchemes.length} Eligible Schemes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {matchedSchemes.map((scheme) => {
                      const isRural = userArea === 'rural';
                      const subsidyLabel = isRural && scheme.subsidyRate.ruralSpecial
                        ? scheme.subsidyRate.ruralSpecial
                        : scheme.subsidyRate.flat || scheme.subsidyRate.ruralGeneral || 'Government Subsidized';

                      return (
                        <div
                          key={scheme.id}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                                {scheme.level === 'central' ? 'Central Scheme' : `${selectedStateName} Scheme`}
                              </span>
                              <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-0.5">
                                <ShieldCheck className="w-3 h-3" /> Location Verified
                              </span>
                            </div>

                            <h5 className="font-bold text-slate-900 text-sm line-clamp-1">{scheme.name}</h5>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{scheme.description}</p>

                            <div className="mt-2.5 p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-[11px] font-semibold text-emerald-800">
                              ✓ {subsidyLabel}
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => setModalScheme(scheme)}
                              className="text-xs font-bold text-blue-600 hover:text-blue-800"
                            >
                              Check Eligibility & Docs →
                            </button>
                            <a
                              href={scheme.officialPortal}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                            >
                              <span>Apply Online</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conditions & Checklist */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
                  <h4 className="font-bold text-amber-900 uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Important Steps to Secure Subsidies in {selectedStateName}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Rural Certificate:</strong> If applying in a Rural Village, get a letter or certificate from your Gram Panchayat / BDO to unlock the maximum 35% PMEGP subsidy.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Udyam Registration:</strong> Create a free MSME Udyam registration at udyamregistration.gov.in using your Aadhaar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Apply via JanSamarth:</strong> Use the government single-window portal jansamarth.in to apply directly to participating banks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

          </div>

          {/* Wizard Footer Navigation Actions */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>{currentStep === 1 ? 'See Recommendations' : currentStep === 2 ? 'Plan Finances' : 'View Schemes & EMI'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New Calculation</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {modalScheme && (
        <SchemeDetailModal
          scheme={modalScheme}
          onClose={() => setModalScheme(null)}
          selectedStateName={selectedStateName}
          selectedLocationType={areaLabel}
        />
      )}
    </section>
  );
};
