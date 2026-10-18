import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Briefcase, 
  Edit3, 
  Crown, 
  ShieldCheck, 
  LogOut, 
  Check, 
  MessageSquare, 
  Camera, 
  FileText, 
  Lock, 
  Cookie, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';
import { processImageFile } from '../utils/imageUpload';

export const ProfileTab: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile,
    setShowOnboardingModal, 
    isEffectiveVIP,
    openPaymentGateway, 
    logout,
    remainingDailyChats,
    openPolicyModal,
    showToast 
  } = useApp();

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const handleDirectPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const dataUrl = await processImageFile(file);
      updateUserProfile({ photo: dataUrl });
      showToast('Profile photo updated successfully! 📸');
    } catch (err: any) {
      showToast(err.message || 'Failed to upload photo.');
    } finally {
      setIsUploadingPhoto(false);
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-16 space-y-6">
      
      {/* Hidden File Input for Direct Upload */}
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        onChange={handleDirectPhotoUpload}
        className="hidden"
      />

      {/* Main Profile Card */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Top Header & Photo */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          <div className="flex flex-col items-center gap-2">
            <div 
              onClick={() => photoInputRef.current?.click()}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-stone-100 border-2 border-rose-600 shadow-md shrink-0 cursor-pointer group"
              title="Click to change profile picture"
            >
              <img
                src={userProfile.photo}
                alt={userProfile.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-bold">
                <Camera className="w-6 h-6 mb-1" />
                <span>Change Photo</span>
              </div>
              {isEffectiveVIP && (
                <div className="absolute top-1 right-1 bg-amber-400 text-stone-950 p-1 rounded-full shadow-xs">
                  <Crown className="w-3.5 h-3.5 fill-stone-950" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="text-xs font-semibold text-rose-900 hover:text-rose-950 flex items-center gap-1 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{isUploadingPhoto ? 'Uploading...' : 'Change Photo'}</span>
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold font-editorial text-stone-900">
                    {userProfile.name}
                  </h1>
                  <span className="text-xl font-light text-stone-500">
                    {userProfile.age}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>{userProfile.location}</span>
                  </p>

                  {/* Face Verification Badge */}
                  {userProfile.isFaceVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Verified Profile ✓</span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                {isEffectiveVIP ? (
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold flex items-center gap-1 border border-amber-300 shadow-2xs">
                    <Crown className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                    <span>VIP Active</span>
                  </span>
                ) : (
                  <button
                    onClick={() => openPaymentGateway(PRICING_PLANS[0])}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer hover:brightness-105"
                  >
                    <Crown className="w-3 h-3 fill-stone-950" />
                    <span>Get VIP</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-stone-700 font-medium flex items-center justify-center sm:justify-start gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-stone-400" />
              <span>{userProfile.profession}</span>
            </p>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="px-4 py-2 text-xs font-bold text-rose-900 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile & What I Like</span>
              </button>

              <button
                onClick={logout}
                className="px-3.5 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-50 hover:bg-stone-100 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bio Section */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
            About My Vibe
          </span>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
            {userProfile.bio}
          </p>
        </div>

        {/* What I Like & Enjoy Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              What I Like & Enjoy
            </h3>
            <span className="text-xs text-stone-400">{userProfile.likes.length} tags</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {userProfile.likes.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-rose-50 text-rose-900 border border-rose-200/90 rounded-full text-xs font-semibold flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-rose-700" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Daily 20 New Chats Quota Card */}
        <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 font-bold text-rose-950">
              <MessageSquare className="w-4 h-4 text-rose-800" />
              <span>Daily New Chat Initiation Quota</span>
            </div>
            <p className="text-[11px] text-stone-600">
              {isEffectiveVIP
                ? 'VIP Members enjoy Unlimited New Chat Invitations!' 
                : 'Free members can initiate up to 20 new chats per day.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isEffectiveVIP ? (
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold text-xs border border-amber-300">
                Unlimited
              </span>
            ) : (
              <div className="text-right">
                <span className="text-xs font-bold text-rose-900 tabular-nums">
                  {remainingDailyChats} / 20 Left
                </span>
                <span className="block text-[10px] text-stone-400">Resets at midnight</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* VIP Membership Perks Card */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="text-lg font-bold font-editorial text-white">
              Vibe VIP Privileges
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-300">
            {isEffectiveVIP ? 'Subscribed' : 'Plans from ₹499'}
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>See who visited your profile</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant match with who liked you</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Unlimited message reading & sending</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Priority direct message requests</span>
          </li>
        </ul>

        {!isEffectiveVIP ? (
          <div className="pt-2">
            <button
              onClick={() => openPaymentGateway(PRICING_PLANS[0])}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
            >
              Select VIP Plan (₹499 / ₹1,299 / ₹2,799 / ₹4,999)
            </button>
          </div>
        ) : (
          <div className="pt-2 text-center text-xs text-amber-300 font-medium bg-white/5 py-2.5 rounded-xl border border-white/10">
            ✓ Your VIP Membership is active with full unlimited privileges.
          </div>
        )}
      </div>

      {/* FOOTER: Legal, Privacy & Safety Section */}
      <footer className="pt-4 border-t border-stone-200">
        <div className="p-4 sm:p-5 bg-stone-50 rounded-3xl border border-stone-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-stone-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-rose-800" />
              <span>Policies, Trust & Safety Center</span>
              <span className="text-[10px] font-semibold text-rose-900 bg-rose-100 px-2 py-0.5 rounded-full">
                18+ Only
              </span>
            </div>
            <span className="text-[11px] text-stone-500">
              support@Vibe Check.in
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-200/60 text-xs text-stone-600">
            <button
              type="button"
              onClick={() => openPolicyModal('privacy')}
              className="px-2.5 py-1.5 rounded-xl hover:bg-stone-200/80 hover:text-stone-950 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            >
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              <span>Privacy Policy</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              type="button"
              onClick={() => openPolicyModal('terms')}
              className="px-2.5 py-1.5 rounded-xl hover:bg-stone-200/80 hover:text-stone-950 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>Terms of Use</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              type="button"
              onClick={() => openPolicyModal('safety')}
              className="px-2.5 py-1.5 rounded-xl hover:bg-stone-200/80 hover:text-stone-950 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-stone-500" />
              <span>Safety Tips</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              type="button"
              onClick={() => openPolicyModal('cookies')}
              className="px-2.5 py-1.5 rounded-xl hover:bg-stone-200/80 hover:text-stone-950 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            >
              <Cookie className="w-3.5 h-3.5 text-stone-500" />
              <span>Cookies</span>
            </button>
          </div>

          <p className="text-[10px] text-stone-500 leading-relaxed font-light">
            Vibe Check is strictly restricted to verified adults aged 18 and older. We enforce zero tolerance for fake profiles, harassment, or unlawful conduct.
          </p>
        </div>
      </footer>

    </div>
  );
};
