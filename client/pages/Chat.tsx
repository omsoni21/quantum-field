import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import { mockConversations, Conversation, Message } from "@shared/mockChats";

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string>(conversations[0]?.id || "");
  const [messageText, setMessageText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "me",
      text: messageText,
      timestamp: new Date(),
      read: true,
    };

    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: messageText,
              lastMessageTime: new Date(),
            }
          : conv
      )
    );

    setMessageText("");
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/discover"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Messages</h1>
            <p className="text-xs text-muted-foreground">{conversations.length} conversations</p>
          </div>
          <Link to="/" className="flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </Link>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat List - Desktop */}
        <div className="hidden md:flex md:w-80 border-r border-gray-200 dark:border-gray-700 flex-col bg-white dark:bg-card">
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversationId(conversation.id)}
                className={`w-full text-left px-4 py-4 border-b border-gray-100 dark:border-gray-700 transition-colors ${
                  selectedConversationId === conversation.id
                    ? "bg-gray-50 dark:bg-gray-700/50 border-l-4 border-l-primary"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={conversation.userImage}
                      alt={conversation.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-card ${
                        conversation.isOnline ? "bg-success" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{conversation.userName}</h3>
                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                        {formatTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white dark:bg-card border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <div className="relative">
                    <img
                      src={selectedConversation.userImage}
                      alt={selectedConversation.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-card ${
                        selectedConversation.isOnline ? "bg-success" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">{selectedConversation.userName}</h2>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.isOnline ? "Active now" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <Phone className="w-5 h-5 text-foreground" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <Video className="w-5 h-5 text-foreground" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-slate-800/50">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs rounded-2xl px-4 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                        message.senderId === "me"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-700 text-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === "me"
                          ? "text-white/70"
                          : "text-muted-foreground"
                      }`}>
                        {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white dark:bg-card border-t border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="p-2 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MessageCircle className="w-16 h-16 text-primary/30 mx-auto" />
                <h2 className="text-xl font-bold text-foreground">Select a conversation</h2>
                <p className="text-muted-foreground">Choose a match to start chatting</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Chat List - Dropdown */}
        {mobileMenuOpen && selectedConversation && (
          <div className="absolute inset-0 md:hidden bg-black/50 z-50" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-white dark:bg-card h-full w-80 overflow-y-auto animate-in slide-in-from-left duration-300">
              <div className="sticky top-0 bg-white dark:bg-card border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex items-center justify-between">
                <h3 className="font-bold text-foreground">Chats</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversationId(conversation.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-4 border-b border-gray-100 dark:border-gray-700 transition-colors ${
                    selectedConversationId === conversation.id
                      ? "bg-gray-50 dark:bg-gray-700/50"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={conversation.userImage}
                      alt={conversation.userName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{conversation.userName}</h3>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
