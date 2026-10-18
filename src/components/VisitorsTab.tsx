import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, MapPin, MessageCircle, Heart, Sparkles, Clock } from 'lucide-react';

export const VisitorsTab: React.FC = () => {
  const { 
    users, 
    openProfileModal, 
    openDirectMessage, 
    likeProfile, 
    likedUserIds,
    openPaymentGateway,
    userProfile 
  } = useApp();

  // Profiles that visited user
  const visitors = users.filter(u => u.visitedAt);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-12 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-rose-900" />
            <h1 className="text-2xl font-bold font-editorial text-stone-900">
              Profile Visitors
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            People who checked out your profile and vibe recently
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
          {visitors.length} Recent Visitors
        </span>
      </div>

      {/* Grid of Profile Visitors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {visitors.map((user) => {
          const isLiked = likedUserIds.includes(user.id);

          return (
            <div
              key={user.id}
              onClick={() => openProfileModal(user)}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Photo & Scrim */}
              <div className="relative aspect-[4/4.5] overflow-hidden bg-stone-100">
                <img
                  src={user.photos[0]}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-md text-stone-200 px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 border border-stone-700">
                  <Clock className="w-2.5 h-2.5 text-amber-400" />
                  <span>Visited {user.visitedAt}</span>
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

              {/* Bio & Actions */}
              <div className="p-3.5 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {user.likes.slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDirectMessage(user);
                    }}
                    className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Say Hi</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      likeProfile(user);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer border ${
                      isLiked 
                        ? 'bg-rose-600 border-rose-600 text-white' 
                        : 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100'
                    }`}
                    title={isLiked ? 'Liked' : 'Like'}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
