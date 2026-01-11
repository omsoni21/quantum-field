import { Link } from "react-router-dom";
import { Heart, Zap, Users, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-pink-50 dark:from-slate-950 dark:via-red-950 dark:to-pink-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="inline-block animate-bounce">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MatchUp
            </span>
          </div>

          <nav className="hidden sm:flex gap-8 items-center animate-fade-in animation-delay-200">
            <a
              href="#features"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              About
            </a>
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-full transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded-full transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-6 md:px-8 py-12 md:py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in animation-delay-200">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
                Swipe. Match.{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Connect.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-md">
                Discover meaningful connections with people who share your
                interests. MatchUp makes finding your perfect match fun, easy,
                and exciting.
              </p>

              <div className="flex gap-4 pt-4">
                <Link
                  to="/discover"
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Start Swiping
                </Link>
                <button className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-full transition-all hover:scale-105 active:scale-95">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right - Hero Cards */}
            <div className="relative h-96 md:h-[500px] animate-fade-in animation-delay-400">
              {/* Floating Cards */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden animate-bounce animation-delay-1000">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-8 right-8 rounded-3xl bg-white dark:bg-card shadow-2xl border border-white/20 p-4 w-72 backdrop-blur-sm animate-bounce animation-delay-500">
                <div className="space-y-3">
                  <h3 className="font-bold text-foreground">
                    Sofia, 26{" "}
                    <span className="text-primary">
                      <Heart className="inline w-4 h-4 fill-primary" />
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Adventure seeker and coffee lover from San Francisco
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                      Travel
                    </span>
                    <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                      Coffee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 md:px-8 py-20 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Why Choose MatchUp?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience a modern way to connect with people who get you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Matches",
                  description:
                    "Get real-time notifications when someone likes you back",
                },
                {
                  icon: Users,
                  title: "Smart Profiles",
                  description: "Showcase your personality with photos and interests",
                },
                {
                  icon: Sparkles,
                  title: "Easy Messaging",
                  description: "Connect and chat with your matches instantly",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/50 dark:bg-card/50 backdrop-blur border border-white/20 hover:border-primary/50 transition-all hover:scale-105 hover:shadow-lg animate-fade-in"
                  style={{
                    animationDelay: `${i * 200}ms`,
                  }}
                >
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-8 py-20 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 md:p-16 text-center text-white space-y-6 animate-fade-in animation-delay-600">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Find Your Match?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of people finding meaningful connections every day.
              Your perfect match is just a swipe away!
            </p>
            <Link
              to="/discover"
              className="inline-block px-8 py-3 bg-white hover:bg-gray-100 text-primary font-semibold rounded-full transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Start Swiping Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-8 py-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="font-semibold text-foreground">MatchUp</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MatchUp. Find your perfect match today.
            </p>
            <nav className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}
