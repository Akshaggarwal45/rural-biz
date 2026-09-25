import React, { useState } from 'react';
import { Calculator, IndianRupee, Percent, Calendar, Sparkles } from 'lucide-react';

export const LoanCalculator: React.FC<{ onExploreSchemes: () => void }> = ({ onExploreSchemes }) => {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (loanAmount > 0 && monthlyRate > 0) {
    emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);
    totalPayment = emi * totalMonths;
    totalInterest = totalPayment - loanAmount;
  }

  return (
    <section id="calculator" className="py-14 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Financial Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Rural Business Loan & Subsidy EMI Calculator
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Simulate your monthly installment with government-subsidized rates and plan your enterprise cash flow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                  <span>Required Loan Amount</span>
                </label>
                <span className="text-sm font-bold text-blue-700">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={5000000}
                step={10000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹20,000 (Shishu)</span>
                <span>₹10,00,000 (Tarun)</span>
                <span>₹50,00,000 (PMEGP)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-blue-600" />
                  <span>Annual Interest Rate (% p.a.)</span>
                </label>
                <span className="text-sm font-bold text-blue-700">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={4}
                max={15}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5% (PM Vishwakarma)</span>
                <span>7% (DAY-NRLM)</span>
                <span>9.5% (MUDRA / Bank)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Repayment Tenure (Years)</span>
                </label>
                <span className="text-sm font-bold text-blue-700">{tenureYears} Years ({totalMonths} Months)</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 Year</span>
                <span>5 Years (Standard)</span>
                <span>10 Years</span>
              </div>
            </div>
          </div>

          {/* Results Display (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 space-y-5">
            <div>
              <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider block">
                Estimated Monthly EMI
              </span>
              <p className="text-3xl font-extrabold mt-1 text-white tracking-tight">
                ₹{Math.round(emi).toLocaleString('en-IN')}
              </p>
              <span className="text-[11px] text-blue-200">Fixed monthly installment for {tenureYears} years</span>
            </div>

            <div className="border-t border-white/20 pt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-blue-200">Principal Amount:</span>
                <span className="font-semibold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Total Interest Payable:</span>
                <span className="font-semibold text-amber-300">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-bold">
                <span className="text-white">Total Bank Repayment:</span>
                <span className="text-white">₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={onExploreSchemes}
              className="w-full py-2.5 bg-white text-blue-800 hover:bg-blue-50 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Find Subsidies to Reduce this Loan</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
