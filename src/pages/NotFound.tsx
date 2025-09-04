import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingBubbles } from "@/components/FloatingBubbles";

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
      <FloatingBubbles />
      <div className="text-center glass-card p-6 md:p-8 relative z-10 mx-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glass-white">404</h1>
        <p className="text-lg md:text-xl text-glass-white mb-4">Oops! Page not found</p>
        <a href="/" className="glass-button inline-block px-6 py-2 rounded-lg transition-colors hover:bg-white text-glass-dark">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
