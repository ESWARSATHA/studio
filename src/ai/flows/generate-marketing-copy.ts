
'use server';
/**
 * @fileOverview Generates marketing copy for a product.
 *
 * - generateMarketingCopy - A function that handles the marketing copy generation process.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  productName: z.string().describe("The name of the product."),
  productDescription: z.string().describe("A brief description of the product."),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
  targetAudience: z.string().describe("A description of the ideal target audience for this product."),
  socialMediaPost: z.string().describe("A short, engaging social media post to promote the product."),
  emailCopy: z.string().describe("A draft for a promotional email to send to a mailing list."),
  headline: z.string().describe("A catchy headline for a social media ad."),
  body: z.string().describe("The main body text for a social media ad."),
  cta: z.string().describe("A call-to-action for the ad (e.g., 'Shop Now')."),
  platformRecommendations: z.array(z.object({
    platformName: z.string().describe("The name of the recommended online platform (e.g., Amazon Karigar, Etsy India)."),
    marketingTip: z.string().describe("A specific marketing tip for selling this product on the recommended platform."),
  })).describe("A list of recommended Indian online platforms for selling the product, along with marketing tips."),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(input: GenerateMarketingCopyInput): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
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
  prompt: `You are a marketing expert for a platform called "Artisan" that helps Indian artists sell their work.

Your task is to generate marketing materials and a strategy for the following product:
- Product Name: {{{productName}}}
- Description: {{{productDescription}}}

Based on this, please generate the following:
1.  **Target Audience:** Who is the ideal customer for this product? Be specific.
2.  **Social Media Post:** Write a short, exciting post for platforms like Instagram or Facebook. Include relevant hashtags.
3.  **Email Copy:** Draft a promotional email. It should have a catchy subject line and a compelling body that encourages clicks.
4.  **Social Media Ad:**
    - **Headline:** A short, catchy headline (under 40 characters).
    - **Body:** Compelling ad copy (around 125 characters).
    - **CTA:** A direct call to action (e.g., 'Shop Now', 'Discover More').
5.  **Platform Recommendations:** Suggest 2-3 specific Indian online marketplaces or platforms (e.g., Amazon Karigar, Flipkart Samarth, Etsy India, Okhai, Jaypore) where this product would sell well. For each platform, provide one concrete marketing tip tailored to that platform (e.g., 'On Amazon Karigar, use high-quality lifestyle photos to stand out.').

Keep the tone enthusiastic, authentic, and focused on the art and the artisan.`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI model failed to generate marketing copy. It may be temporarily unavailable or the request could not be fulfilled. Please try again later.");
    }
    return output;
  }
);
