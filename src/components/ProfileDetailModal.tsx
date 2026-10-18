import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Briefcase, 
  MessageCircle, 
  Heart, 
  Sparkles, 
  Check, 
  Clock 
} from 'lucide-react';

export const ProfileDetailModal: React.FC = () => {
  const { 
    selectedProfile, 
    closeProfileModal, 
    likeProfile, 
    openDirectMessage, 
    likedUserIds 
  } = useApp();

  if (!selectedProfile) return null;

  const isLiked = likedUserIds.includes(selectedProfile.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full my-6 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Top Floating Close Button */}
        <div className="relative aspect-[4/4.5] sm:aspect-[4/4] bg-stone-900 shrink-0">
          <img
            src={selectedProfile.photos[0]}
            alt={selectedProfile.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

          <button
            onClick={closeProfileModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {selectedProfile.isOnline && (
            <div className="absolute top-4 left-4 bg-emerald-600/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Online Now</span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold font-editorial">{selectedProfile.name}</h2>
              <span className="text-xl font-light text-rose-200">{selectedProfile.age}</span>
            </div>
            <p className="text-xs text-stone-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{selectedProfile.location}</span>
              <span>·</span>
              <span>{selectedProfile.distance}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Details */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {selectedProfile.statusVibe && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-rose-950">
              <Sparkles className="w-4 h-4 text-rose-700 shrink-0" />
              <span>Current Vibe: {selectedProfile.statusVibe}</span>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">About Me</span>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
              {selectedProfile.bio}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">Profession</span>
            <p className="text-xs sm:text-sm font-semibold text-stone-800 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-stone-400" />
              <span>{selectedProfile.profession}</span>
            </p>
          </div>

          {/* "What He/She Likes" */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
              What {selectedProfile.name.split(' ')[0]} Likes
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProfile.likes.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-medium border border-stone-200/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="p-4 sm:px-6 bg-white border-t border-stone-100 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              likeProfile(selectedProfile);
              closeProfileModal();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              isLiked 
                ? 'bg-rose-600 text-white border-rose-600' 
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
            <span>{isLiked ? 'Liked' : 'Like Vibe'}</span>
          </button>

          <button
            onClick={() => {
              closeProfileModal();
              openDirectMessage(selectedProfile);
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-900 hover:bg-rose-950 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Direct Message</span>
          </button>
        </div>

      </div>
    </div>
  );
};
