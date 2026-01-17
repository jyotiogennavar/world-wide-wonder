'use client';

import { useState } from 'react';

export default function VintagePostcardCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    // Simulate submission
    setStatus('success');
    setMessage('Successfully subscribed! Check your inbox soon.');
    setEmail('');
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section className="relative bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto relative">
        {/* Postcard container */}
        <div 
          className="bg-[#f5ede0] border border-[#c4b5a0] rounded-2xl p-10 relative overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(0, 0, 0, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(139, 115, 85, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 10%, rgba(0, 0, 0, 0.01) 0%, transparent 40%)
            `
          }}
        >
          {/* Vertical divider - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-[#c4b5a0]"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Message */}
            <div className="flex flex-col justify-between pr-0 md:pr-10">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#3a2a1a] leading-tight mb-2">
                  Travel slowly.
                </h2>
                <p className="font-serif text-2xl italic text-[#5a4a3a] mb-6">
                  Save what inspires you.
                </p>
                
                <p className="font-serif text-sm text-[#6a5a4a] leading-relaxed">
                  Bookmark stories, return to guides, and revisit places through words and images.
                </p>
              </div>

              {/* Decorative stamp */}
              <div className="mt-8">
                <div className="w-14 h-[72px] bg-[#d4c4a8] border-2 border-dashed border-[#a89880] flex items-center justify-center rotate-3">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
            </div>

            {/* Right side - Address lines */}
            <div className="pl-0 md:pl-10 flex flex-col">
              {/* Postmark stamp */}
              <div className="flex justify-end mb-4">
                <div className="w-16 h-16">
                  <svg viewBox="0 0 80 80" className="opacity-60">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#8a7a6a" strokeWidth="1.5" strokeDasharray="4,3"/>
                    <circle cx="40" cy="40" r="28" fill="none" stroke="#8a7a6a" strokeWidth="1"/>
                    <text x="40" y="36" textAnchor="middle" fill="#6a5a4a" fontSize="10" fontFamily="serif" fontWeight="bold">TRAVEL</text>
                    <text x="40" y="48" textAnchor="middle" fill="#6a5a4a" fontSize="8" fontFamily="serif">JAN 2026</text>
                  </svg>
                </div>
              </div>

              <div className="space-y-5 flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-xs text-[#7a6a5a] tracking-wide">FROM_</span>
                  <div className="flex-1 border-b border-[#c4b5a0] pb-1">
                    <span className="font-serif text-base text-[#3a2a1a]">Wanderlust HQ</span>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-xs text-[#7a6a5a] tracking-wide">TO_</span>
                  <div className="flex-1 border-b border-[#c4b5a0] pb-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full bg-transparent font-serif text-base text-[#3a2a1a] placeholder:text-[#a09080] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-5 pt-1">
                  <div className="border-b border-[#c4b5a0]"></div>
                  <div className="border-b border-[#c4b5a0]"></div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-[#3a2a1a] hover:bg-[#4a3a2a] text-[#f5ede0] font-serif tracking-[0.2em] px-6 py-3.5 rounded-lg transition-colors duration-300 text-sm"
                >
                  SEND SUBSCRIPTION
                </button>

                {/* Success/Error Messages */}
                {status === 'success' && (
                  <div className="bg-[#d4e8d4] border border-[#5a7a5a] rounded-md px-4 py-2 font-serif text-xs text-[#2a4a2a]">
                    {message}
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="bg-[#e8d4d4] border border-[#8b5555] rounded-md px-4 py-2 font-serif text-xs text-[#5a2a2a]">
                    {message}
                  </div>
                )}

                <p className="font-serif text-xs text-[#8a7a6a] italic text-center">
                  Monthly stories • No spam • Unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
