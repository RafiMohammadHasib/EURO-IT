
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { Loader2, User, Mail, Phone, Edit, Upload, History, FileText } from "lucide-react";
import TopBar from "@/components/layout/top-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMarketPlans, MarketPlan } from "@/services/market-plan";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type AppUser = {
  uid: string;
  email: string | null;
  fullName: string;
  phoneNumber: string;
};

export default function ProfilePage() {
  const [user, setUser] = React.useState<AppUser | null>(null);
  const [plans, setPlans] = React.useState<MarketPlan[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isMounted = useMounted();
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    if (isMounted) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          router.push("/auth");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        router.push("/auth");
      }
    }
  }, [isMounted, router]);

  React.useEffect(() => {
    if (user) {
      const fetchPlans = async () => {
        try {
          const userPlans = await getMarketPlans(user.uid);
          setPlans(userPlans);
        } catch (error) {
           toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch your plan history.",
          });
        } finally {
            setLoading(false);
        }
      };
      fetchPlans();
    }
  }, [user, toast]);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  if (!isMounted || !user) {
    return (
      <div className="relative flex flex-col min-h-screen bg-background items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow pt-32">
          <div className="section-container">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold glow-text">My Profile</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Manage your account settings and view your generated content.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
              {/* Left column for profile details */}
              <div className="lg:col-span-1 space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                       <User className="w-6 h-6 text-primary" />
                       Profile Information
                    </CardTitle>
                    <CardDescription>Your personal details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-center flex-col space-y-4">
                        <Avatar className="w-24 h-24 text-4xl">
                           <AvatarImage src="/placeholder-avatar.png" alt={user.fullName} />
                           <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                        </Avatar>
                         <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Photo
                         </Button>
                      </div>
                    <div className="flex items-center gap-3 pt-4">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <span>{user.fullName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <span>{user.phoneNumber}</span>
                    </div>
                     <Button className="w-full mt-4">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                     </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right column for plan history */}
              <div className="lg:col-span-2">
                 <Card className="glass-card">
                   <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="w-6 h-6 text-primary" />
                        Plan History
                    </CardTitle>
                    <CardDescription>All your previously generated marketing plans.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                         <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                         </div>
                    ) : plans.length > 0 ? (
                        <div className="space-y-4">
                            {plans.map(plan => (
                                <div key={plan.id} className="flex items-center justify-between p-4 rounded-lg border bg-background/50 hover:bg-accent/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <FileText className="w-6 h-6 text-primary" />
                                        <div>
                                            <p className="font-semibold text-foreground">{plan.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Created on {format(plan.createdAt, "MMMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                           <p>You haven't generated any marketing plans yet.</p>
                           <Button asChild variant="link" className="mt-2">
                             <Link href="/ai-market-planner">Create Your First Plan</Link>
                           </Button>
                        </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
