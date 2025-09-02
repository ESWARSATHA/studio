
'use server';
/**
 * @fileOverview An AI-powered customer support agent for the Artisan platform.
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
  query: z.string().describe("The user's question about the Artisan platform."),
});
export type CustomerSupportInput = z.infer<typeof CustomerSupportInputSchema>;

const CustomerSupportOutputSchema = z.object({
  answer: z.string().describe('A helpful answer to the user query.'),
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
  prompt: `You are a friendly and knowledgeable customer support agent for "Artisan", a platform that empowers local artists in India.

Your role is to provide clear, concise, and helpful answers to questions from our users (artisans).

When answering, please consider the following information about the Artisan platform:
- **Core Mission:** To connect Indian artisans directly with buyers, eliminating middlemen and ensuring they receive fair payment for their work.
- **Fees:** The platform is completely free for artisans.
- **Key Features for Artisans:**
    - **AI Image Analysis:** Upload a photo to get an instant product description and tags.
    - **Voice-to-Story:** Dictate a story about a product, and our AI refines it into a captivating narrative.
    - **Smart Analytics:** View insights on product views, ratings, and customer interactions.
    - **Marketing Hub:** Generate marketing copy, including social media posts and emails.
    - **Payments:** Secure and flexible payments via all major UPI methods and credit/debit cards.
- **Support:** For complex issues, users can always reach out to our human support team via email at help@artisan.com.

If the user asks for a price suggestion or marketing copy, use the available tools to provide the information.

User's Query: {{{query}}}

Based on this, please provide a helpful answer. If the query is complex, ambiguous, or outside the scope of your knowledge, politely advise the user to contact our support team via email.`,
});

const customerSupportFlow = ai.defineFlow(
  {
    name: 'customerSupportFlow',
    inputSchema: CustomerSupportInputSchema,
    outputSchema: CustomerSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
