
"use server";
/**
 * @fileOverview An AI agent for generating marketing plans.
 * 
 * - generateMarketPlan - a function that creates a marketing plan.
 * - GenerateMarketPlanInput - The input type for the generateMarketPlan function.
 * - GenerateMarketPlanOutput - The return type for the generateMarketPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateMarketPlanInputSchema = z.object({
  businessModel: z.string().describe("The business model (e.g., B2B SaaS, DTC retail)"),
  productDescription: z.string().describe("Detailed description of the product or service."),
  industry: z.string().describe("The industry the business operates in."),
  geographicFocus: z.string().describe("The geographic focus of the marketing efforts."),
  targetCustomer: z.string().describe("A description of the ideal target customer profiles (ICP)."),
  funnelStage: z.string().describe("The primary sales funnel stage to focus on (e.g., Awareness, Conversion)."),
  budget: z.string().describe("The marketing budget."),
  timeline: z.string().describe("The timeline for the marketing plan."),
  goals: z.string().describe("The primary marketing goals."),
});
export type GenerateMarketPlanInput = z.infer<typeof GenerateMarketPlanInputSchema>;

const GenerateMarketPlanOutputSchema = z.object({
  title: z.string().describe("The title of the research paper-style marketing plan."),
  abstract: z.string().describe("A concise summary of the entire marketing plan, including objectives, methods, key findings, and primary recommendations. Formatted as a single paragraph."),
  introduction: z.string().describe("Background on the business, its product, market context, and the explicit objectives of this marketing plan. Should be a markdown formatted string."),
  audienceAnalysis: z.string().describe("Detailed analysis of the target audience segments (ICPs), including firmographics, psychographics, and key pain points. Should be a markdown formatted string with lists."),
  channelStrategy: z.string().describe("In-depth channel strategy (email, social, paid search, etc.) with specific recommendations and justifications for each audience segment. Should be a markdown formatted string with lists and tables."),
  budgetBreakdown: z.string().describe("A detailed breakdown of the proposed budget by channel, initiative, and time period. Must be a markdown table."),
  messagingFramework: z.string().describe("Core messaging and positioning recommendations, tailored for each primary audience segment. Should be a markdown formatted string with bullet points."),
  implementationTimeline: z.string().describe("A strategic timeline outlining campaign phases, key activities, and launch dates. Must be a markdown table."),
  kpiFramework: z.string().describe("A framework of Key Performance Indicators (KPIs) with specific targets and methods for tracking success. Must be a markdown table."),
  conclusion: z.string().describe("A concluding summary of the plan and final recommendations for iteration and testing. Should be a markdown formatted string."),
});
export type GenerateMarketPlanOutput = z.infer<typeof GenerateMarketPlanOutputSchema>;


export async function generateMarketPlan(input: GenerateMarketPlanInput): Promise<GenerateMarketPlanOutput> {
  return marketPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketPlanPrompt',
  input: { schema: GenerateMarketPlanInputSchema },
  output: { schema: GenerateMarketPlanOutputSchema },
  prompt: `You are a senior digital marketing strategist and analyst. Your task is to produce a comprehensive marketing plan presented in the formal style of a research paper. The output for each section must be a markdown formatted string.

Business Details:
- Business Model: {{{businessModel}}}
- Product/Service: {{{productDescription}}}
- Industry: {{{industry}}}
- Geographic Focus: {{{geographicFocus}}}
- Target Customer: {{{targetCustomer}}}
- Funnel Stage Focus: {{{funnelStage}}}
- Budget: {{{budget}}}
- Timeline: {{{timeline}}}
- Goals: {{{goals}}}

Please structure the output as a formal marketing strategy document with the following sections. Use a professional, analytical, and academic tone throughout. **Use Markdown for all formatting, including tables for budget, timeline, and KPIs, and bullet points for lists.**

1.  **Title:** A formal title for the marketing plan.
2.  **Abstract:** A brief, comprehensive summary of the plan.
3.  **Introduction:** Detail the market context, business background, and objectives.
4.  **Audience Analysis:** Provide a deep dive into the Ideal Customer Profiles (ICPs) using bullet points.
5.  **Channel Strategy:** Recommend and justify a multi-channel strategy using lists and paragraphs.
6.  **Budget Breakdown:** Provide a detailed allocation of the marketing budget **as a Markdown table**.
7.  **Messaging Framework:** Outline the core positioning and messaging using nested bullet points.
8.  **Implementation Timeline:** Present a phased timeline for execution **as a Markdown table**.
9.  **KPI Framework:** Define the key metrics and targets for measuring success **as a Markdown table**.
10. **Conclusion:** Summarize the strategic approach and next steps.

Ensure each section is well-developed, actionable, and backed by strategic reasoning based on the provided inputs.
`,
});

const marketPlanFlow = ai.defineFlow(
  {
    name: 'marketPlanFlow',
    inputSchema: GenerateMarketPlanInputSchema,
    outputSchema: GenerateMarketPlanOutputSchema,
  },
  async (input) => {
    try {
        const { output } = await prompt(input);
        if (!output) {
            throw new Error("API returned no output.");
        }
        return output;
    } catch (e: any) {
        console.error("Error in marketPlanFlow:", e);
        throw new Error(`Failed to generate marketing plan: ${e.message}`);
    }
  }
);
