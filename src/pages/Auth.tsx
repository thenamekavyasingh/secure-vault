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
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
              <Shield className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
              SecureVault
            </h1>
            <p className="text-xl text-white/90 max-w-md drop-shadow-lg">
              Your secure password manager with military-grade encryption
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <Lock className="h-6 w-6 text-white mb-2" />
              <p className="text-sm font-medium text-white">256-bit Encryption</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
              <Shield className="h-6 w-6 text-white mb-2" />
              <p className="text-sm font-medium text-white">Zero Knowledge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile branding */}
          <div className="text-center lg:hidden">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                <Shield className="h-12 w-12 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-2xl mb-2">
              SecureVault
            </h1>
            <p className="text-white/90 drop-shadow-lg">
              Your secure password manager
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-white">Welcome</CardTitle>
              <CardDescription className="text-center text-white/80">
                Sign in to your secure vault or create a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          id="signin-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          id="signin-password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-white text-gray-900 hover:bg-white/90 font-medium" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="text-white">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          id="fullname"
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="Create a password"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <PasswordStrength password={formData.password} className="mt-2" />
                    </div>
                    <Button type="submit" className="w-full bg-white text-gray-900 hover:bg-white/90 font-medium" disabled={loading}>
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