
'use server';
/**
 * @fileOverview An AI agent for generating marketing plans.
 * 
 * - generateMarketPlan - A function that creates a marketing plan.
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
  audienceSegments: z.string().describe("Detailed audience segments and ICP definitions."),
  channelStrategy: z.string().describe("Channel strategy (email, social, paid search, etc.) with recommendations for each segment."),
  budget: z.string().describe("Budget breakdown by channel and initiative."),
  messaging: z.string().describe("Messaging and positioning recommendations per audience."),
  timeline: z.string().describe("Timeline and scheduling (campaign phases, launch dates)."),
  metrics: z.string().describe("Key performance metrics (KPIs) with targets and tracking methods."),
  recommendations: z.string().describe("Recommendations for iteration and testing."),
});
export type GenerateMarketPlanOutput = z.infer<typeof GenerateMarketPlanOutputSchema>;


export async function generateMarketPlan(input: GenerateMarketPlanInput): Promise<GenerateMarketPlanOutput> {
  return marketPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketPlanPrompt',
  input: { schema: GenerateMarketPlanInputSchema },
  output: { schema: GenerateMarketPlanOutputSchema },
  prompt: `You are a senior digital marketing strategist with a track record of building multi-channel campaigns. Your task is to create a detailed marketing plan for the provided business. 

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

Produce a structured plan covering: 
(1) audience segments and ICP definitions; 
(2) channel strategy (email, social, paid search, partnerships, etc.) with recommendations tailored to each segment; 
(3) budget breakdown by channel and initiative; 
(4) messaging and positioning recommendations per audience; 
(5) timeline and scheduling (campaign phases, launch dates); 
(6) key performance metrics with targets and tracking methods; and 
(7) recommendations for iteration and testing. 

Use a professional and collaborative tone. Follow marketing best practices. Adapt the plan based on the provided inputs. Deliver the plan in the requested structured format, ensuring each section is clearly labeled and actionable.
`,
});

const marketPlanFlow = ai.defineFlow(
  {
    name: 'marketPlanFlow',
    inputSchema: GenerateMarketPlanInputSchema,
    outputSchema: GenerateMarketPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("Failed to generate a marketing plan.");
    }
    return output;
  }
);
