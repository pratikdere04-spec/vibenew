import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, X, Sparkles, Crown, ShieldAlert, Clock } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

export const DirectMessageModal: React.FC = () => {
  const { 
    directMessageUser, 
    closeDirectMessage, 
    sendQuickMessage, 
    userProfile, 
    isEffectiveVIP,
    remainingDailyChats,
    openPaymentGateway,
    setShowDailyLimitModal 
  } = useApp();

  const [text, setText] = useState('');

  if (!directMessageUser) return null;

  const isLimitReached = !isEffectiveVIP && remainingDailyChats <= 0;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimitReached) {
      setShowDailyLimitModal(true);
      return;
    }
    if (!text.trim()) return;
    const sent = sendQuickMessage(directMessageUser, text);
    if (sent) {
      setText('');
    }
  };

  const quickIcebreakers = [
    `Loved your vibe! What's your go-to weekend spot?`,
    `Saw that you're into ${directMessageUser.likes[0] || 'good music'}! What have you been listening to lately?`,
    `Hey ${directMessageUser.name}! Are you free for coffee this week?`
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-stone-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={directMessageUser.photos[0]}
                alt={directMessageUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 leading-tight">
                Message {directMessageUser.name}
              </h3>
              <p className="text-[11px] text-stone-500">
                {directMessageUser.age} yrs · {directMessageUser.location}
              </p>
            </div>
          </div>

          <button
            onClick={closeDirectMessage}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Daily 20 Limit Indicator */}
        <div className={`p-2.5 rounded-2xl border text-xs flex items-center justify-between ${
          isEffectiveVIP 
            ? 'bg-amber-50 border-amber-200 text-amber-950 font-semibold' 
            : isLimitReached
            ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold'
            : 'bg-stone-50 border-stone-200 text-stone-700'
        }`}>
          {isEffectiveVIP ? (
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              <span>VIP Member · Unlimited Chat Invites</span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Daily Limit (20 New Chats):</span>
              </span>
              <span className={`text-[11px] font-bold tabular-nums px-2 py-0.5 rounded-md ${
                isLimitReached 
                  ? 'bg-rose-200 text-rose-900' 
                  : 'bg-stone-200 text-stone-800'
              }`}>
                {remainingDailyChats} of 20 remaining
              </span>
            </div>
          )}
        </div>

        {/* Limit or Subscription Check */}
        {!isEffectiveVIP ? (
          <div className="p-5 bg-gradient-to-b from-stone-50 to-rose-50/40 border border-stone-200 rounded-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-stone-950 flex items-center justify-center mx-auto shadow-md">
              <Crown className="w-7 h-7 fill-stone-950" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold font-editorial text-stone-900">
                VIP Subscription Required
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                Only subscribed VIP members can read and send messages. Choose a membership plan to unlock chatting with {directMessageUser.name}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              {PRICING_PLANS.slice(0, 2).map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    closeDirectMessage();
                    openPaymentGateway(plan);
                  }}
                  className="p-3 bg-white border border-stone-200 hover:border-amber-400 rounded-xl transition-all cursor-pointer shadow-2xs hover:shadow-xs group"
                >
                  <span className="block text-[10px] text-stone-500 font-medium">
                    {plan.duration}
                  </span>
                  <span className="text-sm font-bold text-stone-900 group-hover:text-rose-900">
                    {plan.formattedPrice}
                  </span>
                  <span className="block text-[10px] text-amber-700 font-semibold mt-0.5">
                    {plan.perMonth}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                closeDirectMessage();
                openPaymentGateway(PRICING_PLANS[0]);
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 fill-stone-950" />
              <span>Subscribe to VIP (Plans from ₹499)</span>
            </button>
          </div>
        ) : isLimitReached ? (
          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2 text-center">
            <ShieldAlert className="w-6 h-6 text-rose-700 mx-auto" />
            <p className="text-xs font-bold text-rose-950">
              You have used all 20 daily new chat invites for today!
            </p>
            <p className="text-[11px] text-stone-600">
              Quota resets at midnight. Upgrade to VIP to bypass limits and message unlimited people instantly.
            </p>
            <button
              onClick={() => {
                closeDirectMessage();
                openPaymentGateway(PRICING_PLANS[0]);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-xs font-bold rounded-xl shadow-xs cursor-pointer hover:brightness-105"
            >
              Get Unlimited with VIP (from ₹499)
            </button>
          </div>
        ) : (
          <>
            {/* Icebreaker Suggestions */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Quick Vibe Starters:</span>
              </span>
              <div className="space-y-1">
                {quickIcebreakers.map((starter, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setText(starter)}
                    className="w-full text-left p-2 rounded-xl bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-300 text-[11px] text-stone-700 hover:text-rose-950 transition-colors cursor-pointer"
                  >
                    "{starter}"
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSend} className="space-y-3 pt-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                placeholder={`Say something interesting to ${directMessageUser.name}...`}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-800"
                required
                autoFocus
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeDirectMessage}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="px-5 py-2.5 bg-rose-900 hover:bg-rose-950 disabled:bg-stone-200 text-white disabled:text-stone-400 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
