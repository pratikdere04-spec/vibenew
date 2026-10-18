import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Eye, 
  MessageSquare, 
  Heart, 
  X, 
  Check, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';
import { AppNotification } from '../types';

export const NotificationSystem: React.FC = () => {
  const { 
    notifications, 
    unreadNotificationCount, 
    showNotificationCenter, 
    setShowNotificationCenter,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    activeLiveNotification,
    dismissLiveNotification,
    openProfileModal,
    setActiveTab,
    setActiveThreadId,
    triggerLiveNotification,
    users
  } = useApp();

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);

    if (notif.type === 'visitor' && notif.userId) {
      const user = users.find(u => u.id === notif.userId);
      if (user) {
        openProfileModal(user);
      } else {
        setActiveTab('visitors');
      }
    } else if (notif.type === 'message') {
      setActiveTab('messaging');
      if (notif.threadId) {
        setActiveThreadId(notif.threadId);
      }
    } else if (notif.type === 'like') {
      setActiveTab('likes');
    }

    setShowNotificationCenter(false);
  };

  return (
    <>
      {/* 1. Floating Live Push-Style Toast Banner for Real-Time Visitor or Message */}
      {activeLiveNotification && (
        <div className="fixed top-20 sm:top-6 right-3 sm:right-6 z-50 max-w-sm w-full bg-stone-900/95 backdrop-blur-md text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-rose-500/30 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-3">
            
            {/* Avatar or Icon */}
            <div className="relative shrink-0">
              {activeLiveNotification.avatar ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500 shadow-md">
                  <img 
                    src={activeLiveNotification.avatar} 
                    alt="User" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-rose-900/80 text-rose-300 flex items-center justify-center border border-rose-700">
                  {activeLiveNotification.type === 'visitor' ? <Eye className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                </div>
              )}

              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-rose-600 text-white">
                {activeLiveNotification.type === 'visitor' ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <MessageSquare className="w-3 h-3" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                  {activeLiveNotification.type === 'visitor' ? '👀 Profile Visitor' : '💬 New Message'}
                </span>
                <span className="text-[10px] text-stone-400">Just now</span>
              </div>
              
              <h4 className="text-xs font-bold text-white truncate mt-0.5">
                {activeLiveNotification.title}
              </h4>
              <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5 leading-snug">
                {activeLiveNotification.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    handleNotificationClick(activeLiveNotification);
                    dismissLiveNotification();
                  }}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{activeLiveNotification.type === 'visitor' ? 'View Visitor' : 'Reply Now'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={dismissLiveNotification}
                  className="text-[11px] text-stone-400 hover:text-white px-2 py-1 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={dismissLiveNotification}
              className="text-stone-400 hover:text-white p-1 shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Notification Center Drawer / Modal */}
      {showNotificationCenter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-end p-2 sm:p-4">
          <div className="bg-white rounded-3xl max-w-md w-full my-1 sm:my-3 mr-0 sm:mr-4 overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[88vh] animate-in slide-in-from-right-4 duration-200">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-editorial text-stone-900 leading-tight">
                    Notifications
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Live updates on profile visitors & incoming messages
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] font-semibold text-rose-900 hover:text-rose-950 px-2 py-1 rounded-lg hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mark read</span>
                  </button>
                )}
                <button
                  onClick={() => setShowNotificationCenter(false)}
                  className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="p-3 overflow-y-auto flex-1 space-y-2 divide-y divide-stone-100">
              {notifications.length === 0 ? (
                <div className="text-center py-12 space-y-2 text-stone-400">
                  <Bell className="w-10 h-10 mx-auto opacity-30" />
                  <p className="text-xs font-semibold">No notifications yet</p>
                  <p className="text-[11px] text-stone-400">
                    When someone visits your profile or sends a message, it will appear here.
                  </p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`pt-2.5 pb-2 px-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 ${
                      !notif.isRead 
                        ? 'bg-rose-50/70 border border-rose-200/80 shadow-2xs' 
                        : 'hover:bg-stone-50 border border-transparent'
                    }`}
                  >
                    {/* Avatar / Icon */}
                    <div className="relative shrink-0 mt-0.5">
                      {notif.avatar ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200">
                          <img 
                            src={notif.avatar} 
                            alt="User" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center">
                          {notif.type === 'visitor' ? <Eye className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                        </div>
                      )}
                      
                      <div className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-white shadow-2xs">
                        {notif.type === 'visitor' ? (
                          <Eye className="w-3 h-3 text-rose-700" />
                        ) : (
                          <MessageSquare className="w-3 h-3 text-amber-600" />
                        )}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-stone-400 shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-2 mt-0.5">
                        {notif.description}
                      </p>
                      
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-rose-900">
                        <span>{notif.type === 'visitor' ? 'View profile details' : 'Open conversation'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-2" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="text-[11px]">
                {notifications.length} total alerts
              </span>
              <button
                type="button"
                onClick={() => {
                  // Trigger demo notification
                  const mockNames = ['Zoya Akhtar', 'Aarav Mehta', 'Ananya Roy', 'Rohan Verma'];
                  const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
                  const isVisitor = Math.random() > 0.5;
                  
                  if (isVisitor) {
                    triggerLiveNotification({
                      type: 'visitor',
                      title: 'Profile Visitor Alert!',
                      description: `${randomName} is viewing your profile and photos right now.`
                    });
                  } else {
                    triggerLiveNotification({
                      type: 'message',
                      title: `Message from ${randomName}`,
                      description: 'Hey! Loved your profile vibe ✨ Check out my message.'
                    });
                  }
                }}
                className="text-[11px] text-rose-800 font-semibold hover:underline cursor-pointer"
              >
                + Test Live Alert
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
