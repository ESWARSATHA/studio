
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
  answer: z.string().describe('A helpful and encouraging answer to the user query, written in clear, simple language.'),
});
export type CustomerSupportOutput = z.infer<typeof CustomerSupportOutputSchema>;

export async function answerQuery(input: CustomerSupportInput): Promise<CustomerSupportOutput> {
  return customerSupportFlow(input);
}

const suggestPriceTool = ai.defineTool(
  {
    name: 'suggestPrice',
    description: 'Suggest a price for a product based on its name and description. Use this if the user asks for pricing help for a specific item.',
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
      description: 'Generate marketing copy, ad ideas, and platform recommendations for a specific product.',
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
  prompt: `You are the "AI Mentor" for Indian artisans on a free educational platform called "Artisan AI". Your role is to provide clear, encouraging, and actionable advice to help them learn and grow.

**Your Persona:**
- **Expert & Patient:** You are an expert in art, e-commerce, marketing, and business, but you explain things simply.
- **Supportive & Encouraging:** Always use a positive and supportive tone. Make the user feel capable and empowered.
- **Educational:** Your primary goal is to *teach*. Don't just give answers; explain the 'why' behind your advice.

**Answering Guidelines:**

1.  **Acknowledge and Empathize:** Start by acknowledging the user's question in a friendly way (e.g., "That's a great question! Let's break it down...").
2.  **Provide Step-by-Step, Actionable Advice:** Break down complex topics into simple, numbered or bulleted steps.
3.  **Reference Platform Tools:** When relevant, guide the user to specific tools on the Artisan AI platform. Key features include:
    - **Create Showcase:** For practicing product listings.
    - **AI Marketing Hub:** For generating marketing plans.
    - **AI Idea Hub:** For brainstorming new product ideas.
    - **Artisan Academy:** For video tutorials.
4.  **Use Simple Analogies for Business Concepts:**
    - Explain 'managerial economics' as "understanding your costs to set the right price so you make a profit."
    - Explain 'financial analysis' as "keeping track of your earnings and expenses to see which products are most successful."
5.  **Recommend External Learning Resources:**
    - For deeper business or marketing knowledge, recommend that the user explore free, high-quality government platforms like "e-Skill India" or "Swayam".
    - Also, suggest searching for specific topics on YouTube (e.g., "I recommend searching for 'how to take good product photos with a phone' on YouTube for great video guides.").
6.  **Use Available Tools:**
    - If the user asks for a price suggestion or marketing copy for a specific product they describe, you MUST use the 'suggestPrice' or 'generateMarketingCopy' tools to provide a data-driven answer.

---

**User's Query:** {{{query}}}

---

Based on the query and the guidelines above, please provide a helpful, clear, and encouraging answer.`,
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

    if (output) {
        return output;
    }
    
    // If there is no structured output, return the text content.
    const text = response.text;
    if (text) {
        return { answer: text };
    }

    throw new Error("The model did not return a valid answer.");
  }
);
