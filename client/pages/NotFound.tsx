import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Heart, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 max-w-md px-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="inline-block animate-spin" style={{ animationDuration: "3s" }}>
          <Heart className="w-20 h-20 text-primary/40" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-bold text-foreground">
            Oops! Page Not Found
          </p>
          <p className="text-muted-foreground">
            We couldn't find the page you're looking for. It might have been
            removed or doesn't exist.
          </p>
        </div>

        <div className="space-y-3 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <p className="text-sm text-muted-foreground">
            Let's get you back to swiping! 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
