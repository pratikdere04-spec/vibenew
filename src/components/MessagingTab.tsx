import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  Inbox, 
  UserCheck, 
  X, 
  Check, 
  MapPin, 
  Smile, 
  Sparkles,
  Crown,
  Lock
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

export const MessagingTab: React.FC = () => {
  const { 
    chatThreads, 
    activeThreadId, 
    setActiveThreadId, 
    users, 
    sendMessage, 
    acceptMessageRequest, 
    declineMessageRequest,
    openProfileModal,
    userProfile,
    isEffectiveVIP,
    openPaymentGateway
  } = useApp();

  const [messageView, setMessageView] = useState<'chats' | 'requests'>('chats');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeChats = chatThreads.filter(t => !t.isRequest);
  const messageRequests = chatThreads.filter(t => t.isRequest);

  const currentThread = chatThreads.find(t => t.id === activeThreadId) || (messageView === 'requests' ? messageRequests[0] : activeChats[0]);
  const currentTargetUser = users.find(u => u.id === currentThread?.userId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentThread?.messages]);

  const handleSend = () => {
    if (!inputText.trim() || !currentThread) return;
    sendMessage(currentThread.id, inputText);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-28 lg:pb-8">
      
      {/* 2-Column Chat Layout */}
      <div className="bg-white border border-stone-200/90 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px] h-[calc(100vh-175px)]">
        
        {/* Left Column: Conversation / Request List */}
        <div className={`lg:col-span-4 border-r border-stone-100 flex flex-col h-full bg-stone-50/50 ${activeThreadId ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Sub-tabs: Chats vs Message Requests */}
          <div className="p-3 bg-white border-b border-stone-100 flex items-center gap-1">
            <button
              onClick={() => {
                setMessageView('chats');
                if (activeChats.length > 0) setActiveThreadId(activeChats[0].id);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                messageView === 'chats'
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chats ({activeChats.length})</span>
            </button>

            <button
              onClick={() => {
                setMessageView('requests');
                if (messageRequests.length > 0) setActiveThreadId(messageRequests[0].id);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                messageView === 'requests'
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Requests</span>
              {messageRequests.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold flex items-center justify-center">
                  {messageRequests.length}
                </span>
              )}
            </button>
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100/80">
            {messageView === 'chats' ? (
              activeChats.length === 0 ? (
                <div className="p-8 text-center space-y-2 text-stone-400">
                  <p className="text-xs">No active chats yet. Start chatting from Explore or Online!</p>
                </div>
              ) : (
                activeChats.map((thread) => {
                  const targetUser = users.find(u => u.id === thread.userId);
                  if (!targetUser) return null;
                  const isSelected = currentThread?.id === thread.id;

                  return (
                    <div
                      key={thread.id}
                      onClick={() => setActiveThreadId(thread.id)}
                      className={`p-4 transition-colors cursor-pointer flex items-center gap-3.5 ${
                        isSelected ? 'bg-rose-50/80 border-l-4 border-rose-900' : 'hover:bg-stone-50'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-200 shrink-0">
                        <img
                          src={targetUser.photos[0]}
                          alt={targetUser.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {targetUser.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {targetUser.name}
                          </h4>
                          <span className="text-[10px] text-stone-400 shrink-0">
                            {thread.lastMessageTime}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 truncate mt-0.5 font-light">
                          {isEffectiveVIP ? thread.lastMessage : '🔒 VIP Only · Subscribe to read'}
                        </p>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              messageRequests.length === 0 ? (
                <div className="p-8 text-center space-y-2 text-stone-400">
                  <p className="text-xs">No pending message requests right now.</p>
                </div>
              ) : (
                messageRequests.map((thread) => {
                  const targetUser = users.find(u => u.id === thread.userId);
                  if (!targetUser) return null;
                  const isSelected = currentThread?.id === thread.id;

                  return (
                    <div
                      key={thread.id}
                      onClick={() => setActiveThreadId(thread.id)}
                      className={`p-4 transition-colors cursor-pointer flex items-center gap-3.5 ${
                        isSelected ? 'bg-amber-50/80 border-l-4 border-amber-500' : 'hover:bg-stone-50'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-200 shrink-0 border border-amber-300">
                        <img
                          src={targetUser.photos[0]}
                          alt={targetUser.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-stone-900 truncate">
                            {targetUser.name}
                          </h4>
                          <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-bold">
                            Request
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 truncate mt-0.5 font-light">
                          {isEffectiveVIP ? thread.lastMessage : '🔒 Message request hidden · VIP only'}
                        </p>
                      </div>
                    </div>
                  );
                })
              )
            )}
          </div>
        </div>

        {/* Right Column: Chat Room Stream */}
        {currentThread && currentTargetUser ? (
          <div className="lg:col-span-8 flex flex-col h-full bg-white relative">
            
            {/* Chat Room Top Bar */}
            <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setActiveThreadId(null)}
                  className="lg:hidden text-xs text-stone-500 hover:text-stone-900 p-1"
                >
                  ← Back
                </button>

                <div
                  onClick={() => openProfileModal(currentTargetUser)}
                  className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 shrink-0 cursor-pointer border border-stone-200"
                >
                  <img
                    src={currentTargetUser.photos[0]}
                    alt={currentTargetUser.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3
                      onClick={() => openProfileModal(currentTargetUser)}
                      className="text-sm font-bold text-stone-900 truncate cursor-pointer hover:text-rose-900"
                    >
                      {currentTargetUser.name}
                    </h3>
                    <span className="text-xs text-stone-400">({currentTargetUser.age})</span>
                  </div>
                  <p className="text-xs text-stone-500 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>{currentTargetUser.location}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => openProfileModal(currentTargetUser)}
                className="px-3 py-1.5 text-xs font-semibold text-rose-900 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
              >
                View Profile
              </button>
            </div>

            {/* Request Acceptance Banner if message request */}
            {currentThread.isRequest && (
              <div className="bg-amber-50 border-b border-amber-200 p-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-amber-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Message Request from {currentTargetUser.name}</span>
                  </p>
                  <p className="text-[11px] text-amber-900/80">
                    Accepting will move this to your active chats and allow mutual replies.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => declineMessageRequest(currentThread.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => {
                      if (!isEffectiveVIP) {
                        openPaymentGateway(PRICING_PLANS[0]);
                        return;
                      }
                      acceptMessageRequest(currentThread.id);
                    }}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-rose-900 hover:bg-rose-950 rounded-lg shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Request</span>
                  </button>
                </div>
              </div>
            )}

            {/* Message Stream or Locked Paywall */}
            {!isEffectiveVIP ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-stone-50/70 to-rose-50/30 space-y-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/25">
                    <Crown className="w-8 h-8 fill-stone-950" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-900 text-white flex items-center justify-center border-2 border-white">
                    <Lock className="w-3 h-3" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-xl font-bold font-editorial text-stone-900">
                    VIP Subscription Required to Read & Send Messages
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    To maintain genuine connections and protect our community, only subscribed VIP members can read received messages and send replies to {currentTargetUser.name}.
                  </p>
                </div>

                <div className="p-4 bg-white/95 border border-stone-200 rounded-2xl max-w-sm w-full text-xs text-stone-700 space-y-2 text-left shadow-2xs backdrop-blur-xs">
                  <span className="font-bold text-stone-900 block text-[11px] uppercase tracking-wide text-rose-900">
                    VIP Messaging Privileges:
                  </span>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Read all incoming message threads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Unlimited chat replies and direct conversations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>See who visited and liked your profile</span>
                  </div>
                </div>

                <button
                  onClick={() => openPaymentGateway(PRICING_PLANS[0])}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-2"
                >
                  <Crown className="w-4 h-4 fill-stone-950" />
                  <span>Subscribe to VIP (Plans from ₹499/mo)</span>
                </button>
              </div>
            ) : (
              /* Actual Message Stream */
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/20">
                {currentThread.messages.map((msg) => {
                  const isMe = msg.senderId === 'me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md sm:max-w-lg rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-rose-900 text-white rounded-br-xs shadow-xs'
                            : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs shadow-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <div
                          className={`flex items-center justify-end gap-1 text-[10px] mt-1.5 ${
                            isMe ? 'text-rose-200' : 'text-stone-400'
                          }`}
                        >
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3 text-rose-200" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-stone-100 flex items-center gap-2">
              {isEffectiveVIP ? (
                <>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Type a message to ${currentTargetUser.name}...`}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  />

                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      inputText.trim()
                        ? 'bg-rose-900 text-white hover:bg-rose-950 shadow-xs'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </>
              ) : (
                <div 
                  onClick={() => openPaymentGateway(PRICING_PLANS[0])}
                  className="flex-1 bg-stone-100/90 border border-dashed border-stone-300 rounded-2xl px-4 py-3 flex items-center justify-between text-xs text-stone-500 cursor-pointer hover:bg-amber-50 hover:border-amber-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Subscribe to VIP to send messages to {currentTargetUser.name}...</span>
                  </span>
                  <span className="font-bold text-amber-950 bg-amber-300 px-2.5 py-1 rounded-xl text-[11px] shadow-2xs">
                    Unlock VIP ₹499
                  </span>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-8 text-center bg-stone-50/20">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-900 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-editorial text-stone-800">
              Select a Conversation
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mt-1">
              Choose an active chat or review incoming message requests on the left.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
