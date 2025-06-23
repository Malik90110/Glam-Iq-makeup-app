
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Mail, Lock, User, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glamorous background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-pink-100/40 to-purple-100/40"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      {/* Floating glamour elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 left-32 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse opacity-50"></div>

      <Card className="w-full max-w-md p-10 bg-white/70 backdrop-blur-lg border border-white/50 shadow-2xl rounded-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Glam IQ
          </h1>
          <p className="text-gray-600 text-lg font-medium">✨ Sign in to save your beauty looks ✨</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl">
            <TabsTrigger 
              value="signin"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all duration-300"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="signin-email" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-rose-200 focus:border-rose-400 bg-white/80 backdrop-blur-sm rounded-xl h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="signin-password" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-rose-200 focus:border-rose-400 bg-white/80 backdrop-blur-sm rounded-xl h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 rounded-xl text-lg font-medium shadow-lg border border-white/30"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="signup-name" className="flex items-center gap-2 text-gray-700 font-medium">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-rose-200 focus:border-rose-400 bg-white/80 backdrop-blur-sm rounded-xl h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="signup-email" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-rose-200 focus:border-rose-400 bg-white/80 backdrop-blur-sm rounded-xl h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="signup-password" className="flex items-center gap-2 text-gray-700 font-medium">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-rose-200 focus:border-rose-400 bg-white/80 backdrop-blur-sm rounded-xl h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 h-12 rounded-xl text-lg font-medium shadow-lg border border-white/30"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
