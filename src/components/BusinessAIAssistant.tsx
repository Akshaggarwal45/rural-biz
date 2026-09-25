import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, X, Send, Loader2, Sparkles, MapPin, Calculator, DollarSign } from 'lucide-react';
import { INDIAN_STATES } from '../data/schemes';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface BusinessAIAssistantProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const BusinessAIAssistant: React.FC<BusinessAIAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [locationType, setLocationType] = useState<'Rural' | 'Semi-Urban' | 'Urban'>('Rural');
  const [selectedState, setSelectedState] = useState<string>('up');
  const [capital, setCapital] = useState<string>('100000');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Namaste! I am your RuralBiz All-in-One Business & Financial Advisor.\n\nAsk me about:\n• 💡 High-profit rural business ideas (Dairy, Poultry, Food Processing, Retail, etc.)\n• 🧮 Monthly EMI & loan calculations for any amount\n• 💰 Government subsidies (PMEGP 35% rural subsidy, Mudra, PM Vishwakarma)\n• ⚙️ Setup costs, machinery, and daily profits.",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      setIsOpen(true);
      handleSend(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || query).trim();
    if (!messageText || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setQuery('');
    setLoading(true);

    try {
      const stateObj = INDIAN_STATES.find((s) => s.id === selectedState);
      const stateName = stateObj ? stateObj.name : 'All India';

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: messageText,
          location: locationType,
          state: stateName,
          capital: Number(capital) || 100000,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const aiResponseText = data.response || 'I am ready to help you plan your business and calculate your loan EMIs!';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Here is your business & EMI advice:\n\n" +
              "• **Top Village Businesses**: Dairy (3-5 cows, ₹30k/mo profit), Poultry Broiler (₹25k/mo), Mini Spices/Atta Mill (₹35k/mo), Rural Kirana Store (₹30k/mo).\n" +
              "• **EMI Calculation Example**: For a ₹2,00,000 bank loan at 9.5% for 5 years, your monthly EMI is approx **₹4,199/month**.\n" +
              "• **Subsidy Support**: Apply for PMEGP via jansamarth.in to get up to 35% margin money subsidy in rural areas!",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    `Best business with ₹1 Lakh capital in village?`,
    `EMI for ₹3,00,000 loan at 9.5% for 5 years`,
    `How much profit can I make from 4 cows dairy?`,
    `How to get PMEGP 35% rural subsidy?`,
    `Setup cost for mini spice grinding machine`,
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Business & EMI AI Advisor"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 group"
      >
        <span className="text-xl">💼</span>
        <span className="text-sm font-semibold hidden sm:inline">Business & EMI Advisor</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                💼
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">Business & EMI Advisor</h3>
                <p className="text-[11px] text-blue-200">Ideas, Startup Costs & Loan EMI Calculator</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close advisor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Context Filter Bar */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 text-xs overflow-x-auto">
            <div className="flex items-center gap-1 shrink-0 text-slate-600 font-semibold text-[11px]">
              <MapPin className="w-3 h-3 text-blue-600" />
              <span>State:</span>
            </div>
            
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 rounded px-1.5 py-0.5 text-xs font-medium focus:outline-none"
            >
              {INDIAN_STATES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={locationType}
              onChange={(e) => setLocationType(e.target.value as any)}
              className="bg-white border border-slate-300 text-slate-800 rounded px-1.5 py-0.5 text-xs font-medium focus:outline-none"
            >
              <option value="Rural">Rural Village</option>
              <option value="Semi-Urban">Semi-Urban</option>
              <option value="Urban">Urban City</option>
            </select>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-xs text-slate-600 font-medium">
                  Calculating business financials & recommendations...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="p-2 border-t border-slate-200 bg-white overflow-x-auto flex gap-1.5 scrollbar-none shrink-0">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border border-slate-200/80 shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about business ideas, setup costs, or EMI..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
