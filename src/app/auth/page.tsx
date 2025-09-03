
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import TopBar from '@/components/layout/top-bar';
import { useToast } from "@/hooks/use-toast";
import { addUser, getUserByEmail, UserProfile } from '@/services/user';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isGx, setIsGx] = useState(false);

  const toggleForm = () => {
    setIsGx(true);
    setTimeout(() => {
      setIsGx(false);
    }, 1500);
    setIsSignUp(prev => !prev);
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const userId = await addUser(newUser);
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
    setLoading(true);
    try {
        const user = await getUserByEmail(email);
        if (user) {
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
          <div className={cn("main-container w-full max-w-4xl min-h-[40rem] rounded-2xl", { 'is-g-active': isGx })}>
            
            {/* Sign Up */}
            <div id="a-container" className={cn("form-container a-container", { "is-txl": isSignUp })}>
                <form onSubmit={handleSignUp} className="auth-form flex flex-col items-center justify-center h-full text-center px-12">
                    <h1 className="text-3xl font-bold mb-4 glow-text">Create Account</h1>
                    <div className="flex space-x-4 mb-4">
                        <Button variant="outline" size="icon" className="rounded-full social"><Facebook className="h-5 w-5" /></Button>
                        <Button variant="outline" size="icon" className="rounded-full social"><Linkedin className="h-5 w-5" /></Button>
                        <Button variant="outline" size="icon" className="rounded-full social"><Twitter className="h-5 w-5" /></Button>
                    </div>
                    <span className="text-sm text-muted-foreground mb-4">or use your email for registration</span>
                    <Input type="text" placeholder="Name" className="bg-input/50" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input type="email" placeholder="Email" className="bg-input/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" className="bg-input/50" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit" className="mt-6 form_button" disabled={loading}>
                       {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                       Sign Up
                    </Button>
                </form>
            </div>

            {/* Sign In */}
            <div id="b-container" className={cn("form-container b-container", { "is-txl": isSignUp, "is-z200": isSignUp })}>
                 <form onSubmit={handleSignIn} className="auth-form flex flex-col items-center justify-center h-full text-center px-12">
                    <h1 className="text-3xl font-bold mb-4 glow-text">Sign In</h1>
                    <div className="flex space-x-4 mb-4">
                        <Button variant="outline" size="icon" className="rounded-full social"><Facebook className="h-5 w-5" /></Button>
                        <Button variant="outline" size="icon" className="rounded-full social"><Linkedin className="h-5 w-5" /></Button>
                        <Button variant="outline" size="icon" className="rounded-full social"><Twitter className="h-5 w-5" /></Button>
                    </div>
                    <span className="text-sm text-muted-foreground mb-4">or use your account</span>
                    <Input type="email" placeholder="Email" className="bg-input/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" className="bg-input/50" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary mt-4 mb-4">Forgot your password?</a>
                    <Button type="submit" className="form_button" disabled={loading}>
                       {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                       Sign In
                    </Button>
                </form>
            </div>

            {/* Overlay */}
            <div id="switch-cnt" className={cn("switch", { 'is-txr': isSignUp, 'is-gx': isGx })}>
                <div id="switch-c1" className={cn("switch__circle", { 'is-txr': isSignUp })}></div>
                <div id="switch-c2" className={cn("switch__circle switch__circle--t", { 'is-txr': isSignUp })}></div>
                <div className={cn("switch__container", { 'is-hidden': isSignUp })}>
                    <h2 className="switch__title title">Welcome Back !</h2>
                    <p className="switch__description description">To keep connected with us please login with your personal info</p>
                    <Button type="button" className="switch__button button switch-btn" onClick={toggleForm}>SIGN UP</Button>
                </div>

                <div className={cn("switch__container", { 'is-hidden': !isSignUp })}>
                    <h2 className="switch__title title">Hello Friend !</h2>
                    <p className="switch__description description">Enter your personal details and start journey with us</p>
                    <Button type="button" className="switch__button button switch-btn" onClick={toggleForm}>SIGN IN</Button>
                </div>
            </div>

          </div>
        </main>
        <Footer />
       </div>
    </div>
  );
}
