"use client";

import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const LoginForm = ({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { login, isLoading, error, clearError } = useAuthStore();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = () =>
    email.trim() !== "" && password.trim() !== "" && validateEmail(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(
      !validateEmail(value) ? "Please enter a valid email address" : ""
    );
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
    if (success) onLoginSuccess();
  };

  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-300 flex justify-center items-center w-full min-h-screen px-4 sm:px-8 md:px-16">
      <div className="relative w-full max-w-7xl bg-white/30 rounded-2xl border-2 border-white backdrop-blur-md overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-16 px-6 sm:px-12 md:px-20">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-8 w-full max-w-md mx-auto"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1d]">
                Welcome back
              </h1>
              <p className="text-base md:text-lg text-[#62616b] mt-2">
                Step into our shopping metaverse
                <br />
                for an unforgettable shopping experience
              </p>
            </div>

            <div className="w-full space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#62626b]" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full pl-12 py-4 h-14 bg-white/40 border border-white text-[#62626b]"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#62626b]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pl-12 pr-12 py-4 h-14 bg-white/40 border border-white text-[#62626b]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#62626b]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="w-full py-4 bg-[#9414ff] hover:bg-[#8412e5] text-white text-base"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-[#62616b] text-sm">
              Don't have an account?{" "}
              <span className="hover:underline cursor-pointer">Sign up</span>
            </p>
            <p className="text-center text-sm text-white">
              Test Email:{" "}
              <span className="font-medium">dev.aert@gmail.com</span>
              <br />
              Password: <span className="font-medium">helloworld</span>
            </p>
          </form>
        </div>

        {/* Right side - visual design */}
        <div className="hidden lg:block lg:w-1/2 relative h-[600px] lg:h-auto">
          <Image
            src="/login-bg.png"
            alt="Design Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute w-80 h-20 bottom-32 left-10">
            <Image
              src="/meetusvr-logo.png"
              alt="MeetusVR Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
