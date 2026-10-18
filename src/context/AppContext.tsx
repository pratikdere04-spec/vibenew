import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TabType, 
  VibeUser, 
  CurrentUserProfile, 
  ChatThread, 
  PricingPlan,
  AuthState,
  AppNotification
} from '../types';
import { 
  INITIAL_CURRENT_USER, 
  MOCK_USERS, 
  INITIAL_CHAT_THREADS, 
  PRICING_PLANS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface AppContextType {
  authState: AuthState;
  login: (method: 'phone' | 'email' | 'google', identifier?: string) => void;
  logout: () => void;
  
  userProfile: CurrentUserProfile;
  updateUserProfile: (updates: Partial<CurrentUserProfile>) => void;
  isGirlUser: boolean;
  isEffectiveVIP: boolean;
  
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  users: VibeUser[];
  exploreIndex: number;
  currentExploreUser: VibeUser | null;
  passProfile: () => void;
  likeProfile: (user: VibeUser) => void;
  nextProfile: () => void;
  likedUserIds: string[];
  unlikeUser: (userId: string) => void;
  
  chatThreads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  sendMessage: (threadId: string, text: string) => void;
  startChatWithUser: (userId: string, initialText?: string) => void;
  acceptMessageRequest: (threadId: string) => void;
  declineMessageRequest: (threadId: string) => void;
  
  showOnboardingModal: boolean;
  setShowOnboardingModal: (show: boolean) => void;
  
  showFaceVerificationModal: boolean;
  setShowFaceVerificationModal: (show: boolean) => void;
  openFaceVerificationModal: () => void;
  
  showPaymentGatewayModal: boolean;
  selectedPlan: PricingPlan;
  openPaymentGateway: (plan: PricingPlan) => void;
  closePaymentGateway: () => void;
  completeSubscriptionPayment: (planId: PricingPlan['id']) => void;
  
  selectedProfile: VibeUser | null;
  openProfileModal: (user: VibeUser) => void;
  closeProfileModal: () => void;
  
  directMessageUser: VibeUser | null;
  openDirectMessage: (user: VibeUser) => void;
  closeDirectMessage: () => void;
  sendQuickMessage: (user: VibeUser, text: string) => boolean;

  dailyInitiatedCount: number;
  remainingDailyChats: number;
  showDailyLimitModal: boolean;
  setShowDailyLimitModal: (show: boolean) => void;
  
  policyModalType: 'terms' | 'privacy' | 'cookies' | 'safety' | null;
  openPolicyModal: (type?: 'terms' | 'privacy' | 'cookies' | 'safety') => void;
  closePolicyModal: () => void;

  notifications: AppNotification[];
  unreadNotificationCount: number;
  showNotificationCenter: boolean;
  setShowNotificationCenter: (show: boolean) => void;
  activeLiveNotification: AppNotification | null;
  triggerLiveNotification: (notif: Partial<AppNotification>) => void;
  dismissLiveNotification: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [authState, setAuthState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('vibe_auth_state');
    return saved ? JSON.parse(saved) : { isAuthenticated: true, loginMethod: 'phone', phoneOrEmail: '+91 98765 43210' };
  });

  const [userProfile, setUserProfile] = useState<CurrentUserProfile>(() => {
    const saved = localStorage.getItem('vibe_current_user');
    return saved ? JSON.parse(saved) : INITIAL_CURRENT_USER;
  });

  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [users] = useState<VibeUser[]>(MOCK_USERS);
  const [exploreIndex, setExploreIndex] = useState<number>(0);
  const [likedUserIds, setLikedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('vibe_liked_ids');
    return saved ? JSON.parse(saved) : ['user-kabir'];
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('vibe_chat_threads');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });

  const [activeThreadId, setActiveThreadId] = useState<string | null>('thread-zoya');
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showPaymentGatewayModal, setShowPaymentGatewayModal] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(PRICING_PLANS[1]); // Default 3 months ₹1199

  const [selectedProfile, setSelectedProfile] = useState<VibeUser | null>(null);
  const [directMessageUser, setDirectMessageUser] = useState<VibeUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Daily New Chat Limit (Max 20 per day for standard members)
  const [dailyInitiatedCount, setDailyInitiatedCount] = useState<number>(() => {
    const today = new Date().toISOString().slice(0, 10);
    const saved = localStorage.getItem('vibe_daily_initiated');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          return parsed.count;
        }
      } catch (e) {}
    }
    return 3; // Demo starting count: 3 used, 17 remaining today
  });

  const [showDailyLimitModal, setShowDailyLimitModal] = useState<boolean>(false);
  const [showFaceVerificationModal, setShowFaceVerificationModal] = useState<boolean>(false);
  const [policyModalType, setPolicyModalType] = useState<'terms' | 'privacy' | 'cookies' | 'safety' | null>(null);

  // Real-time In-App Notifications (Profile Visitors & Messages)
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('vibe_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  const [showNotificationCenter, setShowNotificationCenter] = useState<boolean>(false);
  const [activeLiveNotification, setActiveLiveNotification] = useState<AppNotification | null>(null);

  const openFaceVerificationModal = () => {
    setShowFaceVerificationModal(true);
  };

  const openPolicyModal = (type: 'terms' | 'privacy' | 'cookies' | 'safety' = 'terms') => {
    setPolicyModalType(type);
  };

  const closePolicyModal = () => {
    setPolicyModalType(null);
  };

  const isGirlUser = userProfile.gender === 'female';
  const isEffectiveVIP = userProfile.isVIP || isGirlUser || !!userProfile.isFreeGirlVIP;

  // Notification Helpers
  const triggerLiveNotification = (notif: Partial<AppNotification>) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: notif.type || 'visitor',
      title: notif.title || 'Notification',
      description: notif.description || '',
      timestamp: 'Just now',
      avatar: notif.avatar,
      userId: notif.userId,
      threadId: notif.threadId,
      isRead: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveLiveNotification(newNotif);

    // Auto-dismiss after 6.5s
    setTimeout(() => {
      setActiveLiveNotification(curr => curr?.id === newNotif.id ? null : curr);
    }, 6500);
  };

  const dismissLiveNotification = () => {
    setActiveLiveNotification(null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read.');
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  // Background Simulated Real-time Notification Demo:
  // After 6s, a real visitor alert triggers so user sees live notification behavior
  useEffect(() => {
    if (!authState.isAuthenticated) return;
    const timer = setTimeout(() => {
      triggerLiveNotification({
        type: 'visitor',
        title: 'New Profile Visitor!',
        description: 'Priya Sharma (UX Designer, Indiranagar) just checked out your vibe and profile photos!',
        avatar: '/src/assets/images/vibe_zoya_portrait_1792050775172.jpg',
        userId: 'user-zoya'
      });
    }, 6000);
    return () => clearTimeout(timer);
  }, [authState.isAuthenticated]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('vibe_daily_initiated', JSON.stringify({ date: today, count: dailyInitiatedCount }));
  }, [dailyInitiatedCount]);

  const remainingDailyChats = isEffectiveVIP ? 9999 : Math.max(0, 20 - dailyInitiatedCount);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('vibe_auth_state', JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem('vibe_current_user', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('vibe_liked_ids', JSON.stringify(likedUserIds));
  }, [likedUserIds]);

  useEffect(() => {
    localStorage.setItem('vibe_chat_threads', JSON.stringify(chatThreads));
  }, [chatThreads]);

  useEffect(() => {
    localStorage.setItem('vibe_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const login = (method: 'phone' | 'email' | 'google', identifier?: string) => {
    const defaultId = method === 'google' 
      ? 'user.google@gmail.com' 
      : method === 'phone' 
      ? identifier || '+91 98765 43210' 
      : identifier || 'user@example.com';

    setAuthState({
      isAuthenticated: true,
      loginMethod: method,
      phoneOrEmail: defaultId
    });

    // Check if new onboarding needed
    setShowOnboardingModal(true);
    showToast(`Signed in successfully via ${method === 'google' ? 'Google' : method.toUpperCase()}!`);
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false });
    showToast('Logged out of Vibe Check.');
  };

  const updateUserProfile = (updates: Partial<CurrentUserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully!');
  };

  // Explore carousel actions
  const currentExploreUser = users.length > 0 ? users[exploreIndex % users.length] : null;

  const nextProfile = () => {
    setExploreIndex(prev => (prev + 1) % users.length);
  };

  const passProfile = () => {
    if (currentExploreUser) {
      showToast(`Skipped ${currentExploreUser.name}`);
    }
    nextProfile();
  };

  const likeProfile = (user: VibeUser) => {
    if (!likedUserIds.includes(user.id)) {
      setLikedUserIds(prev => [...prev, user.id]);
    }
    showToast(`Liked ${user.name}! ❤️`);
    nextProfile();
  };

  const unlikeUser = (userId: string) => {
    setLikedUserIds(prev => prev.filter(id => id !== userId));
    showToast('Removed from liked profiles.');
  };

  // Messaging & Chat Requests (Only subscribed members or verified girls can send and read messages)
  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;

    if (!isEffectiveVIP) {
      openPaymentGateway(PRICING_PLANS[0]);
      showToast('VIP Subscription required to read and send messages!');
      return;
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: 'me',
      text,
      timestamp: 'Just now',
      isRead: true
    };

    setChatThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        return {
          ...th,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...th.messages, newMessage]
        };
      }
      return th;
    }));

    // Simulate smart playful reply after short delay
    setTimeout(() => {
      const currentThread = chatThreads.find(t => t.id === threadId);
      if (currentThread && !currentThread.isRequest) {
        const targetUser = users.find(u => u.id === currentThread.userId);
        const replyText = `Love that! By the way, are you free this weekend? Let's vibe check over coffee.`;

        const autoReply = {
          id: `msg-reply-${Date.now()}`,
          threadId,
          senderId: currentThread.userId,
          text: replyText,
          timestamp: 'Just now',
          isRead: false
        };

        setChatThreads(inner => inner.map(th => {
          if (th.id === threadId) {
            return {
              ...th,
              lastMessage: replyText,
              lastMessageTime: 'Just now',
              unreadCount: th.unreadCount + 1,
              messages: [...th.messages, autoReply]
            };
          }
          return th;
        }));

        // Trigger in-app live notification for incoming message
        triggerLiveNotification({
          type: 'message',
          title: `New message from ${targetUser?.name || 'Match'}`,
          description: replyText,
          avatar: targetUser?.photos[0],
          userId: currentThread.userId,
          threadId: currentThread.id
        });
      }
    }, 2000);
  };

  const startChatWithUser = (userId: string, initialText?: string): boolean => {
    // Only subscribed VIP members or girls are able to read and send messages
    if (!isEffectiveVIP) {
      openPaymentGateway(PRICING_PLANS[0]);
      showToast('VIP Subscription required to read and send messages!');
      return false;
    }

    let existingThread = chatThreads.find(t => t.userId === userId);
    
    // Check if this is a brand new chat initiation
    if (!existingThread) {
      if (!isEffectiveVIP && dailyInitiatedCount >= 20) {
        setShowDailyLimitModal(true);
        showToast("Daily limit reached: 20/20 new chats initiated today. Upgrade to VIP for unlimited!");
        return false;
      }

      // Increment daily limit counter
      setDailyInitiatedCount(prev => prev + 1);

      const newThread: ChatThread = {
        id: `thread-${userId}`,
        userId,
        lastMessage: initialText || 'Hey! Loved your vibe ✨',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        isRequest: false,
        requestStatus: 'accepted',
        messages: [
          {
            id: `msg-${Date.now()}`,
            threadId: `thread-${userId}`,
            senderId: 'me',
            text: initialText || 'Hey! Loved your vibe ✨',
            timestamp: 'Just now',
            isRead: true
          }
        ]
      };
      setChatThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);

      const left = Math.max(0, 19 - dailyInitiatedCount);
      if (!isEffectiveVIP) {
        showToast(`Message sent! ${left} of 20 daily new chat invites remaining.`);
      } else {
        showToast(`Message sent! (VIP Unlimited 💬)`);
      }

      // Trigger realistic match response & incoming message notification
      setTimeout(() => {
        const targetUser = users.find(u => u.id === userId);
        const replyText = `Hey! Thanks for messaging, loved your vibe too ✨`;
        const autoReply = {
          id: `msg-reply-${Date.now()}`,
          threadId: newThread.id,
          senderId: userId,
          text: replyText,
          timestamp: 'Just now',
          isRead: false
        };

        setChatThreads(inner => inner.map(th => {
          if (th.id === newThread.id) {
            return {
              ...th,
              lastMessage: replyText,
              lastMessageTime: 'Just now',
              unreadCount: th.unreadCount + 1,
              messages: [...th.messages, autoReply]
            };
          }
          return th;
        }));

        triggerLiveNotification({
          type: 'message',
          title: `New message from ${targetUser?.name || 'Match'}`,
          description: replyText,
          avatar: targetUser?.photos[0],
          userId,
          threadId: newThread.id
        });
      }, 4000);
    } else {
      if (existingThread.isRequest) {
        // Upgrade request to active conversation
        existingThread.isRequest = false;
        existingThread.requestStatus = 'accepted';
      }
      setActiveThreadId(existingThread.id);
    }
    setActiveTab('messaging');
    return true;
  };

  const acceptMessageRequest = (threadId: string) => {
    setChatThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        return {
          ...th,
          isRequest: false,
          requestStatus: 'accepted'
        };
      }
      return th;
    }));
    setActiveThreadId(threadId);
    showToast('Message request accepted! You can now chat freely.');
  };

  const declineMessageRequest = (threadId: string) => {
    setChatThreads(prev => prev.filter(th => th.id !== threadId));
    showToast('Message request declined.');
  };

  // Direct Message Quick Sender
  const openDirectMessage = (user: VibeUser) => {
    setDirectMessageUser(user);
  };

  const closeDirectMessage = () => {
    setDirectMessageUser(null);
  };

  const sendQuickMessage = (user: VibeUser, text: string): boolean => {
    const success = startChatWithUser(user.id, text);
    if (success) {
      setDirectMessageUser(null);
    }
    return success;
  };

  // Payment Gateway
  const openPaymentGateway = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setShowPaymentGatewayModal(true);
  };

  const closePaymentGateway = () => {
    setShowPaymentGatewayModal(false);
  };

  const completeSubscriptionPayment = (planId: PricingPlan['id']) => {
    setUserProfile(prev => ({
      ...prev,
      isVIP: true,
      vipPlan: planId,
      vipExpiry: 'Active for ' + (planId === '1_month' ? '30 days' : planId === '3_months' ? '90 days' : planId === '6_months' ? '180 days' : '365 days')
    }));
    setShowPaymentGatewayModal(false);
    showToast(`Payment of ${selectedPlan.formattedPrice} successful! Vibe VIP unlocked 🎉`);
  };

  const openProfileModal = (user: VibeUser) => {
    setSelectedProfile(user);
  };

  const closeProfileModal = () => {
    setSelectedProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        authState,
        login,
        logout,
        userProfile,
        updateUserProfile,
        isGirlUser,
        isEffectiveVIP,
        activeTab,
        setActiveTab,
        users,
        exploreIndex,
        currentExploreUser,
        passProfile,
        likeProfile,
        nextProfile,
        likedUserIds,
        unlikeUser,
        chatThreads,
        activeThreadId,
        setActiveThreadId,
        sendMessage,
        startChatWithUser,
        acceptMessageRequest,
        declineMessageRequest,
        showOnboardingModal,
        setShowOnboardingModal,
        showFaceVerificationModal,
        setShowFaceVerificationModal,
        openFaceVerificationModal,
        showPaymentGatewayModal,
        selectedPlan,
        openPaymentGateway,
        closePaymentGateway,
        completeSubscriptionPayment,
        selectedProfile,
        openProfileModal,
        closeProfileModal,
        directMessageUser,
        openDirectMessage,
        closeDirectMessage,
        sendQuickMessage,
        dailyInitiatedCount,
        remainingDailyChats,
        showDailyLimitModal,
        setShowDailyLimitModal,
        policyModalType,
        openPolicyModal,
        closePolicyModal,
        notifications,
        unreadNotificationCount,
        showNotificationCenter,
        setShowNotificationCenter,
        activeLiveNotification,
        triggerLiveNotification,
        dismissLiveNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
