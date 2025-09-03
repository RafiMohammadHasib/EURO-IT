
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Facebook, Linkedin, Twitter } from 'lucide-react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import TopBar from '@/components/layout/top-bar';
import { useToast } from "@/hooks/use-toast";
import { addUser, getUserByEmail, UserProfile } from '@/services/user';
import { cn } from '@/lib/utils';
import HolographicLogo from '@/components/holographic-logo';
import Link from 'next/link';

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
    <div className="relative flex flex-col min-h-screen bg-background light">
       <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
          <div className="w-full max-w-4xl lg:max-w-5xl mx-auto">
            <div className={cn("relative bg-card rounded-2xl shadow-2xl transition-all duration-700 ease-in-out overflow-hidden",
              "min-h-[520px] lg:min-h-[600px]"
            )}>
              {/* Form container */}
              <div className={cn("absolute top-0 h-full transition-all duration-700 ease-in-out",
                "left-0 w-full lg:w-1/2",
                {"lg:left-1/2": isSignUp}
              )}>
                {/* Sign In */}
                 <form onSubmit={handleSignIn} className={cn("flex flex-col justify-center items-center h-full px-4 sm:px-12 md:px-16 transition-all duration-700 ease-in-out",
                   "absolute w-full",
                   {"opacity-0 z-0": isSignUp},
                   {"opacity-100 z-10": !isSignUp}
                 )}>
                  <h1 className="text-3xl font-bold text-primary mb-4">Sign In</h1>
                   <div className="flex items-center gap-4 my-4">
                        <Button variant="outline" size="icon" className="rounded-full"><Facebook/></Button>
                        <Button variant="outline" size="icon" className="rounded-full"><Linkedin/></Button>
                        <Button variant="outline" size="icon" className="rounded-full"><Twitter/></Button>
                    </div>
                  <p className="text-muted-foreground text-sm mb-4">or use your email for login</p>
                  <Input className="bg-input border-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input className="bg-input border-none mt-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button type="submit" className="mt-6 rounded-full px-10" disabled={loading}>
                    {loading && !isSignUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>

                 {/* Sign Up */}
                 <form onSubmit={handleSignUp} className={cn("flex flex-col justify-center items-center h-full px-4 sm:px-12 md:px-16 transition-all duration-700 ease-in-out",
                   "absolute w-full",
                   {"opacity-0 z-0": !isSignUp},
                   {"opacity-100 z-10": isSignUp}
                 )}>
                  <h1 className="text-3xl font-bold text-primary mb-4">Create Account</h1>
                  <div className="flex items-center gap-4 my-4">
                        <Button variant="outline" size="icon" className="rounded-full"><Facebook/></Button>
                        <Button variant="outline" size="icon" className="rounded-full"><Linkedin/></Button>
                        <Button variant="outline" size="icon" className="rounded-full"><Twitter/></Button>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">or use your email for registration</p>
                  <Input className="bg-input border-none" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input className="bg-input border-none mt-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input className="bg-input border-none mt-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button type="submit" className="mt-6 rounded-full px-10" disabled={loading}>
                    {loading && isSignUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                  </Button>
                </form>
              </div>

              {/* Overlay container */}
              <div className={cn("absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-50 hidden lg:block",
                {"-translate-x-full rounded-r-2xl rounded-l-none": isSignUp},
                {"translate-x-0 rounded-l-2xl rounded-r-none": !isSignUp}
              )}>
                <div className={cn("relative h-full w-[200%] bg-primary text-primary-foreground transition-all duration-700 ease-in-out",
                  "left-[-100%]",
                  {"left-0": isSignUp}
                )}>
                  {/* Sign In Overlay */}
                   <div className={cn("absolute top-0 h-full w-1/2 px-10 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out",
                    "left-0",
                    {"-translate-x-[20%] opacity-0": isSignUp},
                    {"translate-x-0 opacity-100": !isSignUp}
                   )}>
                    <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-sm mb-6">To keep connected with us please login with your personal info</p>
                    <Button variant="outline" onClick={toggleForm} className="bg-transparent border-primary-foreground text-primary-foreground rounded-full px-10">Sign In</Button>
                  </div>

                  {/* Sign Up Overlay */}
                   <div className={cn("absolute top-0 h-full w-1/2 px-10 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out",
                    "right-0",
                    {"translate-x-0 opacity-100": isSignUp},
                    {"translate-x-[20%] opacity-0": !isSignUp}
                   )}>
                    <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                    <p className="text-sm mb-6">Enter your personal details and start your journey with us</p>
                    <Button variant="outline" onClick={toggleForm} className="bg-transparent border-primary-foreground text-primary-foreground rounded-full px-10">Sign Up</Button>
                  </div>
                </div>
              </div>
               {/* Mobile Toggle */}
              <div className="lg:hidden text-center py-4">
                  {isSignUp ? (
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Button variant="link" type="button" onClick={toggleForm} className="p-0 h-auto text-primary">
                        Sign In
                        </Button>
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Button variant="link" type="button" onClick={toggleForm} className="p-0 h-auto text-primary">
                        Sign Up
                        </Button>
                    </p>
                  )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
       </div>
    </div>
  );
}
