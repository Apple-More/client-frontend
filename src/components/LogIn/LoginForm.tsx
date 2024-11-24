"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load credentials from localStorage if present
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <>
      <form className="md:mt-7 mt-4" onSubmit={handleLogin}>
        <div className="email">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="username"
            type="email"
            placeholder="Username or email address *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <div className="pass mt-5 relative">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="password"
            type={showPassword ? "text" : "password"} // Toggle input type
            placeholder="Password *"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
          </button>
        </div>
        <div className="flex items-center justify-between mt-5">
          <Link
            href={"/forgot-password"}
            className="font-semibold hover:underline"
          >
            Forgot Your Password?
          </Link>
        </div>
        <div className="block-button md:mt-7 mt-4">
          <button type="submit" className="button-main bg-black">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
