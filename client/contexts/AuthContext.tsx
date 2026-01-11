import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  gender?: string;
  isVerified: boolean;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  verifyFace: (gender: string, photoUrl: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
    gender: "Male",
    isVerified: true,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("matchupUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    // Check if user already exists
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error("Email already registered");
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      password,
      name,
      isVerified: false,
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("matchupUser", JSON.stringify(newUser));
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    setUser(foundUser);
    localStorage.setItem("matchupUser", JSON.stringify(foundUser));
  };

  const verifyFace = async (gender: string, photoUrl: string) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    // Simulate face verification API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const updatedUser: User = {
      ...user,
      gender,
      isVerified: true,
      photoUrl,
    };

    mockUsers[mockUsers.findIndex((u) => u.id === user.id)] = updatedUser;
    setUser(updatedUser);
    localStorage.setItem("matchupUser", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("matchupUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signup,
        login,
        verifyFace,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
