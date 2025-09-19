
'use server';
/**
 * @fileOverview Refines an artisan's dictated story about a product into a polished narrative.
 *
 * - refineProductStory - A function that handles the story refinement process.
 * - RefineProductStoryInput - The input type for the refineProductory function.
 * - RefineProductStoryOutput - The return type for the refineProductStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineProductStoryInputSchema = z.object({
  productName: z.string().describe("The name of the product."),
  productDescription: z.string().describe("A brief description of the product."),
  voiceInput: z.string().describe("The artisan's dictated story about the product."),
});
export type RefineProductStoryInput = z.infer<typeof RefineProductStoryInputSchema>;

const RefineProductStoryOutputSchema = z.object({
  refinedStory: z.string().describe('The polished narrative of the product story.'),
});
export type RefineProductStoryOutput = z.infer<typeof RefineProductStoryOutputSchema>;

export async function refineProductStory(input: RefineProductStoryInput): Promise<RefineProductStoryOutput> {
  const {output} = await refineProductStoryFlow(input);
  if (!output) {
    throw new Error('The AI model failed to refine the story. Please try again later.');
  }
  return output;
}

const prompt = ai.definePrompt({
  name: 'refineProductStoryPrompt',
  input: {schema: RefineProductStoryInputSchema},
  output: {schema: RefineProductStoryOutputSchema},
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
  prompt: `You are an expert story teller specializing in crafting compelling product narratives for artisans.

  Your task is to refine the artisan's dictated story into a polished and engaging narrative that will captivate buyers. Use the product name and description for context.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Artisan's Story: {{{voiceInput}}}`,
});

const refineProductStoryFlow = ai.defineFlow(
  {
    name: 'refineProductStoryFlow',
    inputSchema: RefineProductStoryInputSchema,
    outputSchema: RefineProductStoryOutputSchema,
  },
  async input => {
    return await prompt(input);
  }
);
