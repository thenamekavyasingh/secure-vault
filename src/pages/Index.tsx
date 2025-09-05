import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FloatingBubbles } from "@/components/FloatingBubbles";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      <FloatingBubbles />
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4 glass-card p-8 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-primary/10 rounded-full">
              <Shield className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-glass-white">
            SecureVault
          </h1>
          <p className="text-lg md:text-xl text-glass-white max-w-md mx-auto leading-relaxed">
            Your secure password manager with advanced encryption technology and an intuitive, modern design.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            asChild 
            size="lg" 
            className="glass-button text-lg px-8 py-6 rounded-full transition-all duration-300"
          >
            <a href="/auth" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm">
            <span className="px-3 py-1 glass-panel rounded-full text-readable">✨ Modern Design</span>
            <span className="px-3 py-1 glass-panel rounded-full text-readable">🔒 AES-256 Encrypted</span>
            <span className="px-3 py-1 glass-panel rounded-full text-readable">📱 Cross-Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
