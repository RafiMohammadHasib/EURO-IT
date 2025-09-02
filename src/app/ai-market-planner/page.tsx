
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { generateMarketPlan, GenerateMarketPlanInput, GenerateMarketPlanOutput } from "@/ai/flows/market-plan-flow";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TopBar from "@/components/layout/top-bar";

const formSchema = z.object({
  businessModel: z.string().min(1, "Business model is required."),
  productDescription: z.string().min(1, "Product/service description is required."),
  industry: z.string().min(1, "Industry is required."),
  geographicFocus: z.string().min(1, "Geographic focus is required."),
  targetCustomer: z.string().min(1, "Target customer profile is required."),
  funnelStage: z.string().min(1, "Sales funnel stage is required."),
  budget: z.string().min(1, "Budget is required."),
  timeline: z.string().min(1, "Timeline is required."),
  goals: z.string().min(1, "Marketing goals are required."),
});

export default function AiMarketPlannerPage() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<GenerateMarketPlanOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessModel: "",
      productDescription: "",
      industry: "",
      geographicFocus: "Bangladesh",
      targetCustomer: "",
      funnelStage: "Awareness",
      budget: "",
      timeline: "",
      goals: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const plan = await generateMarketPlan(values as GenerateMarketPlanInput);
      setResult(plan);
    } catch (error) {
      console.error("Error generating market plan:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate marketing plan. Please try again.",
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
        <main className="px-4 sm:px-6 lg:px-8 flex-grow pt-32">
          <div className="section-container">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold glow-text">AI Market Planner</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Enter your business details to generate a comprehensive marketing plan.
              </p>
            </div>

            <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="businessModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a business model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="B2B SaaS">B2B SaaS</SelectItem>
                              <SelectItem value="DTC Retail">DTC Retail</SelectItem>
                              <SelectItem value="B2C Service">B2C Service</SelectItem>
                              <SelectItem value="Marketplace">Marketplace</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., E-commerce, Fintech" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product/Service Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your product or service in detail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="geographicFocus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Geographic Focus</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Bangladesh, Dhaka" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="funnelStage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Sales Funnel Stage</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a funnel stage" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Awareness">Awareness</SelectItem>
                              <SelectItem value="Consideration">Consideration</SelectItem>
                              <SelectItem value="Conversion">Conversion</SelectItem>
                              <SelectItem value="Loyalty">Loyalty</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="targetCustomer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Customer Profile (ICP)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your ideal customer profile (demographics, pain points, etc.)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-8">
                     <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marketing Budget</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 50,000 BDT / month" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Next 3 months" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                   <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Marketing Goals</FormLabel>
                          <FormControl>
                            <Textarea placeholder="e.g., Increase brand awareness, generate 100 new leads" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  <Button type="submit" disabled={loading} size="lg" className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate My Marketing Plan
                  </Button>
                </form>
              </Form>
            </div>

            {loading && (
                <div className="mt-12 text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">Generating your custom marketing plan... this may take a moment.</p>
                </div>
            )}

            {result && (
              <div className="mt-12 max-w-4xl mx-auto glass-card p-8 md:p-12">
                <h2 className="text-3xl font-bold glow-text mb-8">Your Custom Marketing Plan</h2>
                <div className="prose prose-invert text-muted-foreground max-w-none space-y-6">
                  <section>
                    <h3 className="text-xl font-bold text-white">1. Audience Segments & ICP</h3>
                    <p>{result.audienceSegments}</p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-white">2. Channel Strategy</h3>
                    <p>{result.channelStrategy}</p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-white">3. Budget Breakdown</h3>
                    <p>{result.budget}</p>
                  </section>
                   <section>
                    <h3 className="text-xl font-bold text-white">4. Messaging & Positioning</h3>
                    <p>{result.messaging}</p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-white">5. Timeline & Scheduling</h3>
                    <p>{result.timeline}</p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-white">6. Key Performance Metrics (KPIs)</h3>
                    <p>{result.metrics}</p>
                  </section>
                  <section>
                    <h3 className="text-xl font-bold text-white">7. Recommendations</h3>
                    <p>{result.recommendations}</p>
                  </section>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
