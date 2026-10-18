import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Heart, 
  MessageCircle, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  Flame, 
  RotateCcw,
  Info
} from 'lucide-react';

export const ExploreTab: React.FC = () => {
  const { 
    currentExploreUser, 
    passProfile, 
    likeProfile, 
    nextProfile, 
    exploreIndex, 
    users, 
    openProfileModal,
    openDirectMessage,
    likedUserIds,
    remainingDailyChats,
    userProfile
  } = useApp();

  if (!currentExploreUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-800 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-editorial text-stone-900">You've explored all profiles!</h2>
        <p className="text-xs text-stone-500">Check back soon or start the deck again.</p>
        <button
          onClick={nextProfile}
          className="px-5 py-2.5 text-xs font-bold text-white bg-rose-900 rounded-xl"
        >
          Explore Again
        </button>
      </div>
    );
  }

  const isLiked = likedUserIds.includes(currentExploreUser.id);

  return (
    <div className="max-w-lg mx-auto px-4 py-4 sm:py-6 pb-28 lg:pb-12 flex flex-col items-center">
      
      {/* Top Deck Status */}
      <div className="w-full flex items-center justify-between mb-3 px-1 text-xs text-stone-500">
        <span className="flex items-center gap-1.5 font-semibold text-rose-900">
          <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          <span>Vibe Radar</span>
          <span className="text-stone-300">·</span>
          <span className="text-[11px] text-stone-500 font-normal">
            {userProfile.isVIP ? 'VIP Unlimited' : `${remainingDailyChats}/20 new chats left`}
          </span>
        </span>
        <span className="text-[11px] text-stone-400 font-medium">
          Tap card to view details
        </span>
      </div>

      {/* Main Profile Interactive Card */}
      <div 
        onClick={() => openProfileModal(currentExploreUser)}
        className="relative w-full aspect-[3/4.2] sm:aspect-[3/4] max-h-[580px] rounded-3xl overflow-hidden bg-stone-900 shadow-2xl cursor-pointer group select-none transition-all duration-300"
      >
        {/* Photo with fallback */}
        <img
          src={currentExploreUser.photos[0]}
          alt={currentExploreUser.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          {currentExploreUser.isOnline ? (
            <div className="bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5 border border-emerald-500/30 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online Now</span>
            </div>
          ) : (
            <div className="bg-stone-900/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-300 border border-stone-700">
              {currentExploreUser.lastActive}
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              openProfileModal(currentExploreUser);
            }}
            className="w-8 h-8 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors"
            title="Inspect profile"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Profile Details */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-2">
          
          {/* Status Vibe bubble if any */}
          {currentExploreUser.statusVibe && (
            <div className="inline-block bg-white/20 backdrop-blur-md border border-white/25 px-3 py-1 rounded-full text-xs text-white font-medium shadow-xs">
              {currentExploreUser.statusVibe}
            </div>
          )}

          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-white">
                {currentExploreUser.name}
              </h2>
              <span className="text-xl font-light text-rose-200">
                {currentExploreUser.age}
              </span>
            </div>

            <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{currentExploreUser.location}</span>
              <span className="opacity-60">·</span>
              <span className="text-stone-300">{currentExploreUser.distance}</span>
            </p>
          </div>

          <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed font-light">
            {currentExploreUser.bio}
          </p>

          {/* "What He/She Likes" Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentExploreUser.likes.slice(0, 4).map((tag, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-semibold bg-rose-950/80 text-rose-200 border border-rose-800/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs"
              >
                {tag}
              </span>
            ))}
            {currentExploreUser.likes.length > 4 && (
              <span className="text-[10px] text-stone-300 px-1 py-0.5">
                +{currentExploreUser.likes.length - 4} more
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Exact Action Buttons: X (Cancel/Pass), Message, Like, and Next */}
      <div className="w-full flex items-center justify-center gap-3 sm:gap-4 mt-6">
        
        {/* 1. X Button (Cancel / Pass) -> Next profile comes */}
        <button
          onClick={passProfile}
          className="w-14 h-14 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 flex flex-col items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer group"
          title="Pass / Next profile (X)"
        >
          <X className="w-6 h-6 stroke-[2.5] group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-bold text-stone-400 mt-0.5">PASS</span>
        </button>

        {/* 2. Message Button */}
        <button
          onClick={() => openDirectMessage(currentExploreUser)}
          className="w-14 h-14 rounded-full bg-white border border-stone-200 text-sky-600 hover:text-sky-700 hover:border-sky-300 hover:bg-sky-50/50 flex flex-col items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer group"
          title="Direct Message"
        >
          <MessageCircle className="w-6 h-6 stroke-[2.2] group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-bold text-sky-600 mt-0.5">CHAT</span>
        </button>

        {/* 3. Like Button (Heart) */}
        <button
          onClick={() => likeProfile(currentExploreUser)}
          className={`w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-xl transition-all active:scale-90 cursor-pointer group ${
            isLiked
              ? 'bg-rose-600 text-white shadow-rose-600/40'
              : 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white hover:from-rose-500 hover:to-rose-400 shadow-rose-900/30'
          }`}
          title="Like Profile"
        >
          <Heart className="w-7 h-7 fill-white group-hover:scale-115 transition-transform" />
          <span className="text-[9px] font-bold text-white/90 mt-0.5">LIKE</span>
        </button>

        {/* 4. Next Button */}
        <button
          onClick={nextProfile}
          className="w-14 h-14 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:border-stone-400 hover:bg-stone-50 flex flex-col items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer group"
          title="Skip to next profile"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          <span className="text-[9px] font-bold text-stone-500 mt-0.5">NEXT</span>
        </button>

      </div>

    </div>
  );
};
