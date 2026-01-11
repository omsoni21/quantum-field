export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  image: string;
  interests: string[];
}

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Sofia",
    age: 26,
    location: "San Francisco, CA",
    bio: "Adventure seeker, coffee lover, and aspiring photographer. Let's explore the city together!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop",
    interests: ["Photography", "Travel", "Coffee", "Hiking"],
  },
  {
    id: "2",
    name: "Emma",
    age: 24,
    location: "Los Angeles, CA",
    bio: "Artist by day, dreamer by night. Looking for someone to create memories with.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    interests: ["Art", "Music", "Fashion", "Yoga"],
  },
  {
    id: "3",
    name: "Jessica",
    age: 27,
    location: "New York, NY",
    bio: "Foodie, wine enthusiast, and book lover. Love trying new restaurants and meaningful conversations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop",
    interests: ["Food", "Wine", "Books", "Theater"],
  },
  {
    id: "4",
    name: "Maya",
    age: 25,
    location: "Austin, TX",
    bio: "Tech enthusiast and startup junkie. Let's talk ideas and dreams over coffee!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop",
    interests: ["Tech", "Startups", "Gaming", "Movies"],
  },
  {
    id: "5",
    name: "Rachel",
    age: 28,
    location: "Seattle, WA",
    bio: "Outdoor enthusiast and nature lover. Rock climbing, hiking, and camping are my passion.",
    image: "https://images.unsplash.com/photo-1517841905240-74f88aff8856?w=500&h=600&fit=crop",
    interests: ["Hiking", "Rock Climbing", "Nature", "Outdoor Sports"],
  },
  {
    id: "6",
    name: "Lisa",
    age: 26,
    location: "Chicago, IL",
    bio: "Yoga instructor and wellness advocate. Let's build a healthy, happy life together!",
    image: "https://images.unsplash.com/photo-1473123169556-658a5ac5ca89?w=500&h=600&fit=crop",
    interests: ["Yoga", "Wellness", "Fitness", "Meditation"],
  },
  {
    id: "7",
    name: "Alex",
    age: 29,
    location: "Denver, CO",
    bio: "Ski enthusiast and mountain lover. Weekend trips and outdoor adventures are my thing.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop",
    interests: ["Skiing", "Mountains", "Sports", "Travel"],
  },
  {
    id: "8",
    name: "Nicole",
    age: 25,
    location: "Miami, FL",
    bio: "Beach babe and sunset chaser. Love dancing, music, and good vibes!",
    image: "https://images.unsplash.com/photo-1519244703995-f4dc5af00d80?w=500&h=600&fit=crop",
    interests: ["Beach", "Music", "Dancing", "Parties"],
  },
];
