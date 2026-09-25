import React from 'react';
import { X, ExternalLink, CheckCircle2, FileText, AlertCircle, Building2, Percent, IndianRupee, ShieldCheck } from 'lucide-react';
import { GovernmentScheme } from '../data/schemes';

interface SchemeDetailModalProps {
  scheme: GovernmentScheme | null;
  onClose: () => void;
  selectedStateName: string;
  selectedLocationType: string;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  selectedStateName,
  selectedLocationType,
}) => {
  if (!scheme) return null;

  const isRural = selectedLocationType.toLowerCase().includes('rural');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
              {scheme.level === 'central' ? 'Central Government' : `${selectedStateName} State Scheme`}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified for {selectedLocationType}
            </span>
            {scheme.isLatest2025 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-100 border border-blue-400/30">
                Active 2025-2026
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pr-8">
            {scheme.name}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            Nodal Agency: <span className="text-white font-medium">{scheme.nodalAgency}</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase">
                <IndianRupee className="w-4 h-4 text-blue-600" />
                <span>Max Funding</span>
              </div>
              <p className="text-lg font-bold text-slate-900 mt-1">
                ₹{(scheme.maxLoan).toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-slate-500">Loan & Project Ceiling</span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase">
                <Percent className="w-4 h-4 text-emerald-600" />
                <span>Subsidy / Benefit ({selectedLocationType} Focus)</span>
              </div>
              <p className="text-sm font-bold text-emerald-950 mt-1">
                {isRural && scheme.subsidyRate.ruralSpecial
                  ? scheme.subsidyRate.ruralSpecial
                  : scheme.subsidyRate.flat || scheme.subsidyRate.ruralGeneral || 'Varies by applicant category'}
              </p>
              {scheme.subsidyRate.ruralGeneral && (
                <span className="text-[11px] text-emerald-700 block mt-0.5">
                  General Rural: {scheme.subsidyRate.ruralGeneral} | Urban: {scheme.subsidyRate.urbanSpecial || '15-25%'}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {scheme.description}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Benefits & Financial Assistance
            </h3>
            <ul className="space-y-2">
              {scheme.keyBenefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Eligibility Conditions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Eligibility Criteria for {selectedStateName}
            </h3>
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 space-y-2">
              {scheme.conditions.map((c, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="font-semibold text-amber-800 text-xs shrink-0">{idx + 1}.</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Required */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" /> Mandatory Documents Required
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Apply online at verified government portal</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <a
              href={scheme.officialPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 sm:w-auto px-5 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Go to {scheme.portalName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
