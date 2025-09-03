
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
import { Loader2, User, Mail, Phone, KeyRound } from "lucide-react";
import TopBar from "@/components/layout/top-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});


const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
});

const SIMULATED_OTP = "123456";

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [showVerification, setShowVerification] = React.useState(false);
  const [userData, setUserData] = React.useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

   const otpForm = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onInfoSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // In a real app, you would call an API to send an OTP
    console.log("Simulating OTP send for:", values);
    setUserData(values);
    
    setTimeout(() => {
        toast({
            title: "Verification Code Sent",
            description: `An OTP has been sent to ${values.phone}. (Hint: it's ${SIMULATED_OTP})`,
        });
        setShowVerification(true);
        setLoading(false);
    }, 1000);
  }

  async function onVerifySubmit(values: z.infer<typeof OTPSchema>) {
    setLoading(true);
    if (values.pin === SIMULATED_OTP) {
        if (!userData) {
            toast({ variant: "destructive", title: "Error", description: "User data not found. Please start over." });
            setShowVerification(false);
            setLoading(false);
            return;
        }

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        toast({
            title: "Success!",
            description: "You are now logged in and can access the planner.",
        });

        // Redirect to the AI Market Planner page
        setTimeout(() => {
            router.push("/ai-market-planner");
        }, 1000);

    } else {
        toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "The code you entered is incorrect. Please try again.",
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
            {!showVerification ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold glow-text">Access the Planner</h1>
                  <p className="text-muted-foreground mt-2">
                    Please enter your details to continue.
                  </p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInfoSubmit)} className="space-y-6">
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
                      Send Verification Code
                    </Button>
                  </form>
                </Form>
              </>
            ) : (
               <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold glow-text">Verify Your Phone</h1>
                  <p className="text-muted-foreground mt-2">
                    Enter the 6-digit code we sent to your phone.
                  </p>
                </div>
                 <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(onVerifySubmit)} className="space-y-6">
                     <FormField
                      control={otpForm.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>One-Time Password</FormLabel>
                          <FormControl>
                             <div className="relative">
                               <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                               <Input placeholder="Enter 6-digit OTP" {...field} className="pl-10" />
                             </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={loading} className="w-full" size="lg">
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Verify & Proceed
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center">
                    <Button variant="link" onClick={() => { setShowVerification(false); setUserData(null); form.reset(); }} className="text-sm">
                        Go back
                    </Button>
                </div>
               </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

    