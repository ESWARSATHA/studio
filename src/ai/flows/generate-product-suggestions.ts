
'use server';
/**
 * @fileOverview Generates creative suggestions for a product.
 *
 * - generateProductSuggestions - A function that handles the suggestion generation process.
 * - GenerateProductSuggestionsInput - The input type for the generateProductSuggestions function.
 * - GenerateProductSuggestionsOutput - The return type for the generateProductSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductSuggestionsInputSchema = z.object({
  productName: z.string().describe("The name of the product."),
  productDescription: z.string().describe("A brief description of the product."),
  productCategory: z.string().describe("The category of the product (e.g., Pottery, Textiles)."),
});
export type GenerateProductSuggestionsInput = z.infer<typeof GenerateProductSuggestionsInputSchema>;

const GenerateProductSuggestionsOutputSchema = z.object({
    productVariations: z.array(z.string()).describe("Suggestions for modern product variations (e.g., 'Apply this painting style to phone cases')."),
    newDesignConcepts: z.array(z.string()).describe("Ideas for new designs or patterns that blend tradition with modern aesthetics."),
    targetAudienceExpansion: z.array(z.string()).describe("Recommendations for reaching new or different customer segments."),
});
export type GenerateProductSuggestionsOutput = z.infer<typeof GenerateProductSuggestionsOutputSchema>;

export async function generateProductSuggestions(input: GenerateProductSuggestionsInput): Promise<GenerateProductSuggestionsOutput> {
  return generateProductSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductSuggestionsPrompt',
  input: {schema: GenerateProductSuggestionsInputSchema},
  output: {schema: GenerateProductSuggestionsOutputSchema},
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
  prompt: `You are an expert product and marketing strategist for "Artisan", a platform that helps Indian artists sell their work.

Your task is to generate creative and actionable suggestions for an artisan to innovate and expand their market reach. The suggestions should harmonize traditional craftsmanship with modern consumer preferences.

Product Details:
- Name: {{{productName}}}
- Description: {{{productDescription}}}
- Category: {{{productCategory}}}

Based on this, please generate the following:
1.  **Product Variations:** Suggest 2-3 new product types where the artisan could apply their traditional skills. Be specific and practical (e.g., 'Apply your Madhubani painting style to minimalist ceramic coasters' or 'Create a line of laptop sleeves using your Kalamkari textile patterns').
2.  **New Design Concepts:** Suggest 2-3 fresh design ideas that could appeal to a modern audience while respecting the craft's heritage (e.g., 'Experiment with a monochrome color palette for your Pattachitra art' or 'Develop a geometric pattern series for your Blue Pottery').
3.  **Target Audience Expansion:** Suggest 2-3 new or niche customer segments the artisan could target and why (e.g., 'Target eco-conscious millennials by highlighting the sustainable materials in your woodcraft' or 'Collaborate with interior designers to sell your terracotta pieces for modern home decor').

Keep the tone encouraging, inspiring, and practical.`,
});

const generateProductSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateProductSuggestionsFlow',
    inputSchema: GenerateProductSuggestionsInputSchema,
    outputSchema: GenerateProductSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
