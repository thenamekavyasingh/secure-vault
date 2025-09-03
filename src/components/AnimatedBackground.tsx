export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 animate-pulse" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-3xl animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-secondary/25 to-accent/25 rounded-full blur-2xl animate-float-medium" />
      
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
    </div>
  );
};