import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Bell, Heart, MessageSquare, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState({
    likes: true,
    messages: true,
    matches: true,
  });

  // Check initial dark mode state
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
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
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          {/* Display Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              Display
            </h2>
            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDark ? (
                    <Moon className="w-5 h-5 text-secondary" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      {isDark ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    isDark
                      ? "bg-secondary"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  role="switch"
                  aria-checked={isDark}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      isDark ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </h2>
            <div className="space-y-3">
              {[
                {
                  key: "likes" as const,
                  icon: Heart,
                  title: "Like Notifications",
                  description: "Get notified when someone likes you",
                },
                {
                  key: "matches" as const,
                  icon: Heart,
                  title: "Match Notifications",
                  description: "Get notified when you make a match",
                },
                {
                  key: "messages" as const,
                  icon: MessageSquare,
                  title: "Message Notifications",
                  description: "Get notified when you receive a message",
                },
              ].map(({ key, icon: Icon, title, description }) => (
                <div
                  key={key}
                  className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{title}</p>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleNotification(key)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        notifications[key]
                          ? "bg-success"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      role="switch"
                      aria-checked={notifications[key]}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          notifications[key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Privacy
            </h2>
            <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
              <button className="w-full text-left font-medium text-foreground hover:text-primary transition-colors">
                Privacy Policy
              </button>
              <div className="border-t border-gray-200 dark:border-gray-700" />
              <button className="w-full text-left font-medium text-foreground hover:text-primary transition-colors">
                Terms of Service
              </button>
            </div>
          </section>

          {/* Account Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Account
            </h2>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all shadow-md hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-muted-foreground">
            <p>MatchUp © 2024</p>
            <p className="mt-2">Version 1.0.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
