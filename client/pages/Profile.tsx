import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ArrowLeft, Edit2, X, Plus, Camera } from "lucide-react";

interface ProfileData {
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  photos: string[];
}

const defaultInterests = [
  "Travel",
  "Photography",
  "Music",
  "Hiking",
  "Yoga",
  "Reading",
  "Cooking",
  "Art",
  "Sports",
  "Movies",
  "Fitness",
  "Dance",
];

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "You",
    age: 26,
    bio: "Adventure seeker and coffee enthusiast",
    location: "San Francisco, CA",
    interests: ["Travel", "Photography", "Coffee"],
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-74f88aff8856?w=400&h=500&fit=crop",
    ],
  });

  const [editForm, setEditForm] = useState<ProfileData>(profile);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSaveProfile = () => {
    setProfile({
      ...editForm,
      interests: selectedInterests,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setSelectedInterests(profile.interests);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/discover"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">My Profile</h1>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {!isEditing ? (
          // View Mode
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Photos Section */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative h-64 rounded-2xl overflow-hidden shadow-lg group"
                  >
                    <img
                      src={photo}
                      alt={`Profile ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {i === 0 && (
                      <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                        Main
                      </div>
                    )}
                  </div>
                ))}
                <div className="h-64 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="text-center space-y-2">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Add more photos</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Profile Info */}
            <section className="bg-white dark:bg-card rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {profile.name}, <span className="text-primary">{profile.age}</span>
                </h2>
                <p className="text-muted-foreground mt-2">📍 {profile.location}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">About Me</h3>
                <p className="text-foreground/80">{profile.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
              {/* Name & Age */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) =>
                      setEditForm({ ...editForm, age: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your age"
                    min="18"
                    max="100"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your location"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bio
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell others about yourself"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {editForm.bio.length}/500
                </p>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  Interests
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {defaultInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                        selectedInterests.includes(interest)
                          ? "bg-secondary text-white border-secondary"
                          : "bg-gray-100 dark:bg-slate-700 text-foreground border-gray-300 dark:border-gray-600 hover:border-secondary"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Selected: {selectedInterests.length} interests
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-foreground font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
