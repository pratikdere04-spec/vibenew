import React from 'react';
import { useApp } from '../context/AppContext';
import { PRICING_PLANS } from '../data/mockData';
import { 
  ShieldAlert, 
  Crown, 
  Clock, 
  X, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

export const DailyLimitModal: React.FC = () => {
  const { 
    showDailyLimitModal, 
    setShowDailyLimitModal, 
    openPaymentGateway,
    dailyInitiatedCount 
  } = useApp();

  if (!showDailyLimitModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-stone-200">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-rose-800 uppercase tracking-wider block">
                Daily Limit Reached
              </span>
              <h3 className="text-lg font-bold font-editorial text-stone-900 leading-tight">
                20 / 20 New Chats Initiated
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowDailyLimitModal(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Explanatory Content */}
        <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
          <p>
            To keep connections meaningful and protect the Vibe Check community from spam, users can initiate up to <strong className="text-stone-900">20 new conversations per day</strong>.
          </p>
          
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
              <span>Today's New Chat Quota</span>
              <span className="text-rose-900 font-bold tabular-nums">20 / 20 Used</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
              <div className="h-full bg-rose-600 w-full" />
            </div>

            <p className="text-[11px] text-stone-500 flex items-center gap-1 pt-1">
              <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Resets automatically tomorrow at 00:00 midnight IST.</span>
            </p>
          </div>

          <p className="text-[11px] text-stone-500">
            * Note: You can still reply and chat with any of your existing matches without any limit!
          </p>
        </div>

        {/* VIP Upgrade CTA */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              setShowDailyLimitModal(false);
              openPaymentGateway(PRICING_PLANS[1]);
            }}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Crown className="w-4 h-4 fill-stone-950" />
            <span>Unlock Unlimited Chats with VIP (₹499/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowDailyLimitModal(false)}
            className="w-full py-2.5 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors"
          >
            I'll wait until tomorrow
          </button>
        </div>

      </div>
    </div>
  );
};
