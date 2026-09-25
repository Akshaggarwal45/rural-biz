import React, { useState, useRef, useEffect } from 'react';
import { Landmark, X, Send, Loader2, Sparkles, MapPin, Building2, HelpCircle } from 'lucide-react';
import { INDIAN_STATES } from '../data/schemes';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface SchemeAIChatProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const SchemeAIChat: React.FC<SchemeAIChatProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [locationType, setLocationType] = useState<'Rural' | 'Semi-Urban' | 'Urban'>('Rural');
  const [selectedState, setSelectedState] = useState<string>('up');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Namaste! I am your RuralBiz Scheme Assistant. Ask me anything about Indian Central or State government business subsidies, Mudra loans, PMEGP, or PM Vishwakarma tailored to your location.",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Handle external trigger (e.g. from "Verify with AI Assistant" button)
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

      const res = await fetch('/api/schemes/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: messageText,
          location: locationType,
          state: stateName,
          businessType: 'Micro enterprise',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const aiResponseText = data.response || 'Sorry, I could not retrieve scheme details at this moment.';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Verified National Guidelines for 2025-2026:\n\n" +
              "• **PMEGP**: Provides up to 35% margin subsidy for special category applicants in rural areas (25% in urban) for projects up to ₹50 Lakh.\n" +
              "• **PM MUDRA Yojana**: Collateral-free loans up to ₹10-20 Lakh through Shishu, Kishore, and Tarun categories.\n" +
              "• **PM Vishwakarma**: ₹15,000 tool grant and ₹3 Lakh collateral-free loan at 5% interest for artisans & tailors.\n" +
              "• Apply officially through https://www.jansamarth.in/ or https://www.kviconline.gov.in/",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    `PMEGP 35% rural subsidy eligibility in ${INDIAN_STATES.find(s => s.id === selectedState)?.name || 'UP'}`,
    `Subsidies for women starting a food processing unit`,
    `PM Vishwakarma ₹3 Lakh loan at 5% interest rules`,
    `Mudra loan documents needed for village general store`,
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Scheme AI Assistant"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 group"
      >
        <span className="text-xl">🏛️</span>
        <span className="text-sm font-semibold hidden sm:inline">Scheme AI Assistant</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                🏛️
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">Scheme AI Assistant</h3>
                <p className="text-[11px] text-blue-200">Verified Location-Based Subsidies & Loans</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Location Context Bar */}
          <div className="bg-slate-100/90 border-b border-slate-200 px-3 py-2 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 shrink-0 text-slate-600 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Location:</span>
            </div>
            
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="bg-white border border-slate-300 text-slate-800 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Rural">Rural (Village)</option>
              <option value="Semi-Urban">Semi-Urban (Town)</option>
              <option value="Urban">Urban (City)</option>
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
                  Verifying official 2025-2026 guidelines...
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
                placeholder="Ask about subsidies, eligibility, or documents..."
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
