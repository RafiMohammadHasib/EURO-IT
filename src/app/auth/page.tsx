
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import TopBar from '@/components/layout/top-bar';
import { useToast } from "@/hooks/use-toast";
import { addUser, getUserByEmail, UserProfile } from '@/services/user';


export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For now, we're not implementing phone verification, so phone can be empty
      const newUser: UserProfile = { name, email, phone: '' };
      const userId = await addUser(newUser);
      toast({
        title: "Account Created!",
        description: "You've been successfully signed up.",
      });
      // Here you would typically handle user session, e.g., redirect to a dashboard
      console.log("New user created with ID:", userId);
      setIsSignUp(false); // Switch to sign-in view after successful sign-up
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
    setLoading(true);
    try {
        const user = await getUserByEmail(email);
        if (user) {
            // NOTE: Password check is not implemented. This is for demonstration.
            toast({
                title: "Sign In Successful!",
                description: `Welcome back, ${user.name}!`,
            });
            // Here you would redirect or manage session
        } else {
            toast({
                variant: "destructive",
                title: "Sign In Failed",
                description: "No user found with that email.",
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
            <div className={cn(
                "relative glass-card max-w-4xl w-full transition-all duration-700 ease-in-out rounded-2xl overflow-hidden",
                isSignUp ? "md:min-h-[30rem]" : "md:min-h-[30rem]"
            )}>
                <div className={cn(
                    "absolute top-0 h-full transition-all duration-700 ease-in-out",
                    "w-full md:w-1/2",
                    isSignUp ? "left-0 md:left-1/2 opacity-100 z-20" : "left-0 opacity-0 z-10"
                )}>
                    <form onSubmit={handleSignUp} className="bg-transparent h-full flex flex-col items-center justify-center px-8 sm:px-12 text-center">
                        <h1 className="text-3xl font-bold mb-4 glow-text">Create Account</h1>
                        <div className="flex space-x-4 mb-4">
                            <Button variant="outline" size="icon" className="rounded-full"><Facebook className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Linkedin className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Twitter className="h-5 w-5" /></Button>
                        </div>
                        <span className="text-sm text-muted-foreground mb-4">or use your email for registration</span>
                        <div className="w-full space-y-4">
                            <Input type="text" placeholder="Name" className="bg-input/50" value={name} onChange={(e) => setName(e.target.value)} required />
                            <Input type="email" placeholder="Email" className="bg-input/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <Input type="password" placeholder="Password" className="bg-input/50" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="mt-6 rounded-full px-10" disabled={loading}>
                           {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                           Sign Up
                        </Button>
                    </form>
                </div>

                <div className={cn(
                    "absolute top-0 h-full transition-all duration-700 ease-in-out",
                    "w-full md:w-1/2",
                    isSignUp ? "left-0 -translate-x-full opacity-0 z-10" : "left-0 opacity-100 z-20"
                )}>
                    <form onSubmit={handleSignIn} className="bg-transparent h-full flex flex-col items-center justify-center px-8 sm:px-12 text-center">
                        <h1 className="text-3xl font-bold mb-4 glow-text">Sign In</h1>
                        <div className="flex space-x-4 mb-4">
                            <Button variant="outline" size="icon" className="rounded-full"><Facebook className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Linkedin className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Twitter className="h-5 w-5" /></Button>
                        </div>
                        <span className="text-sm text-muted-foreground mb-4">or use your account</span>
                        <div className="w-full space-y-4">
                            <Input type="email" placeholder="Email" className="bg-input/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <Input type="password" placeholder="Password" className="bg-input/50" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary mt-4 mb-4">Forgot your password?</a>
                        <Button type="submit" className="rounded-full px-10" disabled={loading}>
                           {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                           Sign In
                        </Button>
                    </form>
                </div>

                <div className={cn(
                    "absolute top-0 left-0 md:left-1/2 w-full md:w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out rounded-l-2xl z-50",
                    isSignUp ? "md:-translate-x-full rounded-r-2xl md:rounded-l-none" : ""
                )}>
                    <div className="bg-primary h-full text-primary-foreground relative from-primary to-primary/80 bg-gradient-to-br flex flex-col items-center justify-center px-8 text-center">
                        <div className={cn(
                            "absolute top-0 h-full w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out",
                            isSignUp ? "left-0" : "-left-full"
                        )}>
                            <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
                            <p className="text-sm mb-6 max-w-xs">To keep connected with us please login with your personal info</p>
                            <Button variant="outline" className="rounded-full px-10 text-primary" onClick={() => setIsSignUp(false)}>Sign In</Button>
                        </div>
                         <div className={cn(
                            "absolute top-0 h-full w-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out",
                             isSignUp ? "right-full" : "right-0"
                        )}>
                            <h1 className="text-4xl font-bold mb-2">Hello, Friend!</h1>
                            <p className="text-sm mb-6 max-w-xs">Enter your personal details and start your journey with us</p>
                            <Button variant="outline" className="rounded-full px-10 text-primary" onClick={() => setIsSignUp(true)}>Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
       </div>
    </div>
  );
}
