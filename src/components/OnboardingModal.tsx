import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_LIKES_TAGS } from '../data/mockData';
import { Sparkles, Check, X, Camera, Plus, MapPin, Upload } from 'lucide-react';
import { processImageFile } from '../utils/imageUpload';

export const OnboardingModal: React.FC = () => {
  const { 
    showOnboardingModal, 
    setShowOnboardingModal, 
    userProfile, 
    updateUserProfile,
    openFaceVerificationModal,
    showToast 
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age);
  const [gender, setGender] = useState<'female' | 'male' | 'other'>(userProfile.gender || 'female');
  const [location, setLocation] = useState(userProfile.location);
  const [profession, setProfession] = useState(userProfile.profession);
  const [bio, setBio] = useState(userProfile.bio);
  const [likes, setLikes] = useState<string[]>(userProfile.likes);
  const [customTag, setCustomTag] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(userProfile.photo);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const presetPhotos = [
    '/src/assets/images/match_ananya_portrait_1792045969038.jpg',
    '/src/assets/images/vibe_zoya_portrait_1792050775172.jpg',
    '/src/assets/images/vibe_tanya_portrait_1792050778952.jpg',
    '/src/assets/images/match_rohan_portrait_1792045969419.jpg',
    '/src/assets/images/vibe_kabir_portrait_1792050777775.jpg',
    '/src/assets/images/vibe_dev_portrait_1792050778918.jpg'
  ];

  if (!showOnboardingModal) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await processImageFile(file);
      setSelectedPhoto(dataUrl);
      showToast('Custom photo uploaded successfully! 📸');
    } catch (err: any) {
      showToast(err.message || 'Failed to upload photo.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const toggleLikeTag = (tag: string) => {
    if (likes.includes(tag)) {
      setLikes(likes.filter(t => t !== tag));
    } else {
      if (likes.length < 8) {
        setLikes([...likes, tag]);
      } else {
        showToast('You can select up to 8 top vibe tags!');
      }
    }
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTag.trim()) return;
    if (!likes.includes(customTag.trim())) {
      setLikes([...likes, customTag.trim()]);
    }
    setCustomTag('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please provide your name');
      return;
    }

    const userAge = Number(age);
    if (!userAge || userAge < 18) {
      showToast('You must be at least 18 years old to join Vibe Check.');
      return;
    }

    const isFemale = gender === 'female';
    updateUserProfile({
      name,
      age: userAge,
      gender,
      location,
      profession,
      bio,
      likes,
      photo: selectedPhoto,
      isVIP: isFemale ? true : userProfile.isVIP,
      isFreeGirlVIP: isFemale ? true : false,
      vipExpiry: isFemale ? 'Lifetime VIP Active' : userProfile.vipExpiry
    });

    setShowOnboardingModal(false);
    showToast('Profile created! Opening Face Identification...');

    // Automatically trigger Face Identification only on signup
    setTimeout(() => {
      openFaceVerificationModal();
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full my-6 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-editorial text-stone-900 leading-tight">
                Complete Your Vibe Profile
              </h2>
              <p className="text-xs text-stone-500">
                Tell people who you are and what you like
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowOnboardingModal(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Profile Picture Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
                1. Select or Upload Profile Picture
              </label>
              <span className="text-[11px] text-stone-500">JPG, PNG, WebP supported</span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
              {/* Avatar Preview with Click to Upload */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-200 border-2 border-rose-600 shadow-md shrink-0 cursor-pointer group"
                title="Click to upload custom picture"
              >
                <img
                  src={selectedPhoto}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span>Change</span>
                </div>
                <div className="absolute bottom-1 right-1 bg-rose-600 text-white p-1 rounded-full shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
              </div>

              {/* Upload Action & Presets */}
              <div className="space-y-2.5 flex-1">
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 bg-rose-900 hover:bg-rose-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Processing Photo...' : 'Upload Photo from Device / Camera'}</span>
                  </button>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Upload any photo from your phone gallery or desktop.
                  </p>
                </div>

                <div className="pt-1 border-t border-stone-200/60">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-tight block mb-1">
                    Or pick an aesthetic preset:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {presetPhotos.map((photoUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedPhoto(photoUrl)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-transform cursor-pointer ${
                          selectedPhoto === photoUrl ? 'border-rose-600 scale-105 shadow-sm ring-2 ring-rose-300' : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={photoUrl} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gender Selection & Verification Notice */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
                2. Select Your Gender (Basis for Profile Verification)
              </label>
              <span className="text-[11px] text-stone-500 font-medium">Live Camera Verified</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col items-center gap-1 ${
                  gender === 'female'
                    ? 'bg-rose-50 border-rose-800 ring-2 ring-rose-800 text-rose-950 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span className="text-base">👩</span>
                <span className="text-xs">Female</span>
                <span className="text-[10px] text-stone-400 mt-0.5">Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setGender('male')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col items-center gap-1 ${
                  gender === 'male'
                    ? 'bg-rose-50 border-rose-800 ring-2 ring-rose-800 text-rose-950 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span className="text-base">👨</span>
                <span className="text-xs">Male</span>
                <span className="text-[10px] text-stone-400 mt-0.5">Standard</span>
              </button>

              <button
                type="button"
                onClick={() => setGender('other')}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col items-center gap-1 ${
                  gender === 'other'
                    ? 'bg-rose-50 border-rose-800 ring-2 ring-rose-800 text-rose-950 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span className="text-base">✨</span>
                <span className="text-xs">Non-Binary</span>
                <span className="text-[10px] text-stone-400 mt-0.5">Standard</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-500">
              * Live Face Identification will authenticate your profile identity after signup.
            </p>
          </div>

          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Devika Patel"
                className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span>Age</span>
                <span className="text-[10px] text-rose-700 font-bold bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                  18+ Only
                </span>
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min={18}
                max={60}
                className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800"
                required
              />
            </div>
          </div>

          {/* Location & Profession */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Location / Neighborhood</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Indiranagar, Bengaluru"
                className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Profession / Study</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="Brand Strategist"
                className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
            </div>
          </div>

          {/* What He / She Likes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                2. What You Like ({likes.length}/8 selected)
              </label>
              <span className="text-[11px] text-stone-500">Pick tags that define your vibe</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
              {AVAILABLE_LIKES_TAGS.map((tag) => {
                const isSelected = likes.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleLikeTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                );
              })}
            </div>

            {/* Custom tag input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add custom interest (e.g. Sushi, Formula 1)..."
                className="flex-1 text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="px-3.5 py-2.5 text-xs font-bold text-rose-950 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Bio / Vibe headline */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Bio / What makes your vibe unique</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell others what you enjoy doing on a Sunday, your favorite music, or the best cafe in your city..."
              className="w-full text-xs sm:text-sm p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-800 to-rose-700 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Save Profile & Start Exploring Vibe Check
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
