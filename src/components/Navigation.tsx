import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Radio, 
  Heart, 
  Eye, 
  MessageSquare, 
  Crown, 
  User,
  Bell
} from 'lucide-react';
import { TabType } from '../types';
import { PRICING_PLANS } from '../data/mockData';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const Navigation: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    userProfile, 
    chatThreads,
    openPaymentGateway,
    unreadNotificationCount,
    setShowNotificationCenter,
    isEffectiveVIP
  } = useApp();

  const totalMessageRequests = chatThreads.filter(t => t.isRequest).length;

  const navTabs: NavItem[] = [
    { id: 'explore', label: 'Explore', icon: Sparkles },
    { id: 'online', label: 'Online', icon: Radio },
    { id: 'likes', label: 'Likes You', icon: Heart },
    { id: 'visitors', label: 'Visitors', icon: Eye },
    { id: 'messaging', label: 'Messaging', icon: MessageSquare, badge: totalMessageRequests },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Top Header - Pure Brand & VIP/Profile status, NO tab navigation links */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark (clicking goes to explore) */}
          <button
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2.5 text-left text-2xl font-bold tracking-tight text-stone-900 font-editorial whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Vibe Check</span>
          </button>

          {/* Right Header Status: Notification Bell, VIP Status & Profile Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Notification Bell Button */}
            <button
              onClick={() => setShowNotificationCenter(true)}
              className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Notifications (Profile visitors & messages)"
            >
              <Bell className="w-5 h-5 text-stone-700" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {isEffectiveVIP ? (
              <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 text-xs font-bold flex items-center gap-1.5 border border-amber-300 shadow-2xs">
                <Crown className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                <span>VIP Active</span>
              </span>
            ) : (
              <button
                onClick={() => openPaymentGateway(PRICING_PLANS[0])}
                className="px-3.5 py-1.5 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 fill-stone-950" />
                <span>VIP (₹499/mo)</span>
              </button>
            )}

            {/* Profile Avatar Shortcut */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 pl-2 border-l border-stone-200 cursor-pointer ${
                activeTab === 'profile' ? 'opacity-100' : 'opacity-80 hover:opacity-100'
              }`}
              title="My Profile"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-rose-600 bg-stone-100">
                <img
                  src={userProfile.photo}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-stone-800 hidden sm:inline">
                {userProfile.name.split(' ')[0]}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Footer Navigation Bar - Anchored at the bottom across desktop and mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-xl">
        <div className="max-w-2xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-around">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="min-h-[44px] min-w-[44px] flex-1 flex flex-col items-center justify-center relative transition-colors focus:outline-none cursor-pointer py-1"
              >
                <div className="relative">
                  {tab.id === 'profile' ? (
                    <div className={`w-6 h-6 rounded-full overflow-hidden border transition-all ${
                      isActive ? 'border-rose-900 ring-2 ring-rose-900/30' : 'border-stone-300'
                    }`}>
                      <img
                        src={userProfile.photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <Icon className={`w-5 h-5 transition-transform ${
                      isActive ? 'text-rose-900 stroke-[2.5] scale-110' : 'text-stone-400 hover:text-stone-700'
                    }`} />
                  )}

                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>

                <span className={`text-[11px] tracking-tight mt-1 whitespace-nowrap transition-colors ${
                  isActive ? 'text-rose-950 font-bold' : 'text-stone-500 font-medium'
                }`}>
                  {tab.label}
                </span>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-900 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
