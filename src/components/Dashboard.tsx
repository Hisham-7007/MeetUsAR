"use client";

import type React from "react";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-300 flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#1a1a1d]">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 text-[#1a1a1d] hover:bg-white rounded-lg shadow"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1d]">Welcome back!</h2>
            <p className="text-[#62616b]">Here's your account information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/40 rounded-lg p-4 border border-white">
            <h3 className="text-sm font-medium text-[#62616b] uppercase tracking-wide mb-2">
              User ID
            </h3>
            <p className="text-lg font-semibold text-[#1a1a1d]">
              {user?.id || "Loading..."}
            </p>
          </div>

          <div className="bg-white/40 rounded-lg p-4 border border-white">
            <h3 className="text-sm font-medium text-[#62616b] uppercase tracking-wide mb-2">
              Name
            </h3>
            <p className="text-lg font-semibold text-[#1a1a1d]">
              {user?.name || "Loading..."}
            </p>
          </div>
        </div>

        <div className="mt-10 text-[#1a1a1d]">
          <h3 className="text-2xl font-semibold mb-4">
            Welcome to the Shopping Metaverse
          </h3>
          <p className="mb-4">
            MeetusAR is at the forefront of revolutionizing customer engagement
            and e-commerce through the power of artificial intelligence and
            virtual reality. We specialize in providing advanced AI-driven chat
            services and immersive VR events to create unparalleled interactive
            experiences for brands and their customers.
          </p>

          <h3 className="text-xl font-semibold mb-2">Our Services:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>AI-Driven Chat Services:</strong> Enhance customer
              interactions with real-time, personalized support that boosts
              satisfaction and loyalty.
            </li>
            <li>
              <strong>Immersive VR Events:</strong> Host engaging virtual
              reality events that captivate and connect with audiences.
            </li>
            <li>
              <strong>E-Commerce Integration:</strong> Seamlessly integrate our
              services with your platform to deliver a cohesive experience.
            </li>
          </ul>

          <p className="mt-4">
            At MeetusAR, we are dedicated to helping businesses transform their
            customer engagement strategies, driving growth, and fostering
            meaningful connections. Join us as we lead the way in AI and VR
            innovation.
          </p>
        </div>
      </div>
    </div>
  );
};
