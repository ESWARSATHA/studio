
'use server';
/**
 * @fileOverview An AI-powered customer support agent and mentor for artisans.
 *
 * - answerQuery - A function that takes a user's query and returns a helpful answer.
 * - CustomerSupportInput - The input type for the answerQuery function.
 * - CustomerSupportOutput - The return type for the answerQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {generateMarketingCopy} from './generate-marketing-copy';
import {suggestPrice} from './suggest-price';

const CustomerSupportInputSchema = z.object({
  query: z.string().describe("The user's question about the Artisan platform, marketing, business, or other topics."),
});
export type CustomerSupportInput = z.infer<typeof CustomerSupportInputSchema>;

const CustomerSupportOutputSchema = z.object({
  answer: z.string().describe('A helpful and encouraging answer to the user query.'),
});
export type CustomerSupportOutput = z.infer<typeof CustomerSupportOutputSchema>;

export async function answerQuery(input: CustomerSupportInput): Promise<CustomerSupportOutput> {
  return customerSupportFlow(input);
}

const suggestPriceTool = ai.defineTool(
  {
    name: 'suggestPrice',
    description: 'Suggest a price for a product based on its name and description.',
    inputSchema: z.object({
        productName: z.string(),
        productDescription: z.string(),
    }),
    outputSchema: z.any(),
  },
  async (input) => suggestPrice(input)
);

const generateMarketingCopyTool = ai.defineTool(
  {
      name: 'generateMarketingCopy',
      description: 'Generate marketing copy for a product.',
      inputSchema: z.object({
          productName: z.string(),
          productDescription: z.string(),
      }),
      outputSchema: z.any(),
  },
  async (input) => generateMarketingCopy(input)
);

const prompt = ai.definePrompt({
  name: 'customerSupportPrompt',
  input: {schema: CustomerSupportInputSchema},
  output: {schema: CustomerSupportOutputSchema},
  tools: [suggestPriceTool, generateMarketingCopyTool],
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
  prompt: `You are an expert, friendly, and encouraging mentor for local Indian artisans.

Your role is to provide clear, concise, and actionable advice to help them grow their business and skills. You are an expert in art, marketing, business, and education.

When answering, please consider the following:
- **Core Mission:** Your primary goal is to empower artisans by teaching them.
- **Tone:** Always be encouraging, patient, and supportive. Break down complex topics into simple, easy-to-understand steps.
- **Platform Information:** You can answer questions about the "Artisan" platform. Key features include AI-powered tools for descriptions, stories, marketing, and analytics. The platform is for learning and showcasing, not direct sales.
- **Marketing and Sales Strategy:**
    - Explain how to use various platforms (like Instagram, Facebook, Etsy, local markets) to market their products.
    - Provide tips on creating engaging content, taking good photos, and writing compelling stories.
- **Business Education:**
    - Explain the importance of concepts like 'managerial economics' (e.g., "understanding your costs and setting the right price") and 'financial analysis' (e.g., "keeping track of your earnings and expenses to see what's profitable"). Use simple analogies.
    - When asked about these topics, suggest that the user learn more from free, high-quality online resources. Recommend specific government platforms like "e-Skill India" or "Swayam", and also suggest searching for specific topics on YouTube (e.g., "search for 'basic business skills for artists' on YouTube").
- **Tools:** If the user asks for a price suggestion or marketing copy for a specific product, use the available tools to provide the information.

User's Query: {{{query}}}

Based on this, please provide a helpful and encouraging answer.`,
});

const customerSupportFlow = ai.defineFlow(
  {
    name: 'customerSupportFlow',
    inputSchema: CustomerSupportInputSchema,
    outputSchema: CustomerSupportOutputSchema,
  },
  async (input) => {
    const response = await prompt(input);
    const output = response.output;
    if (!output) {
      throw new Error("The model did not return an answer.");
    }
    return output;
  }
);
