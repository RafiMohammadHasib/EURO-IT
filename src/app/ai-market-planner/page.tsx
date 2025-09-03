
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
import { saveMarketPlan } from "@/services/market-plan";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TopBar from "@/components/layout/top-bar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMounted } from "@/hooks/use-mounted";

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

const parseMarkdownTable = (markdown: string): { headers: string[]; rows: string[][] } | null => {
  if (!markdown) return null;
  const lines = markdown.trim().split('\n');
  if (lines.length < 2) return null;

  const tableParts = lines.map(line => line.split('|').map(cell => cell.trim()).filter(Boolean));
  const headers = tableParts[0];

  if (headers.length === 0) return null;
  
  if (lines[1].includes('---')) {
      const rows = tableParts.slice(2);
      return { headers, rows };
  }
  
  const rows = tableParts.slice(1);
  return { headers, rows };
};

const MarkdownContent = ({ content }: { content: string }) => {
  if (!content) return null;

  const tableData = parseMarkdownTable(content);

  if (tableData && tableData.headers.length > 0) {
    return (
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              {tableData.headers.map((header, index) => <TableHead key={index}>{header}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div
      className="prose prose-invert text-muted-foreground max-w-none"
      dangerouslySetInnerHTML={{
        __html: content
          .replace(/\n/g, '<br />')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/^- (.*$)/gm, '<ul class="list-disc pl-5 mb-2"><li>$1</li></ul>')
          .replace(/<\/ul><br \/><ul/g, '<ul'),
      }}
    />
  );
};


export default function AiMarketPlannerPage() {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<GenerateMarketPlanOutput | null>(null);
  const { toast } = useToast();
  const [user, setUser] = React.useState<{ fullName: string; email: string; uid: string; } | null>(null);
  const isMounted = useMounted();
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          router.push("/auth");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        router.push("/auth");
      }
    }
  }, [isMounted, router]);


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
    if (!user) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to generate a plan.",
        });
        router.push('/auth');
        return;
    }
    setLoading(true);
    setResult(null);
    try {
      const plan = await generateMarketPlan(values as GenerateMarketPlanInput);
      setResult(plan);
      if (plan) {
        const planId = await saveMarketPlan(user.uid, plan);
        toast({
          title: "Plan Saved!",
          description: `Your marketing plan has been generated and saved.`,
        });
      }
    } catch (error) {
      console.error("Error in generating or saving market plan:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate or save the marketing plan. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const renderSection = (title: string, content: string | undefined) => {
    if (!content) return null;
    return (
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <MarkdownContent content={content} />
      </section>
    );
  };
  
  if (!isMounted || !user) {
    return (
      <div className="relative flex flex-col min-h-screen bg-background items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verifying access...</p>
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
              <h1 className="text-4xl md:text-5xl font-bold glow-text">AI Market Planner</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Welcome, {user.fullName}! Enter your business details to generate a comprehensive, print-ready marketing plan.
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
                <div className="max-w-none">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">{result.title}</h2>
                  <div className="text-center text-sm italic mb-10 text-muted-foreground">
                     <p>A Strategic Marketing Plan</p>
                  </div>
                  
                  <div className="border-t border-b border-primary/20 py-6 my-8">
                     <h3 className="text-2xl font-bold text-white mb-4">Abstract</h3>
                     <p className="italic text-muted-foreground whitespace-pre-line">{result.abstract}</p>
                  </div>

                  {renderSection("1. Introduction", result.introduction)}
                  {renderSection("2. Audience Analysis", result.audienceAnalysis)}
                  {renderSection("3. Channel Strategy", result.channelStrategy)}
                  {renderSection("4. Budget Breakdown", result.budgetBreakdown)}
                  {renderSection("5. Messaging Framework", result.messagingFramework)}
                  {renderSection("6. Implementation Timeline", result.implementationTimeline)}
                  {renderSection("7. KPI Framework", result.kpiFramework)}
                  {renderSection("8. Conclusion", result.conclusion)}
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
