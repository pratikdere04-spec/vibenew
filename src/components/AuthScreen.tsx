import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Smartphone, 
  QrCode, 
  Download, 
  Heart, 
  Radio, 
  MessageSquare, 
  Crown, 
  FileText, 
  Lock, 
  Cookie, 
  AlertTriangle,
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import zoyaPhoto from '../assets/images/vibe_zoya_portrait_1792050775172.jpg';
import kabirPhoto from '../assets/images/vibe_kabir_portrait_1792050777775.jpg';

export const AuthScreen: React.FC = () => {
  const { login, openPolicyModal } = useApp();
  const [method, setMethod] = useState<'phone' | 'email' | 'google'>('phone');
  
  // Phone form
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('4289');

  // Email form
  const [email, setEmail] = useState('devika.patel@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login('phone', `+91 ${phoneNumber}`);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login('email', email);
  };

  const handleGoogleLogin = () => {
    login('google', 'pratikdere04@gmail.com');
  };

  const scrollToLogin = () => {
    const el = document.getElementById('auth-form-card');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col font-sans selection:bg-rose-900 selection:text-white">
      
      {/* 1. Desktop & Mobile Header */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-900/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-editorial text-white block leading-none">
                Vibe Check
              </span>
              <span className="text-[10px] text-rose-300 font-medium tracking-wide">
                Intentional Matchmaking
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-stone-300">
            <a href="#about-app" className="hover:text-white transition-colors">
              About App
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#download" className="hover:text-white transition-colors">
              Download App
            </a>
            <button
              onClick={() => openPolicyModal('safety')}
              className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Safety Tips</span>
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToLogin}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Sign In / Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-stone-800/80 bg-gradient-to-b from-stone-900 via-rose-950/40 to-stone-950">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-10 w-[350px] h-[250px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Copy & App Information */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-semibold backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Next-Gen High-Intent Matchmaking</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-editorial text-white leading-[1.12]">
                Match Your Energy. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300">
                  Vibe Before You Meet.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Step away from endless swiping. Vibe Check connects ambitious, serious singles through deep value-alignment, mutual passions, verified identities, and a mutual 5-year life vision.
              </p>

              {/* Key Trust Checkpoints */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-300 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Phone/Google Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Spam Daily Limits</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Safe & Respectful Matchmaking</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  onClick={scrollToLogin}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Matchmaking Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#download"
                  className="w-full sm:w-auto px-6 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-white border border-stone-700 rounded-2xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-rose-400" />
                  <span>Download Mobile App</span>
                </a>
              </div>

              {/* Live Preview Metric Pill */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-stone-400">
                <div className="flex -space-x-2">
                  <img src={zoyaPhoto} alt="User" className="w-7 h-7 rounded-full border-2 border-stone-900 object-cover" />
                  <img src={kabirPhoto} alt="User" className="w-7 h-7 rounded-full border-2 border-stone-900 object-cover" />
                  <div className="w-7 h-7 rounded-full bg-rose-900 border-2 border-stone-900 text-[10px] font-bold flex items-center justify-center text-white">
                    +4k
                  </div>
                </div>
                <span>Curated active profiles currently online across top cities</span>
              </div>

            </div>

            {/* Right Column: Interactive Login Portal */}
            <div id="auth-form-card" className="lg:col-span-5 scroll-mt-24">
              <div className="bg-stone-900/95 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-bold font-editorial text-white">
                    Sign In to Vibe Check
                  </h3>
                  <p className="text-xs text-stone-400">
                    Authenticate to explore profiles and start connecting
                  </p>
                </div>

                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-stone-950/90 rounded-xl border border-stone-800 text-xs font-semibold">
                  <button
                    onClick={() => { setMethod('phone'); setOtpSent(false); }}
                    className={`py-2 px-1 text-center rounded-lg transition-colors cursor-pointer ${
                      method === 'phone' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Phone
                  </button>
                  <button
                    onClick={() => setMethod('email')}
                    className={`py-2 px-1 text-center rounded-lg transition-colors cursor-pointer ${
                      method === 'email' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setMethod('google')}
                    className={`py-2 px-1 text-center rounded-lg transition-colors cursor-pointer ${
                      method === 'google' ? 'bg-rose-900 text-white shadow-xs' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Google
                  </button>
                </div>

                {/* 1. Phone Auth */}
                {method === 'phone' && (
                  <div className="space-y-4">
                    {!otpSent ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-stone-300">Mobile Phone Number</label>
                          <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm focus-within:border-rose-600">
                            <span className="text-stone-400 font-semibold pr-2 border-r border-stone-800">
                              🇮🇳 +91
                            </span>
                            <input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="98765 43210"
                              className="w-full pl-3 bg-transparent text-white focus:outline-none placeholder-stone-600 font-medium"
                            />
                          </div>
                          <p className="text-[11px] text-stone-500">
                            We will send a one-time SMS verification code.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Send Verification Code</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <label className="font-medium text-stone-300">Enter 4-Digit OTP</label>
                            <button
                              type="button"
                              onClick={() => setOtpSent(false)}
                              className="text-rose-400 hover:underline"
                            >
                              Change (+91 {phoneNumber})
                            </button>
                          </div>
                          <input
                            type="text"
                            maxLength={4}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full text-center text-xl tracking-widest font-mono py-2.5 bg-stone-950 border border-rose-800 rounded-xl text-white focus:outline-none"
                          />
                          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Auto-filled demo OTP code: 4289
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                        >
                          Verify & Continue
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* 2. Email Auth */}
                {method === 'email' && (
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-stone-300">Email Address</label>
                      <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm focus-within:border-rose-600">
                        <Mail className="w-4 h-4 text-stone-500 mr-2 shrink-0" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-transparent text-white focus:outline-none placeholder-stone-600 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-stone-300">Password / Access Code</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      Sign In with Email
                    </button>
                  </form>
                )}

                {/* 3. Google Sign-In */}
                {method === 'google' && (
                  <div className="space-y-4 text-center">
                    <p className="text-xs text-stone-400">
                      Connect seamlessly with your Google Account to automatically verify your identity.
                    </p>

                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full py-3 px-4 bg-white hover:bg-stone-100 text-stone-900 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google / Gmail</span>
                    </button>
                  </div>
                )}

                {/* Instant 1-Click Demo */}
                <div className="pt-2 border-t border-stone-800 text-center">
                  <button
                    onClick={() => login('google', 'pratikdere04@gmail.com')}
                    className="text-xs text-rose-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto font-medium"
                  >
                    <span>⚡ 1-Click Instant Demo Access</span>
                  </button>
                </div>

                {/* Micro-terms under card */}
                <p className="text-[11px] text-stone-500 text-center leading-normal">
                  <span className="text-amber-400 font-semibold block mb-0.5">Strictly 18+ Only Platform</span>
                  By continuing, you confirm you are 18 or older and agree to our{' '}
                  <button onClick={() => openPolicyModal('terms')} className="text-stone-300 underline hover:text-white">
                    Terms
                  </button>
                  ,{' '}
                  <button onClick={() => openPolicyModal('privacy')} className="text-stone-300 underline hover:text-white">
                    Privacy Policy
                  </button>
                  , and{' '}
                  <button onClick={() => openPolicyModal('cookies')} className="text-stone-300 underline hover:text-white">
                    Cookies
                  </button>
                  .
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Information of Application & Features Section */}
      <section id="about-app" className="py-16 sm:py-24 bg-stone-900 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
              Application Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-white">
              Built for Genuine Long-Term Chemistry
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              Unlike casual dating apps, Vibe Check focuses on high intent, deep value-alignment, and privacy protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 bg-stone-950/70 border border-stone-800 rounded-3xl space-y-4 hover:border-rose-900/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-rose-950 text-rose-400 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                1. Smart Vibe Radar
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Filter and explore candidates who match your music genre, weekend plans, values, and lifestyle habits.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-stone-950/70 border border-stone-800 rounded-3xl space-y-4 hover:border-rose-900/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-950 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                2. 100% Genuine Identities
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Every member is authenticated via phone OTP or verified Google accounts. No anonymous catfishes or bots.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-stone-950/70 border border-stone-800 rounded-3xl space-y-4 hover:border-rose-900/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-rose-950 text-rose-400 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                3. High-Intent Messaging
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Subscribed members read and send messages. A daily 20-chat limit stops mass-spamming and keeps chats respectful.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-stone-950/70 border border-stone-800 rounded-3xl space-y-4 hover:border-rose-900/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-950 text-amber-400 flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                4. VIP Privileges
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                See who visited your profile, who liked you, and enjoy unlimited conversation reading & replies from ₹499/mo.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Download App Section */}
      <section id="download" className="py-16 sm:py-24 bg-gradient-to-b from-stone-900 via-rose-950 to-stone-950 border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center lg:justify-start gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>Mobile Experience</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-white leading-tight">
                Download the Vibe Check App for iOS & Android
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                Install our progressive mobile web application or native client. Get instant push notifications when someone likes your vibe or sends you a direct message.
              </p>

              {/* App Store & Google Play Mock Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                
                {/* App Store */}
                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="px-5 py-3 bg-white hover:bg-stone-100 text-stone-950 rounded-2xl flex items-center gap-3 transition-transform active:scale-95 shadow-md cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-stone-950" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.06 1.71-.93 2.73 1.01.08 2.04-.49 2.65-1.23z" />
                  </svg>
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-wider text-stone-600 font-bold">Download on the</span>
                    <span className="block text-xs font-extrabold text-stone-950">Apple App Store</span>
                  </div>
                </button>

                {/* Google Play */}
                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="px-5 py-3 bg-white hover:bg-stone-100 text-stone-950 rounded-2xl flex items-center gap-3 transition-transform active:scale-95 shadow-md cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-stone-950" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.052 2.052 0 0 1-.22-.321V2.135c.07-.113.144-.222.22-.321zm11.233 11.234l2.428 2.428-11.7 6.643 9.272-9.071zm0-2.096L5.57 1.88l11.7 6.643-2.428 2.429zm1.485 1.485l3.882 2.203c1.053.598 1.053 1.574 0 2.172l-3.882 2.203-2.203-2.203 2.203-2.203z" />
                  </svg>
                  <div className="text-left">
                    <span className="block text-[9px] uppercase tracking-wider text-stone-600 font-bold">GET IT ON</span>
                    <span className="block text-xs font-extrabold text-stone-950">Google Play Store</span>
                  </div>
                </button>

              </div>
            </div>

            {/* QR Code Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-stone-950 rounded-3xl border border-stone-800 text-center space-y-3">
              <div className="p-4 bg-white rounded-2xl shadow-lg">
                {/* Clean inline SVG QR code mockup */}
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <rect x="0" y="0" width="100" height="100" fill="white" />
                  {/* Top-left marker */}
                  <rect x="10" y="10" width="25" height="25" fill="#1c1917" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#1c1917" />
                  {/* Top-right marker */}
                  <rect x="65" y="10" width="25" height="25" fill="#1c1917" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#1c1917" />
                  {/* Bottom-left marker */}
                  <rect x="10" y="65" width="25" height="25" fill="#1c1917" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#1c1917" />
                  {/* QR Pattern dots */}
                  <rect x="42" y="12" width="6" height="6" fill="#1c1917" />
                  <rect x="52" y="20" width="6" height="6" fill="#1c1917" />
                  <rect x="42" y="32" width="6" height="6" fill="#1c1917" />
                  <rect x="50" y="42" width="8" height="8" fill="#e11d48" />
                  <rect x="62" y="45" width="6" height="6" fill="#1c1917" />
                  <rect x="40" y="60" width="6" height="6" fill="#1c1917" />
                  <rect x="52" y="70" width="6" height="6" fill="#1c1917" />
                  <rect x="70" y="65" width="6" height="6" fill="#1c1917" />
                  <rect x="80" y="80" width="6" height="6" fill="#1c1917" />
                </svg>
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white block">
                  Scan to Install on Mobile
                </span>
                <span className="text-[11px] text-stone-400 block">
                  Point camera to launch Vibe Check Progressive Web App
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Bottom Policies & Legal Footer for Computer & Mobile */}
      <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold font-editorial text-white">
                  Vibe Check
                </span>
              </div>

              <p className="text-xs text-stone-400 font-light max-w-sm leading-relaxed">
                A serious matrimonial and intentional matchmaking platform. Designed to connect forward-thinking individuals on genuine values, shared lifestyle, and lifelong companionship.
              </p>

              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>256-bit encrypted data · ISO & DPDP compliance</span>
              </div>
            </div>

            {/* Policies Column (Terms, Privacy, Cookies, Safety Tips) */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Policies & Legal
              </span>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => openPolicyModal('terms')}
                    className="hover:text-rose-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-stone-500" />
                    <span>Terms & Conditions</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPolicyModal('privacy')}
                    className="hover:text-rose-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-stone-500" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPolicyModal('cookies')}
                    className="hover:text-rose-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <Cookie className="w-3.5 h-3.5 text-stone-500" />
                    <span>Cookies Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPolicyModal('safety')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Safety Tips</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Memberships Column */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                VIP Memberships
              </span>
              <ul className="space-y-2 text-stone-400">
                <li>1 Month VIP (₹499)</li>
                <li>3 Months VIP (₹1,299)</li>
                <li>6 Months VIP (₹2,799)</li>
                <li>1 Year VIP (₹4,999)</li>
              </ul>
            </div>

            {/* Support & Download Column */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Get the App
              </span>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setDownloadModalOpen(true)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    iOS App (App Store)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setDownloadModalOpen(true)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Android App (Google Play)
                  </button>
                </li>
                <li>
                  <span className="text-stone-500 block">Support: safety@vibecheck.in</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <span>© 2026 Vibe Check Inc. All rights reserved. High-intent matchmaking platform.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => openPolicyModal('terms')} className="hover:text-stone-300">Terms</button>
              <button onClick={() => openPolicyModal('privacy')} className="hover:text-stone-300">Privacy</button>
              <button onClick={() => openPolicyModal('cookies')} className="hover:text-stone-300">Cookies</button>
              <button onClick={() => openPolicyModal('safety')} className="hover:text-stone-300">Safety</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Download Instructions Popup */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-sm w-full p-6 space-y-4 text-center text-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-rose-950 text-rose-400 flex items-center justify-center mx-auto">
              <Download className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-editorial">
              Install Vibe Check App
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Vibe Check is optimized as a Progressive Web App (PWA). Tap <strong>Share</strong> in Safari (iOS) or the three-dots in Chrome (Android) and choose <strong>"Add to Home Screen"</strong> for full-screen mobile app experience.
            </p>
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="w-full py-2.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
