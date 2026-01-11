import { Profile } from "@shared/mockProfiles";
import { Heart, X, Star } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onDislike: () => void;
  onSuperLike: () => void;
}

export function ProfileCard({
  profile,
  onLike,
  onDislike,
  onSuperLike,
}: ProfileCardProps) {
  return (
    <div className="w-full h-full max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="relative h-full bg-white dark:bg-card rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* Image Section */}
        <div className="relative h-2/3 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Info Section */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          {/* Name and Age */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {profile.name}, <span className="text-primary">{profile.age}</span>
            </h2>
            <p className="text-muted-foreground mt-1 flex items-center gap-1">
              📍 {profile.location}
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-foreground/80 mt-3 line-clamp-2">
            {profile.bio}
          </p>

          {/* Interests */}
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
              >
                {interest}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-around mt-6 gap-3">
            <button
              onClick={onDislike}
              className="h-14 w-14 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-all shadow-md hover:scale-110 active:scale-95"
              aria-label="Dislike"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            <button
              onClick={onSuperLike}
              className="h-16 w-16 rounded-full bg-secondary hover:bg-secondary/90 flex items-center justify-center transition-all shadow-lg hover:scale-110 active:scale-95"
              aria-label="Super Like"
            >
              <Star className="w-7 h-7 text-white fill-white" />
            </button>

            <button
              onClick={onLike}
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all shadow-md hover:scale-110 active:scale-95"
              aria-label="Like"
            >
              <Heart className="w-6 h-6 text-white fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
