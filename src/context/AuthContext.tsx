"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { setCookie, destroyCookie } from "nookies"; // For cookie-based auth
import { loginService } from "@/services/LoginServices";
import jwt from "jsonwebtoken";
import { User } from "@/type/UserType";
import { toast } from "react-toastify";

// Define the structure of the AuthContext
export interface AuthContextType {
  user: User | undefined; // Undefined if not logged in
  login: (email: string, password: string) => Promise<void>; // Login function
  logout: () => void; // Logout function
  isAuthenticated: boolean; // Whether the user is logged in
  loading: boolean; // Whether authentication status is being determined
}

// Props for AuthProvider
export interface AuthProviderProps {
  children: ReactNode; // Children to be wrapped by the provider
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(); // Current user state
  const [loading, setLoading] = useState<boolean>(true); // Loading state for auth status
  const router = useRouter();
  const isAuthenticated = !!user; // Derived state for authentication

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);

      const accessToken = response.data.data.accessToken;
      localStorage.setItem("jwt_token", accessToken);

      const decoded = jwt.decode(accessToken);

      if (decoded && typeof decoded === "object" && "user" in decoded) {
        setUser(decoded.user as User);
        setCookie(null, "authToken", accessToken, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        toast.success("Login successfully");
        router.push("/");
      } else {
        throw new Error("User object missing in decoded token.");
      }
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Error during login:", error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    destroyCookie(null, "authToken", { path: "/" });
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  // Retrieve stored user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken) {
      try {
        const decoded = jwt.decode(storedToken);

        if (decoded && typeof decoded === "object" && "user" in decoded) {
          setUser(decoded.user as User);
        } else {
          console.error("User object missing in decoded token.");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setLoading(false); // Ensure loading is false after processing
  }, []);

  // Store user in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
