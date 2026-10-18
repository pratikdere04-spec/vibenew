/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthScreen } from './components/AuthScreen';
import { Navigation } from './components/Navigation';
import { ExploreTab } from './components/ExploreTab';
import { OnlineTab } from './components/OnlineTab';
import { LikesTab } from './components/LikesTab';
import { VisitorsTab } from './components/VisitorsTab';
import { MessagingTab } from './components/MessagingTab';
import { ProfileTab } from './components/ProfileTab';
import { OnboardingModal } from './components/OnboardingModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { DirectMessageModal } from './components/DirectMessageModal';
import { DailyLimitModal } from './components/DailyLimitModal';
import { PolicyModal } from './components/PolicyModal';
import { FaceVerificationModal } from './components/FaceVerificationModal';
import { NotificationSystem } from './components/NotificationSystem';
import { CheckCircle2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { authState, activeTab, toastMessage } = useApp();

  return (
    <>
      {!authState.isAuthenticated ? (
        <AuthScreen />
      ) : (
        <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-800 font-sans selection:bg-rose-100 selection:text-rose-900">
          
          {/* Main Navigation with Bottom Anchored Bar */}
          <Navigation />

          {/* Main Dynamic View based on Active Tab */}
          <main className="flex-1">
            {activeTab === 'explore' && <ExploreTab />}
            {activeTab === 'online' && <OnlineTab />}
            {activeTab === 'likes' && <LikesTab />}
            {activeTab === 'visitors' && <VisitorsTab />}
            {activeTab === 'messaging' && <MessagingTab />}
            {activeTab === 'profile' && <ProfileTab />}
          </main>

          {/* Global Interactive Modals */}
          <OnboardingModal />
          <FaceVerificationModal />
          <PaymentGatewayModal />
          <ProfileDetailModal />
          <DirectMessageModal />
          <DailyLimitModal />
        </div>
      )}

      {/* Global Notifications (Toast Banner & Notification Center Drawer) */}
      <NotificationSystem />

      {/* Global Policy Modal (Accessible on Computer First Page and In-App Profile Tab) */}
      <PolicyModal />

      {/* Non-intrusive Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 bg-stone-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 border border-stone-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
