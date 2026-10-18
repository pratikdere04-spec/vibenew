import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Cookie, 
  AlertTriangle, 
  Check, 
  HeartHandshake
} from 'lucide-react';
import { TERMS_AND_CONDITIONS_TEXT, PRIVACY_POLICY_TEXT } from '../data/legalPolicies';

export type PolicyTab = 'terms' | 'privacy' | 'cookies' | 'safety';

export const PolicyModal: React.FC = () => {
  const { policyModalType, closePolicyModal } = useApp();
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyTab>('terms');

  useEffect(() => {
    if (policyModalType) {
      setActivePolicyTab(policyModalType);
    }
  }, [policyModalType]);

  if (!policyModalType) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-900 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-editorial text-stone-900">
                Trust, Legal & Safety Center
              </h2>
              <p className="text-xs text-stone-500">
                Official terms, privacy framework & 18+ user agreement
              </p>
            </div>
          </div>

          <button
            onClick={closePolicyModal}
            className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Policy Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-stone-200 bg-stone-100/60 p-1.5 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActivePolicyTab('terms')}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activePolicyTab === 'terms'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-rose-800" />
            <span>Terms of Use</span>
          </button>

          <button
            onClick={() => setActivePolicyTab('privacy')}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activePolicyTab === 'privacy'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-rose-800" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActivePolicyTab('cookies')}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activePolicyTab === 'cookies'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <Cookie className="w-3.5 h-3.5 text-rose-800" />
            <span>Cookies Policy</span>
          </button>

          <button
            onClick={() => setActivePolicyTab('safety')}
            className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activePolicyTab === 'safety'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Safety Tips (18+)</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
          
          {/* 1. TERMS & CONDITIONS */}
          {activePolicyTab === 'terms' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block">
                  Legally Binding User Agreement
                </span>
                <h3 className="text-xl font-bold font-editorial text-stone-900">
                  {TERMS_AND_CONDITIONS_TEXT.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Effective Date: {TERMS_AND_CONDITIONS_TEXT.effectiveDate} · Applicable to all Visitors & Members
                </p>
              </div>

              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200/80 text-xs text-stone-800 leading-relaxed whitespace-pre-line">
                {TERMS_AND_CONDITIONS_TEXT.preamble}
              </div>

              {/* All 19 Sections */}
              <div className="space-y-5">
                {TERMS_AND_CONDITIONS_TEXT.sections.map((sec) => (
                  <div key={sec.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
                    <h4 className="font-bold text-stone-900 text-sm">
                      {sec.title}
                    </h4>
                    <div className="text-xs text-stone-700 whitespace-pre-line leading-relaxed font-light">
                      {sec.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. PRIVACY POLICY */}
          {activePolicyTab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block">
                  Data Governance & Protection
                </span>
                <h3 className="text-xl font-bold font-editorial text-stone-900">
                  {PRIVACY_POLICY_TEXT.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Effective Date: {PRIVACY_POLICY_TEXT.effectiveDate} · Dedicated to User Confidentiality & Safety
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-800 leading-relaxed whitespace-pre-line">
                {PRIVACY_POLICY_TEXT.preamble}
              </div>

              <div className="space-y-5">
                {PRIVACY_POLICY_TEXT.sections.map((sec, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
                    <h4 className="font-bold text-stone-900 text-sm">
                      {sec.title}
                    </h4>
                    <div className="text-xs text-stone-700 whitespace-pre-line leading-relaxed font-light">
                      {sec.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. COOKIES POLICY */}
          {activePolicyTab === 'cookies' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block">
                  Browser Storage & Tracking
                </span>
                <h3 className="text-xl font-bold font-editorial text-stone-900">
                  Cookies & Local Storage Policy
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Understanding how local storage and session tokens are used on Vibe Check
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">1. What Are Cookies and Local Storage?</h4>
                <p>
                  Cookies and modern browser LocalStorage are small data packages saved on your computer or mobile device that help web applications remember your preferences, keep you securely signed in, and provide a seamless app experience.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">2. Storage We Use</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="font-bold text-stone-900 block">Essential Authentication Tokens</span>
                    <p className="text-stone-600 mt-0.5">
                      Maintains your active session, phone verification token, and user ID so you don't need to re-verify OTP on every refresh.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="font-bold text-stone-900 block">Personal Preferences & Discovery State</span>
                    <p className="text-stone-600 mt-0.5">
                      Stores liked profile IDs, your daily chat initiation quotas (20 new chats/day), and VIP subscription state.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">3. Managing or Clearing Cookies</h4>
                <p>
                  You can clear your cookies or local storage at any time through your browser's Privacy or History settings, or by clicking "Logout" in your Profile tab.
                </p>
              </section>
            </div>
          )}

          {/* 4. SAFETY TIPS */}
          {activePolicyTab === 'safety' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="border-b border-stone-200 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                  Community Protection (18+ Only)
                </span>
                <h3 className="text-xl font-bold font-editorial text-stone-900">
                  Online & Offline Safety Tips
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Practical guidelines to ensure your matchmaking journey is safe, respectful, and joyful
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Never Send Money or Financial Aid</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Never wire funds, share bank details, UPI PINs, or crypto wallet addresses with anyone you meet online, regardless of the emergency or excuse presented.
                  </p>
                </div>

                <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-rose-950">
                    <HeartHandshake className="w-4 h-4 text-rose-800" />
                    <span>Meet in Well-Lit Public Places</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    When meeting in person for the first time, choose crowded cafes, restaurants, or public galleries during daylight hours. Arrange your own transportation.
                  </p>
                </div>

                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-sky-950">
                    <ShieldCheck className="w-4 h-4 text-sky-700" />
                    <span>Verify Identity Before Meeting</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Look for the Verified badge on candidate profiles. We encourage a quick in-app video or voice call before planning your first offline coffee date.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Inform a Trusted Friend or Family</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Always share your meeting location, time, and partner's details with a close friend or family member before stepping out. Keep your phone charged.
                  </p>
                </div>

              </div>

              <div className="p-4 bg-stone-900 text-white rounded-2xl space-y-2">
                <span className="text-xs font-bold text-rose-400 block">
                  Report Suspicious Behavior Instantly
                </span>
                <p className="text-xs text-stone-300">
                  If someone makes you uncomfortable, solicits money, or acts inappropriately, block them and click "Report Profile" immediately. Our Trust & Safety team investigates all reports within 2 hours.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-stone-500 text-[11px]">
            Official Support: <span className="font-semibold text-rose-900">support@Vibe Check.in</span> · Must be 18+ to use Vibe Check
          </span>
          <button
            onClick={closePolicyModal}
            className="w-full sm:w-auto px-6 py-2.5 bg-rose-900 hover:bg-rose-950 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
