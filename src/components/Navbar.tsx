import React, { useState } from 'react';
import { Menu, X, ArrowRight, Download } from 'lucide-react';
import { SUPPORTED_LANGUAGES, setLanguage } from '../utils/translator';

interface NavbarProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedLanguage,
  onLanguageChange,
  onGetStarted,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectLanguage = (code: string) => {
    onLanguageChange(code);
    setLanguage(code);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#2563EB"/>
                <path d="M8 20L14 12L18 17L24 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="9" r="2.5" fill="#F97316"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Rural<span className="text-blue-600">Biz</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('wizard')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Start Business
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Right Actions: Language Selector & Get Started Button */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <select
              value={selectedLanguage}
              onChange={(e) => handleSelectLanguage(e.target.value)}
              aria-label="Choose language"
              className="text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200/80 border border-slate-300 text-slate-800 py-1.5 px-2.5 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            {/* Get Started Button */}
            <button
              onClick={onGetStarted}
              className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-sm shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button
            onClick={() => scrollToSection('features')}
            className="w-full text-left p-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('wizard')}
            className="w-full text-left p-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Start Business
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="w-full text-left p-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="w-full text-left p-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-left p-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            FAQ
          </button>
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <a
              href="/download/ruralbiz"
              download="RuralBiz.html"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm text-center shadow flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download RuralBiz.html File</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStarted();
              }}
              className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm text-center shadow"
            >
              Start a Business (Free)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
