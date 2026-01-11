import { Heart, MessageCircle, X } from "lucide-react";

interface MatchModalProps {
  isOpen: boolean;
  matchedProfile?: {
    name: string;
    image: string;
  };
  onClose: () => void;
  onChat: () => void;
  onContinue: () => void;
}

export function MatchModal({
  isOpen,
  matchedProfile,
  onClose,
  onChat,
  onContinue,
}: MatchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-card rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 overflow-hidden animate-in zoom-in-95 scale-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Confetti hearts animation */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute pointer-events-none animate-confetti"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              "--tx": `${Math.cos((i / 15) * Math.PI * 2) * 200}px`,
              "--ty": `${-Math.sin((i / 15) * Math.PI * 2) * 200}px`,
              "--rotation": `${Math.random() * 360}deg`,
            } as React.CSSProperties & {
              "--tx": string;
              "--ty": string;
              "--rotation": string;
            }}
          >
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </div>
        ))}

        {/* Content */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center animate-pulse">
            <Heart className="w-16 h-16 text-primary fill-primary mx-2" />
            <Heart className="w-16 h-16 text-primary fill-primary mx-2" />
          </div>

          <h2 className="text-3xl font-bold text-foreground mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
            It's a Match!
          </h2>

          {matchedProfile && (
            <p className="text-lg text-primary font-semibold mt-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
              You and {matchedProfile.name} like each other!
            </p>
          )}

          <p className="text-muted-foreground mt-2 text-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
            Start a conversation and see where it goes 💬
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
          <button
            onClick={onContinue}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-foreground font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all hover:scale-105 active:scale-95"
          >
            Keep Swiping
          </button>
          <button
            onClick={onChat}
            className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + var(--tx)),
              calc(-50% + var(--ty))
            ) rotate(var(--rotation));
            opacity: 0;
          }
        }

        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
