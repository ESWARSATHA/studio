
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
  productCategory: z.string().describe("The category of the product (e.g., Pottery, Textiles, Woodcraft)."),
});
export type GenerateProductSuggestionsInput = z.infer<typeof GenerateProductSuggestionsInputSchema>;

const GenerateProductSuggestionsOutputSchema = z.object({
    productVariations: z.array(z.string()).describe("Suggestions for modern product variations that apply the artisan's skills to new, marketable items (e.g., 'Apply this painting style to minimalist ceramic coasters or phone cases')."),
    newDesignConcepts: z.array(z.string()).describe("Ideas for new designs, patterns, or color palettes that blend tradition with modern aesthetics (e.g., 'Develop a geometric pattern series for your Blue Pottery')."),
    targetAudienceExpansion: z.array(z.string()).describe("Recommendations for reaching new or different customer segments, including why they would be interested (e.g., 'Target eco-conscious millennials by highlighting the sustainable materials')."),
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
  prompt: `You are an expert product and marketing strategist for "Artisan AI", an educational platform that helps Indian artisans innovate and grow.

Your task is to generate creative, actionable, and modern suggestions for an artisan to expand their product line and market reach. The suggestions must be practical and respect the artisan's traditional skills while appealing to contemporary tastes.

**Product Details:**
- **Name:** {{{productName}}}
- **Description:** {{{productDescription}}}
- **Category:** {{{productCategory}}}

---

**Generate the following innovative ideas:**

1.  **Modern Product Variations (2-3 suggestions):**
    - Suggest new, practical product types where the artisan can apply their existing skills.
    - Be specific and commercial. Examples: 'Create a line of laptop sleeves using your Kalamkari textile patterns for young professionals,' or 'Apply your Madhubani painting style to minimalist ceramic coasters for modern home decor.'

2.  **New Design Concepts (2-3 suggestions):**
    - Suggest fresh design ideas that could appeal to a modern audience while respecting the craft's heritage.
    - Think about colors, patterns, and forms. Examples: 'Experiment with a monochrome or pastel color palette for your Pattachitra art to appeal to minimalist aesthetics,' or 'Develop a geometric pattern series for your Blue Pottery to attract buyers looking for contemporary decor.'

3.  **Target Audience Expansion (2-3 suggestions):**
    - Suggest new or niche customer segments the artisan could target.
    - Clearly explain *why* this new audience would be interested and *how* to reach them. Example: 'Target eco-conscious millennials by highlighting the sustainable materials and ethical production process in your social media,' or 'Collaborate with interior designers to sell your terracotta pieces for modern, earthy home decor projects.'

Keep the tone encouraging, inspiring, and business-focused. The goal is to teach the artisan how to think like an entrepreneur.`,
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
