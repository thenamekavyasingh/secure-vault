import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4 glass-card p-8 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-primary/10 rounded-full">
              <Shield className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">
            SecureVault
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your secure, beautiful password manager with pastel aesthetics and military-grade encryption.
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
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-muted/50 rounded-full">✨ Pastel Design</span>
            <span className="px-3 py-1 bg-muted/50 rounded-full">🔒 End-to-End Encrypted</span>
            <span className="px-3 py-1 bg-muted/50 rounded-full">📱 Responsive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
