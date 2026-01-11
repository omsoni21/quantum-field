import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileCard } from "@/components/ProfileCard";
import { MatchModal } from "@/components/MatchModal";
import { mockProfiles, Profile } from "@shared/mockProfiles";
import { Heart, MessageCircle, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Discover() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check authentication
  if (!user) {
    navigate("/login");
    return null;
  }

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);

    // Simulate 30% match rate
    if (direction === "right" && Math.random() > 0.7) {
      setMatchedProfile(currentProfile);
      setShowMatch(true);
    }

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
      setSwipeDirection(null);
    }, 600);
  };

  const handleLike = () => handleSwipe("right");
  const handleDislike = () => handleSwipe("left");
  const handleSuperLike = () => {
    setMatchedProfile(currentProfile);
    setShowMatch(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, 600);
  };

  const handleMatchClose = () => {
    setShowMatch(false);
    setMatchedProfile(null);
  };

  const handleContinueSwiping = () => {
    handleMatchClose();
  };

  const handleChat = () => {
    handleMatchClose();
    navigate("/chat");
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No more profiles!
          </h2>
          <p className="text-muted-foreground mb-6">
            Check back later for more matches
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-colors"
          >
            Refresh Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MatchUp
              </span>
            </Link>
            <div className="hidden md:block">
              <p className="text-sm text-foreground/70">Welcome, <span className="font-semibold text-foreground">{user.name}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex gap-4">
              <Link
                to="/chat"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                title="Messages"
              >
                <MessageCircle className="w-6 h-6 text-foreground" />
              </Link>
              <Link
                to="/profile"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                title="Profile"
              >
                <User className="w-6 h-6 text-foreground" />
              </Link>
              <Link
                to="/settings"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                title="Settings"
              >
                <Settings className="w-6 h-6 text-foreground" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
              <div className="absolute top-12 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  to="/chat"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Messages</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full text-left text-red-600 dark:text-red-400 border-t border-gray-200 dark:border-gray-700"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div
            key={`card-${currentIndex}`}
            className={`mb-8 transition-all duration-600 ${
              swipeDirection === "left"
                ? "transform -translate-x-96 -rotate-20 opacity-0"
                : swipeDirection === "right"
                  ? "transform translate-x-96 rotate-20 opacity-0"
                  : "transform translate-x-0 rotate-0 opacity-100"
            }`}
          >
            <div className="animate-in fade-in zoom-in-95 duration-400">
              <ProfileCard
                profile={currentProfile}
                onLike={handleLike}
                onDislike={handleDislike}
                onSuperLike={handleSuperLike}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="text-center mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-sm text-muted-foreground">
              Profile {currentIndex + 1} of {profiles.length}
            </p>
            <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-600"
                style={{
                  width: `${((currentIndex + 1) / profiles.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Match Modal */}
      <MatchModal
        isOpen={showMatch}
        matchedProfile={
          matchedProfile ? { name: matchedProfile.name, image: matchedProfile.image } : undefined
        }
        onClose={handleMatchClose}
        onChat={handleChat}
        onContinue={handleContinueSwiping}
      />
    </div>
  );
}
