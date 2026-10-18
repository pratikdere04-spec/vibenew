import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageCircle, Sparkles, MapPin, Check, X } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

export const LikesTab: React.FC = () => {
  const { 
    users, 
    likedUserIds, 
    unlikeUser, 
    openProfileModal, 
    openDirectMessage,
    openPaymentGateway,
    userProfile,
    isEffectiveVIP
  } = useApp();

  const [viewMode, setViewMode] = useState<'likes_you' | 'you_liked'>('likes_you');

  const usersWhoLikedMe = users.filter(u => u.likedMe);
  const usersILiked = users.filter(u => likedUserIds.includes(u.id));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-12 space-y-6">
      
      {/* Top Header & Segmented Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-editorial text-stone-900">
            Likes & Chemistry
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Discover who swiped right on your vibe and review your saved profiles
          </p>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('likes_you')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'likes_you'
                ? 'bg-white text-rose-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Likes You</span>
            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-extrabold flex items-center justify-center">
              {usersWhoLikedMe.length}
            </span>
          </button>

          <button
            onClick={() => setViewMode('you_liked')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'you_liked'
                ? 'bg-white text-rose-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>You Liked</span>
            <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-[10px] font-extrabold flex items-center justify-center">
              {usersILiked.length}
            </span>
          </button>
        </div>
      </div>

      {/* VIP Banner if not VIP */}
      {!isEffectiveVIP && viewMode === 'likes_you' && (
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">
                {usersWhoLikedMe.length} admirers matched your energy!
              </p>
              <p className="text-[11px] text-stone-600">
                Vibe VIP lets you match instantly without waiting in the explore queue.
              </p>
            </div>
          </div>
          <button
            onClick={() => openPaymentGateway(PRICING_PLANS[0])}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-950 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xs cursor-pointer"
          >
            Unlock from ₹499
          </button>
        </div>
      )}

      {/* Grid of Profiles */}
      {viewMode === 'likes_you' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {usersWhoLikedMe.map((user) => (
            <div
              key={user.id}
              onClick={() => openProfileModal(user)}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/4.5] overflow-hidden bg-stone-100">
                <img
                  src={user.photos[0]}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs">
                  <Heart className="w-2.5 h-2.5 fill-white" />
                  <span>Liked Your Vibe</span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="flex items-baseline gap-1.5">
                    <h3 className="text-lg font-bold font-editorial">{user.name}</h3>
                    <span className="text-xs text-rose-200">{user.age}</span>
                  </div>
                  <p className="text-[11px] text-stone-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-300" />
                    <span>{user.location}</span>
                  </p>
                </div>
              </div>

              <div className="p-3.5 space-y-2">
                <p className="text-xs text-stone-600 line-clamp-1 italic">
                  "{user.statusVibe || user.bio}"
                </p>

                <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDirectMessage(user);
                    }}
                    className="flex-1 py-2 bg-rose-900 hover:bg-rose-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Back</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {usersILiked.length === 0 ? (
            <div className="col-span-full py-16 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-800">No liked profiles yet</h3>
              <p className="text-xs text-stone-500">Go to Explore to discover people who catch your eye!</p>
            </div>
          ) : (
            usersILiked.map((user) => (
              <div
                key={user.id}
                onClick={() => openProfileModal(user)}
                className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden bg-stone-100">
                  <img
                    src={user.photos[0]}
                    alt={user.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                  <div className="absolute top-2.5 right-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        unlikeUser(user.id);
                      }}
                      className="w-7 h-7 rounded-full bg-stone-900/60 hover:bg-rose-600 text-white flex items-center justify-center text-xs transition-colors"
                      title="Remove like"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="flex items-baseline gap-1.5">
                      <h3 className="text-lg font-bold font-editorial">{user.name}</h3>
                      <span className="text-xs text-rose-200">{user.age}</span>
                    </div>
                    <p className="text-[11px] text-stone-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-300" />
                      <span>{user.location}</span>
                    </p>
                  </div>
                </div>

                <div className="p-3.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDirectMessage(user);
                      }}
                      className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
