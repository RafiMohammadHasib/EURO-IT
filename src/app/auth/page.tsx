
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import TopBar from '@/components/layout/top-bar';
import { useToast } from "@/hooks/use-toast";
import { addUser, getUserByEmail, UserProfile } from '@/services/user';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => setIsSignUp(prev => !prev);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "Please fill in all fields.",
      });
      return;
    }
    setLoading(true);
    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description: "An account with this email already exists.",
        });
        return;
      }

      const newUser: UserProfile = { name, email, phone: '' };
      await addUser(newUser);
      toast({
        title: "Account Created!",
        description: "You've been successfully signed up. Please sign in.",
      });
      toggleForm();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: (error as Error).message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "Please enter your email and password.",
      });
      return;
    }
    setLoading(true);
    try {
        const user = await getUserByEmail(email);
        if (user) {
            // In a real app, you would also verify the password here.
            toast({
                title: "Sign In Successful!",
                description: `Welcome back, ${user.name}!`,
            });
        } else {
            toast({
                variant: "destructive",
                title: "Sign In Failed",
                description: "No user found with that email. Please sign up first.",
            });
        }
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "Sign In Failed",
            description: (error as Error).message || "An unexpected error occurred.",
        });
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
       <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
          <div className="w-full max-w-md">
            <div className="glass-card p-8 md:p-12">
              {isSignUp ? (
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold glow-text">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Join us and start your journey.</p>
                  </div>
                  <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Button variant="link" type="button" onClick={toggleForm} className="p-0 h-auto">
                      Sign In
                    </Button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold glow-text">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2">Sign in to continue.</p>
                  </div>
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                   <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Button variant="link" type="button" onClick={toggleForm} className="p-0 h-auto">
                      Sign Up
                    </Button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </main>
        <Footer />
       </div>
    </div>
  );
}
