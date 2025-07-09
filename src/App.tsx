"use client";

import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { useAuthStore } from "./store/authStore";

type Page = "login" | "dashboard" | "loading";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("loading");
  const { checkAuthStatus, isCheckingAuth } = useAuthStore();

  // Check authentication status on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const isAuthenticated = await checkAuthStatus();

      if (isAuthenticated) {
        setCurrentPage("dashboard");
      } else {
        setCurrentPage("login");
      }
    };

    initializeAuth();
  }, [checkAuthStatus]);

  const handleLoginSuccess = () => {
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setCurrentPage("login");
  };

  // Show loading screen while checking authentication
  if (currentPage === "loading" || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {currentPage === "login" ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
