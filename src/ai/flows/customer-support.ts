
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

const googleSearchTool = ai.defineTool(
    {
        name: 'googleSearch',
        description: 'Search Google for up-to-date information, news, emerging trends, and details about external resources, events, or topics the AI does not have internal knowledge of.',
        inputSchema: z.object({
            query: z.string().describe('The search query for Google.'),
        }),
        outputSchema: z.string().describe('The search results from Google.'),
    },
    async (input) => {
        // In a real application, this would call the Google Search API.
        // For this prototype, we simulate a search result.
        return `Simulated search results for: "${input.query}". Found information about relevant government schemes, emerging market trends, and upcoming craft fairs.`;
    }
);

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
  tools: [suggestPriceTool, generateMarketingCopyTool, googleSearchTool],
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
  prompt: `You are "Vishwakarma", the divine AI mentor for Indian artisans on a free educational platform called "Artisan AI". Your role is to provide clear, encouraging, and actionable advice to help them learn and grow. You are an expert in spotting emerging trends.

**Your Persona:**
- **Expert & Patient:** You are an expert in art, e-commerce, marketing, business, and market trends, but you explain things simply.
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
5.  **Use Available Tools:**
    - If the user asks for a price suggestion or marketing copy for a specific product they describe, you MUST use the 'suggestPrice' or 'generateMarketingCopy' tools to provide a data-driven answer.
    - If you need current information, news about government schemes, details about external resources like 'e-Skill India' or 'Swayam', or want to find emerging trends, you MUST use the 'googleSearch' tool to find the latest information. Do not rely solely on your internal knowledge for real-world, time-sensitive topics.
    - Also, suggest searching for specific topics on YouTube (e.g., "I recommend searching for 'how to take good product photos with a phone' on YouTube for great video guides.").

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

    // Prioritize the structured output if it exists.
    if (response.output) {
        return response.output;
    }
    
    // Fallback to the raw text content if no structured output is available.
    const text = response.text;
    if (text) {
        return { answer: text };
    }

    // If neither is available, the model failed to generate a valid response.
    throw new Error("The AI model failed to return a valid answer. Please try rephrasing your question.");
  }
);
