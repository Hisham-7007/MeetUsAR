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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back!
              </h2>
              <p className="text-gray-600">Here's your account information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                User ID
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {user?.id || "Loading..."}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Name
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {user?.name || "Loading..."}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              Welcome to the Shopping Metaverse!
            </h3>
            <p className="text-purple-700">
              MeetusAR is at the forefront of revolutionizing customer
              engagement and e-commerce through the power of artificial
              intelligence and virtual reality. We specialize in providing
              advanced AI-driven chat services and immersive VR events to create
              unparalleled interactive experiences for brands and their
              customers.
            </p>

            <h3 className="text-lg font-semibold text-purple-900 mb-2 pt-4">
              Our Services:
            </h3>
            <ul className="list-disc list-inside text-purple-700 space-y-1">
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
                <strong>E-Commerce Integration:</strong> Seamlessly integrate
                our services with your platform to deliver a cohesive
                experience.
              </li>
            </ul>

            <p className="text-purple-700 mt-4">
              At MeetusAR, we are dedicated to helping businesses transform
              their customer engagement strategies, driving growth, and
              fostering meaningful connections. Join us as we lead the way in AI
              and VR innovation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
