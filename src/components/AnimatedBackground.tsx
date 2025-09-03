export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background with color shifts */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-300/15 to-blue-400/10 animate-pulse" />
      
      {/* Large floating orbs with stronger colors */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/25 rounded-full blur-3xl animate-float-slow opacity-60" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/25 to-cyan-400/30 rounded-full blur-3xl animate-float-reverse opacity-50" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/35 to-purple-400/30 rounded-full blur-2xl animate-float-medium opacity-70" />
      
      {/* Additional smaller orbs for more movement */}
      <div className="absolute top-3/4 left-1/6 w-48 h-48 bg-gradient-to-r from-cyan-300/20 to-blue-300/25 rounded-full blur-xl animate-float-slow opacity-60" 
           style={{ animationDelay: '2s', animationDuration: '12s' }} />
      <div className="absolute top-1/6 right-1/6 w-56 h-56 bg-gradient-to-r from-purple-300/25 to-pink-300/20 rounded-full blur-2xl animate-float-medium opacity-50" 
           style={{ animationDelay: '4s', animationDuration: '10s' }} />
      
      {/* Moving gradient streaks */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-float-slow" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-pink-400/50 to-transparent animate-float-reverse" 
             style={{ animationDuration: '6s' }} />
      </div>
      
      {/* Glassmorphic overlay - lighter for better visibility */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />
    </div>
  );
};