import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingBubbles } from '@/components/FloatingBubbles';
import { PasswordStrength } from '@/components/ui/password-strength';

const Auth = () => {
  const { user, signUp, signIn } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    
    if (error) {
      toast({
        title: 'Signup Failed',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Account Created',
        description: 'Please check your email to confirm your account.',
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <AnimatedBackground />
      <FloatingBubbles />
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative z-10">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-8 glass-card border-white/30">
              <Shield className="h-20 w-20 text-glass-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-glass-dark">
              SecureVault
            </h1>
            <p className="text-lg md:text-xl text-glass-dark max-w-md">
              Your secure password manager with military-grade encryption
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div className="p-4 rounded-xl glass-panel">
              <Lock className="h-6 w-6 text-glass-dark mb-2" />
              <p className="text-sm font-medium text-glass-dark">256-bit Encryption</p>
            </div>
            <div className="p-4 rounded-xl glass-panel">
              <Shield className="h-6 w-6 text-glass-dark mb-2" />
              <p className="text-sm font-medium text-glass-dark">Zero Knowledge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile branding */}
          <div className="text-center lg:hidden">
            <div className="flex justify-center mb-6">
              <div className="p-4 glass-card">
                <Shield className="h-12 w-12 text-glass-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-glass-dark mb-2">
              SecureVault
            </h1>
            <p className="text-glass-dark">
              Your secure password manager
            </p>
          </div>

          <Card className="glass-card border-white/50">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-glass-dark">Welcome</CardTitle>
              <CardDescription className="text-center text-glass-dark opacity-90">
                Sign in to your secure vault or create a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="glass-panel grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" className="text-glass-dark data-[state=active]:bg-white/80">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="text-glass-dark data-[state=active]:bg-white/80">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-glass-dark">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="glass-input pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-glass-dark">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <Input
                          id="signin-password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          className="glass-input pl-10"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full glass-button font-medium" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="text-glass-dark">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <Input
                          id="fullname"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="glass-input pl-10"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-glass-dark">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="glass-input pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-glass-dark">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="Create a password"
                          className="glass-input pl-10"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <PasswordStrength password={formData.password} className="mt-2" />
                    </div>
                    <Button type="submit" className="w-full glass-button font-medium" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;