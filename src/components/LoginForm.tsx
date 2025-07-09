"use client";

import type React from "react";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Image from "next/image";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { login, isLoading, error, clearError } = useAuthStore();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      email.trim() !== "" && password.trim() !== "" && validateEmail(email)
    );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (error) clearError();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const success = await login(email, password);
    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-200 to-pink-400">
      <div className="flex-1 flex items-center justify-center px-8 py-12 ">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">
              Step into our shopping metaverse for an
              <br />
              unforgettable shopping experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                isFormValid() && !isLoading
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Sign up link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Full Background Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <Image
          src="/login-bg.png"
          alt="Login Background"
          fill
          className="object-contain"
          priority
        />
        <div className="w-80 items-center h-44 absolute bottom-56 left-64 bg-opacity-64 px-4 py-2 rounded-md pt-5">
          <Image
            src="/meetusvr-logo.png"
            alt="Login Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};
