
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import TopBar from '@/components/layout/top-bar';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
       <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
            <div className={cn(
                "relative bg-card rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full transition-all duration-700 ease-in-out",
                isSignUp ? "md:min-h-[30rem]" : "md:min-h-[30rem]"
            )}>
                <div className={cn(
                    "absolute top-0 h-full transition-all duration-700 ease-in-out",
                    "w-full md:w-1/2",
                    isSignUp ? "left-0 md:left-1/2 opacity-100 z-20" : "left-0 opacity-0 z-10"
                )}>
                    <form className="bg-card h-full flex flex-col items-center justify-center px-8 sm:px-12 text-center">
                        <h1 className="text-3xl font-bold mb-4 glow-text">Create Account</h1>
                        <div className="flex space-x-4 mb-4">
                            <Button variant="outline" size="icon" className="rounded-full"><Facebook className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Linkedin className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Twitter className="h-5 w-5" /></Button>
                        </div>
                        <span className="text-sm text-muted-foreground mb-4">or use your email for registration</span>
                        <div className="w-full space-y-4">
                            <Input type="text" placeholder="Name" className="bg-input/50" />
                            <Input type="email" placeholder="Email" className="bg-input/50" />
                            <Input type="password" placeholder="Password" className="bg-input/50" />
                        </div>
                        <Button className="mt-6 rounded-full px-10">Sign Up</Button>
                    </form>
                </div>

                <div className={cn(
                    "absolute top-0 h-full transition-all duration-700 ease-in-out",
                    "w-full md:w-1/2",
                    isSignUp ? "left-0 -translate-x-full opacity-0 z-10" : "left-0 opacity-100 z-20"
                )}>
                    <form className="bg-card h-full flex flex-col items-center justify-center px-8 sm:px-12 text-center">
                        <h1 className="text-3xl font-bold mb-4 glow-text">Sign In</h1>
                        <div className="flex space-x-4 mb-4">
                            <Button variant="outline" size="icon" className="rounded-full"><Facebook className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Linkedin className="h-5 w-5" /></Button>
                            <Button variant="outline" size="icon" className="rounded-full"><Twitter className="h-5 w-5" /></Button>
                        </div>
                        <span className="text-sm text-muted-foreground mb-4">or use your account</span>
                        <div className="w-full space-y-4">
                            <Input type="email" placeholder="Email" className="bg-input/50" />
                            <Input type="password" placeholder="Password" className="bg-input/50" />
                        </div>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary mt-4 mb-4">Forgot your password?</a>
                        <Button className="rounded-full px-10">Sign In</Button>
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
