
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Phone } from "lucide-react";
import TopBar from "@/components/layout/top-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
});

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // In a real app, you would handle authentication here (e.g., call an API)
      // For this prototype, we'll simulate a successful login and store user data
      console.log("Form submitted:", values);
      
      // We'll use localStorage to simulate a session
      localStorage.setItem("user", JSON.stringify(values));

      toast({
        title: "Success!",
        description: "You are now logged in and can access the planner.",
      });

      // Redirect to the AI Market Planner page after a short delay
      setTimeout(() => {
        router.push("/ai-market-planner");
      }, 1000);

    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Could not sign you in. Please try again.",
      });
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow flex items-center justify-center pt-32 pb-20">
          <div className="w-full max-w-md glass-card p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold glow-text">Access the Planner</h1>
              <p className="text-muted-foreground mt-2">
                Please enter your details to continue.
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input placeholder="e.g., John Doe" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                         <div className="relative">
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input type="email" placeholder="e.g., john.doe@example.com" {...field} className="pl-10" />
                         </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input type="tel" placeholder="e.g., +8801234567890" {...field} className="pl-10" />
                         </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Proceed to Planner
                </Button>
              </form>
            </Form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
