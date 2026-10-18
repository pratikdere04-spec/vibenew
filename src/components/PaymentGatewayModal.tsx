import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRICING_PLANS } from '../data/mockData';
import { PricingPlan } from '../types';
import { 
  Crown, 
  Check, 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

export const PaymentGatewayModal: React.FC = () => {
  const { 
    showPaymentGatewayModal, 
    closePaymentGateway, 
    selectedPlan, 
    completeSubscriptionPayment,
    userProfile,
    isEffectiveVIP,
    showToast 
  } = useApp();

  const [activePlan, setActivePlan] = useState<PricingPlan>(selectedPlan || PRICING_PLANS[1]);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Form states
  const [upiId, setUpiId] = useState('devika@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('429');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  if (!showPaymentGatewayModal) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const generatedTxn = 'TXN_VIBE_' + Math.floor(100000 + Math.random() * 900000);
      setTxnId(generatedTxn);

      setTimeout(() => {
        completeSubscriptionPayment(activePlan.id);
        setIsSuccess(false);
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full my-6 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-stone-950 flex items-center justify-center shadow-xs">
              <Crown className="w-4 h-4 fill-stone-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-editorial text-stone-900 leading-tight">
                Vibe VIP Membership
              </h2>
              <p className="text-xs text-stone-500">
                Encrypted & Secure Payment Gateway
              </p>
            </div>
          </div>
          <button
            onClick={closePaymentGateway}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* If user already has an active VIP subscription */}
        {isEffectiveVIP ? (
          <div className="p-6 sm:p-8 space-y-6 text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-stone-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
              <Crown className="w-8 h-8 fill-stone-950" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold inline-block border border-amber-300">
                VIP Membership Active
              </span>
              <h3 className="text-2xl font-bold font-editorial text-stone-900">
                You Have Full VIP Privileges
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Your account has full VIP access unlocked. Enjoy unlimited messaging, visitor insights, and priority matchmaking without limits.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-2.5 max-w-sm mx-auto">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Active VIP Benefits:
              </span>
              <ul className="text-xs text-stone-700 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited message reading and sending without limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>See all profiles who visited your profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant matching with anyone who likes you</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Identity Shield & priority support</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={closePaymentGateway}
              className="w-full max-w-sm mx-auto py-3.5 bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer block"
            >
              Continue Exploring
            </button>
          </div>
        ) : isSuccess ? (
          <div className="p-10 text-center space-y-4 my-auto animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold font-editorial text-stone-900">
              Payment Successful!
            </h3>
            <p className="text-xs text-stone-600">
              Transaction ID: <span className="font-mono font-bold text-stone-900">{txnId}</span>
            </p>
            <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-4 py-2 rounded-xl inline-block">
              {activePlan.duration} Vibe VIP Membership Activated!
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* 1. Plan Selector (Exact pricing requested) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
                Select Your Membership Duration
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRICING_PLANS.map((plan) => {
                  const isSelected = activePlan.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setActivePlan(plan)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-rose-50/80 border-rose-900 ring-2 ring-rose-900 shadow-sm'
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-tight">
                          Popular
                        </span>
                      )}

                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-stone-800 block">
                          {plan.duration}
                        </span>
                        <span className="text-base font-extrabold font-editorial text-rose-950 block">
                          {plan.formattedPrice}
                        </span>
                      </div>

                      <span className="text-[10px] text-stone-500 font-medium pt-1">
                        {plan.savings || plan.perMonth}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Payment Gateway Method Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
                Choose Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* Method Detail Subforms */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {[
                        { id: 'gpay', name: 'Google Pay' },
                        { id: 'phonepe', name: 'PhonePe' },
                        { id: 'paytm', name: 'Paytm' }
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id as any)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors ${
                            selectedUpiApp === app.id
                              ? 'bg-white border-rose-800 text-rose-900 shadow-2xs'
                              : 'bg-stone-100/60 border-stone-200 text-stone-600'
                          }`}
                        >
                          {app.name}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-stone-600">Enter UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-800"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-stone-600">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-stone-600">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-stone-600">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-600">Select Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl"
                    >
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary & SSL Assurance */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-stone-500">Total Payable Amount</span>
                <p className="text-xl font-bold font-editorial text-stone-900">
                  {activePlan.formattedPrice}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Secure</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-rose-800 to-rose-700 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Secure Payment...</span>
                </>
              ) : (
                <>
                  <span>Pay {activePlan.formattedPrice} & Activate VIP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
