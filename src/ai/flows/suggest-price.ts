
'use server';
/**
 * @fileOverview Suggests a price for a product based on its name and description.
 *
 * - suggestPrice - A function that handles the price suggestion process.
 * - SuggestPriceInput - The input type for the suggestPrice function.
 * - SuggestPriceOutput - The return type for the suggestPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPriceInputSchema = z.object({
  productName: z.string().describe("The name of the product."),
  productDescription: z.string().describe("A brief description of the product."),
});
export type SuggestPriceInput = z.infer<typeof SuggestPriceInputSchema>;

const SuggestPriceOutputSchema = z.object({
    suggestedPriceRange: z.object({
        min: z.number().describe("The minimum suggested price in Indian Rupees (₹)."),
        max: z.number().describe("The maximum suggested price in Indian Rupees (₹)."),
    }),
    reasoning: z.string().describe("A brief explanation for the suggested price range, considering market demand and product attributes."),
});
export type SuggestPriceOutput = z.infer<typeof SuggestPriceOutputSchema>;

export async function suggestPrice(input: SuggestPriceInput): Promise<SuggestPriceOutput> {
  return suggestPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPricePrompt',
  input: {schema: SuggestPriceInputSchema},
  output: {schema: SuggestPriceOutputSchema},
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
  prompt: `You are an art market expert specializing in contemporary and traditional Indian crafts. Your task is to suggest a fair market price range in Indian Rupees (₹) for a product.

Consider the following factors:
- **Uniqueness and Craftsmanship:** The level of skill and uniqueness described.
- **Market Trends:** Current demand for similar types of art and craft in the Indian market.
- **Materials:** Implied quality of materials from the description.

Product Details:
- Name: {{{productName}}}
- Description: {{{productDescription}}}

Based on this, provide a suggested price range (min and max) and a short, clear reasoning for your suggestion. The price should be in whole numbers and denominated in Indian Rupees (₹).`,
});

const suggestPriceFlow = ai.defineFlow(
  {
    name: 'suggestPriceFlow',
    inputSchema: SuggestPriceInputSchema,
    outputSchema: SuggestPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
