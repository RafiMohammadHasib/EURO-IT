
"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { Loader2, ArrowLeft } from "lucide-react";
import TopBar from "@/components/layout/top-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { MarketPlan } from "@/services/market-plan";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
          .replace(/\\n/g, '<br />')
          .replace(/\n/g, '<br />')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/^- (.*$)/gm, '<ul class="list-disc pl-5 mb-2"><li>$1</li></ul>')
          .replace(/<\/ul><br \/><ul/g, '<ul'),
      }}
    />
  );
};

export default function PlanDisplayPage() {
  const [plan, setPlan] = React.useState<MarketPlan | null>(null);
  const [loading, setLoading] = React.useState(true);
  const isMounted = useMounted();
  const router = useRouter();
  const params = useParams();

  React.useEffect(() => {
    if (isMounted) {
      try {
        const storedPlan = sessionStorage.getItem("currentPlan");
        if (storedPlan) {
          const parsedPlan = JSON.parse(storedPlan);
          if (parsedPlan.id === params.id) {
            setPlan(parsedPlan);
          } else {
             router.push('/profile');
          }
        } else {
          router.push("/profile");
        }
      } catch (error) {
        console.error("Failed to parse plan from sessionStorage", error);
        router.push("/profile");
      } finally {
        setLoading(false);
      }
    }
  }, [isMounted, router, params.id]);

  const renderSection = (title: string, content: string | undefined) => {
    if (!content) return null;
    return (
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <MarkdownContent content={content} />
      </section>
    );
  };
  
  if (loading || !isMounted || !plan) {
    return (
      <div className="relative flex flex-col min-h-screen bg-background items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading plan...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow pt-32">
            <div className="max-w-4xl mx-auto">
                <Button variant="outline" onClick={() => router.back()} className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Button>

                <div className="glass-card p-8 md:p-12">
                    <div className="max-w-none">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">{plan.title}</h2>
                    <div className="text-center text-sm italic mb-10 text-muted-foreground">
                        <p>A Strategic Marketing Plan</p>
                    </div>
                    
                    <div className="border-t border-b border-primary/20 py-6 my-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Abstract</h3>
                        <p className="italic text-muted-foreground whitespace-pre-line">{plan.abstract}</p>
                    </div>

                    {renderSection("1. Introduction", plan.introduction)}
                    {renderSection("2. Audience Analysis", plan.audienceAnalysis)}
                    {renderSection("3. Channel Strategy", plan.channelStrategy)}
                    {renderSection("4. Budget Breakdown", plan.budgetBreakdown)}
                    {renderSection("5. Messaging Framework", plan.messagingFramework)}
                    {renderSection("6. Implementation Timeline", plan.implementationTimeline)}
                    {renderSection("7. KPI Framework", plan.kpiFramework)}
                    {renderSection("8. Conclusion", plan.conclusion)}
                    </div>
                </div>
            </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

    