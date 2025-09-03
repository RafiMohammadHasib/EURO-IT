
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { signUp, signIn } from "@/services/auth";

const signUpSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { fullName: "", email: "", password: "" },
    });

    const signInForm = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: "", password: "" },
    });

    const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
        setLoading(true);
        try {
            await signUp(values.email, values.password, values.fullName);
            toast({
                title: "Account Created",
                description: "Please sign in to continue.",
            });
            setIsSignUp(false); // Switch to the sign-in panel
            signUpForm.reset(); // Reset the form
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Sign Up Failed",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
        setLoading(true);
        try {
            const user = await signIn(values.email, values.password);
            localStorage.setItem("user", JSON.stringify(user));
            toast({
                title: "Signed In",
                description: "You have successfully signed in.",
            });
            router.push("/ai-market-planner");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Sign In Failed",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4 light">
            <div id="container" className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <Form {...signUpForm}>
                        <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="auth-form">
                            <h1 className="text-2xl font-bold mb-4 text-foreground">Create Account</h1>
                            <FormField
                                control={signUpForm.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <div className="relative">
                                             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Full Name" {...field} className="auth-input" />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signUpForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                       <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Email" {...field} className="auth-input" />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signUpForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input type="password" placeholder="Password" {...field} className="auth-input" />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={loading} className="auth-button mt-4">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign Up
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <Form {...signInForm}>
                        <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="auth-form">
                            <h1 className="text-2xl font-bold mb-4 text-foreground">Sign In</h1>
                             <FormField
                                control={signInForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Email" {...field} className="auth-input" />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signInForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input type="password" placeholder="Password" {...field} className="auth-input" />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={loading} className="auth-button mt-4">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Overlay */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="text-2xl font-bold">Welcome Back!</h1>
                            <p className="mt-2 mb-4">To keep connected with us please login with your personal info</p>
                            <Button variant="outline" onClick={() => setIsSignUp(false)} className="ghost-button">Sign In</Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="text-2xl font-bold">Hello, Friend!</h1>
                            <p className="mt-2 mb-4">Enter your personal details and start your journey with us</p>
                            <Button variant="outline" onClick={() => setIsSignUp(true)} className="ghost-button">Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
