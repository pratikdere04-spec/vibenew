import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Radio, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Sparkles 
} from 'lucide-react';

export const OnlineTab: React.FC = () => {
  const { 
    users, 
    openProfileModal, 
    openDirectMessage, 
    likeProfile, 
    likedUserIds,
    remainingDailyChats,
    userProfile 
  } = useApp();

  const onlineUsers = users.filter(u => u.isOnline);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-12 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-bold font-editorial text-stone-900">
              Online Right Now
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            People active now near your neighborhood ready to connect
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-medium">
            {userProfile.isVIP ? 'VIP Unlimited' : `${remainingDailyChats}/20 chats left`}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            {onlineUsers.length} Active
          </span>
        </div>
      </div>

      {/* List Mode View */}
      <div className="bg-white border border-stone-200/90 rounded-3xl divide-y divide-stone-100 shadow-xs overflow-hidden">
        {onlineUsers.map((user) => {
          const isLiked = likedUserIds.includes(user.id);

          return (
            <div
              key={user.id}
              onClick={() => openProfileModal(user)}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors cursor-pointer group"
            >
              
              {/* Left: Avatar with Glowing Online Dot */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 shadow-xs">
                <img
                  src={user.photos[0]}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
              </div>

              {/* Middle: Details & Vibe */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-base font-bold text-stone-900 truncate group-hover:text-rose-900 transition-colors">
                    {user.name}
                  </h3>
                  <span className="text-xs text-stone-500 font-normal shrink-0">
                    {user.age}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    Online
                  </span>
                </div>

                <p className="text-xs text-stone-500 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  <span>{user.location}</span>
                  <span>·</span>
                  <span className="text-stone-400">{user.distance}</span>
                </p>

                {user.statusVibe && (
                  <p className="text-xs text-stone-700 font-medium truncate pt-0.5">
                    {user.statusVibe}
                  </p>
                )}

                {/* Likes preview tags */}
                <div className="hidden sm:flex flex-wrap gap-1 pt-1">
                  {user.likes.slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Quick Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDirectMessage(user);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Send Message"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Message</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    likeProfile(user);
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer shadow-2xs ${
                    isLiked
                      ? 'bg-rose-600 text-white'
                      : 'bg-stone-50 border border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                  title={isLiked ? 'Liked' : 'Like'}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
