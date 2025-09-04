import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      <div className="text-center glass-card p-8 relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">404</h1>
        <p className="text-xl text-white/80 mb-4">Oops! Page not found</p>
        <a href="/" className="glass-button inline-block px-6 py-2 rounded-lg transition-colors hover:bg-white">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
