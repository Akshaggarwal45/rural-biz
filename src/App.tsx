import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  PieChart, 
  Calculator, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle, 
  MapPin, 
  Building2, 
  Award,
  Users,
  Search,
  DollarSign,
  Landmark
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Wizard } from './components/Wizard';
import { LoanCalculator } from './components/LoanCalculator';
import { BusinessAIAssistant } from './components/BusinessAIAssistant';
import { SchemeExplorer } from './components/SchemeExplorer';
import { SUPPORTED_LANGUAGES, setLanguage } from './utils/translator';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllSchemes, setShowAllSchemes] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('ruralbiz-lang');
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      setSelectedLanguage(saved);
      setLanguage(saved);
    }
  }, []);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    setLanguage(code);
  };

  const handleScrollToWizard = () => {
    const el = document.getElementById('wizard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. TOP NAVBAR */}
      <Navbar
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onGetStarted={handleScrollToWizard}
      />

      <main className="flex-1">
        {/* 2. HERO SECTION - FOCUSED ON RURAL BUSINESS IDEAS */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Headlines & Call to Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>100% Free for Everyone • Built for Rural India</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Find the Right <span className="text-blue-600">Rural Business</span> & Plan Your Finances
                </h1>

                <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                  Answer a few questions about your location, capital, and skills. RuralBiz recommends the best business ideas for you, estimates setup costs, profit margins, and helps you plan loans — completely free.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleScrollToWizard}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Start a Business</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleScrollTo('how-it-works')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 shadow-sm transition-all hover:border-blue-400 cursor-pointer"
                  >
                    <span>How It Works</span>
                  </button>
                </div>

                {/* Stats Counter */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 max-w-md">
                  <div>
                    <strong className="block text-2xl sm:text-3xl font-black text-slate-900">50+</strong>
                    <span className="text-xs text-slate-500 font-medium">Business Ideas</span>
                  </div>
                  <div>
                    <strong className="block text-2xl sm:text-3xl font-black text-blue-600">10K+</strong>
                    <span className="text-xs text-slate-500 font-medium">Users Helped</span>
                  </div>
                  <div>
                    <strong className="block text-2xl sm:text-3xl font-black text-emerald-600">₹0</strong>
                    <span className="text-xs text-slate-500 font-medium">Rupees Cost</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Graphic */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Business Plan Preview</span>
                  </div>

                  {/* Visual preview cards */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      🐄
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Dairy Farming (4 Cows)</h4>
                      <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                        <span>Setup: <strong>₹2,50,000</strong></span>
                        <span className="text-emerald-700 font-semibold">Profit: <strong>₹35,000/mo</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      🌾
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Mini Spice & Atta Flour Mill</h4>
                      <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
                        <span>Setup: <strong>₹1,80,000</strong></span>
                        <span className="text-emerald-700 font-semibold">Profit: <strong>₹32,000/mo</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Estimated Monthly EMI</span>
                      <p className="text-xl font-black text-amber-400">₹3,820 <span className="text-xs font-normal text-slate-300">/mo</span></p>
                    </div>
                    <button
                      onClick={handleScrollToWizard}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Calculate Yours →
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Everything You Need to Start
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                RuralBiz gives you business recommendations, cost breakdowns, and financial planning — all in one free tool.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Smart Recommendations</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Get personalized business ideas based on your location, available capital, and skills — filtered for rural market viability.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Detailed Cost Breakdown</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  See exactly what equipment, licenses, raw materials, and setup will cost — with realistic rural India pricing.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Revenue Estimates</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Understand expected monthly and yearly revenue, profit margins, and payback period before you invest.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Loan EMI Calculator</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Enter your contribution and see exact EMI amounts, tenure options, and total interest — instantly.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Government Schemes</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Discover subsidies, Mudra loans, PMEGP (up to 35% in rural areas), and state-specific schemes you qualify for.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">100% Free Forever</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  No subscriptions, no hidden fees, no premium tiers. RuralBiz is completely free because everyone deserves a fair start.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BUSINESS SETUP WIZARD (STEP-BY-STEP PROCEED ONE BY ONE) */}
        <div id="wizard-section">
          <Wizard />
        </div>

        {/* 5. LOAN EMI CALCULATOR SECTION */}
        <LoanCalculator onExploreSchemes={() => setShowAllSchemes(true)} />

        {/* 6. HOW IT WORKS */}
        <section id="how-it-works" className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How RuralBiz Works
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                From idea to financial plan in four simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Share Details', desc: 'Tell us your state, available capital, and skills you already have.' },
                { step: '2', title: 'Get Recommendations', desc: 'We match you with 3-5 rural business ideas that fit your profile.' },
                { step: '3', title: 'Plan Finances', desc: 'Enter your contribution and see loan EMI, interest, and payback time.' },
                { step: '4', title: 'Apply for Schemes', desc: 'Discover government subsidies and loans you qualify for with full conditions.' },
              ].map((s, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                    {s.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PRICING (100% FREE) */}
        <section id="pricing" className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Simple, Transparent Pricing
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                We believe financial tools for rural entrepreneurs should be accessible to everyone.
              </p>
            </div>

            <div className="max-w-md mx-auto bg-white border-2 border-blue-600 rounded-3xl p-8 text-center relative shadow-xl">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                FREE FOREVER
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Complete Access</h3>
              <p className="text-4xl font-extrabold text-blue-600 my-4">
                ₹0 <span className="text-sm font-normal text-slate-500">/ lifetime</span>
              </p>
              <p className="text-xs text-slate-500 mb-6">
                No hidden charges. No premium tier. Everything included.
              </p>

              <ul className="text-left text-xs sm:text-sm text-slate-700 space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited business recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full cost & revenue breakdowns</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Loan EMI calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Government scheme matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All-in-One Business & EMI Advisor</span>
                </li>
              </ul>

              <button
                onClick={handleScrollToWizard}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Stories from Rural Entrepreneurs
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Thousands have found their path with RuralBiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "I had ₹80,000 saved but no idea what to do. RuralBiz suggested a poultry farm. Now I earn ₹35,000 a month and have 5 workers.", author: "Suresh Kumar", role: "Poultry Farmer, Bihar" },
                { quote: "The loan calculator showed me exactly how much EMI I could afford. I got a Mudra loan and started my dairy business. Life changed.", author: "Lakshmi Patil", role: "Dairy Owner, Maharashtra" },
                { quote: "I never knew about PMEGP subsidy until RuralBiz. It saved me ₹1.5 lakhs on my food processing unit. The tool is completely free!", author: "Arun Reddy", role: "Food Processing, Telangana" },
              ].map((t, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">"{t.quote}"</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                      {t.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <strong className="block text-xs sm:text-sm text-slate-900">{t.author}</strong>
                      <span className="text-[11px] text-slate-500">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section id="faq" className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Everything you need to know about RuralBiz.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Is RuralBiz really free?",
                  a: "Yes, RuralBiz is 100% free. There are no subscriptions, no hidden fees, and no premium tiers. We believe every aspiring entrepreneur deserves access to quality business planning tools regardless of their financial situation."
                },
                {
                  q: "How accurate are the cost estimates?",
                  a: "Our cost estimates are based on real rural India market data, government reports, and feedback from thousands of users. While prices vary by region, our estimates are designed to be realistic starting points that you can adjust based on local rates."
                },
                {
                  q: "Can I apply for loans directly through RuralBiz?",
                  a: "RuralBiz does not process loan applications directly. We show you which schemes you qualify for, the exact documents needed, and guide you to official government portals (JanSamarth.in, KVIC PMEGP) so you never deal with middlemen."
                },
                {
                  q: "What government schemes does RuralBiz cover?",
                  a: "We cover Pradhan Mantri Mudra Yojana (PMMY), PMEGP (up to 35% rural subsidy), PM Vishwakarma (5% interest), Stand-Up India, DAY-NRLM, National Livestock Mission, and state-specific subsidies across UP, Bihar, Maharashtra, Rajasthan, MP, and more."
                },
                {
                  q: "Do I need any documents to use RuralBiz?",
                  a: "No documents are needed to use the tool. Just answer a few simple questions. We will tell you what documents you need when you decide to apply for a loan or scheme — so you can prepare in advance."
                },
              ].map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPTIONAL SCHEMES DIRECTORY (TOGGLED OR ACCESSIBLE VIA FOOTER) */}
        {showAllSchemes && (
          <div className="border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">National & State Schemes Directory</h3>
              <button
                onClick={() => setShowAllSchemes(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1 rounded bg-slate-100"
              >
                Hide Directory ▲
              </button>
            </div>
            <SchemeExplorer />
          </div>
        )}
      </main>

      {/* 10. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <span>RuralBiz</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Empowering rural entrepreneurs with free business recommendations and financial planning tools. Built for India, built for you.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-3">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleScrollTo('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={handleScrollToWizard} className="hover:text-white transition-colors">Business Wizard</button></li>
                <li><button onClick={() => handleScrollTo('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => handleScrollTo('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleScrollTo('faq')} className="hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => { setShowAllSchemes(true); setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">Government Schemes Directory</button></li>
                <li><a href="https://www.jansamarth.in/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">JanSamarth Portal</a></li>
                <li><a href="https://pmvishwakarma.gov.in/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">PM Vishwakarma Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-3">Assistance</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Need help calculating EMIs or choosing a business? Use our floating All-in-One Advisor at the bottom right anytime.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-center text-slate-500">
            © 2026 RuralBiz. Free for everyone, forever.
          </div>
        </div>
      </footer>

      {/* 11. ALL-IN-ONE BUSINESS & EMI AI ADVISOR */}
      <BusinessAIAssistant
        initialPrompt={aiAssistantPrompt}
        onClearInitialPrompt={() => setAiAssistantPrompt(null)}
      />

    </div>
  );
}
