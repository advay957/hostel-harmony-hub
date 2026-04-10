import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  room?: string;
  block?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, User> = {
  "student@hostel.edu": {
    id: "s1",
    name: "Arjun Mehta",
    email: "student@hostel.edu",
    role: "student",
    room: "402",
    block: "B",
  },
  "admin@hostel.edu": {
    id: "a1",
    name: "Dr. Priya Sharma",
    email: "admin@hostel.edu",
    role: "admin",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem("hostel_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, _password: string, role: UserRole) => {
    await new Promise((r) => setTimeout(r, 600));
    const mockUser = MOCK_USERS[email] || {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role,
      room: role === "student" ? "101" : undefined,
      block: role === "student" ? "A" : undefined,
    };
    mockUser.role = role;
    setUser(mockUser);
    sessionStorage.setItem("hostel_user", JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("hostel_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
