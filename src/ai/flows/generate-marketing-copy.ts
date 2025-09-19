
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
  targetAudience: z.string().describe("A description of the ideal target audience for this product, including demographics and interests."),
  socialMediaPost: z.string().describe("A short, engaging social media post for Instagram or Facebook to promote the product. It should include emojis and relevant hashtags."),
  emailCopy: z.string().describe("A draft for a promotional email to send to a mailing list, with a catchy subject line and a compelling body that tells a story and encourages clicks."),
  headline: z.string().describe("A catchy headline for a social media ad (under 40 characters)."),
  body: z.string().describe("The main body text for a social media ad (around 125 characters)."),
  cta: z.string().describe("A strong call-to-action for the ad (e.g., 'Shop Now', 'Discover the Story')."),
  platformRecommendations: z.array(z.object({
    platformName: z.string().describe("The name of the recommended online platform (e.g., Amazon Karigar, Etsy India, Okhai)."),
    marketingTip: z.string().describe("A specific, actionable marketing tip for selling this product on that platform."),
  })).describe("A list of recommended Indian online platforms for selling the product, along with marketing tips."),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(input: GenerateMarketingCopyInput): Promise<GenerateMarketingCopyOutput> {
  const {output} = await generateMarketingCopyFlow(input);
  if (!output) {
    throw new Error('The AI model failed to generate marketing copy. It may be temporarily unavailable or the request could not be fulfilled. Please try again later.');
  }
  return output;
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
  prompt: `You are an expert marketing coach for Indian artisans on a free educational platform called "Artisan AI". Your goal is to teach them how to create effective marketing materials, not just to provide the materials.

Your task is to generate a comprehensive marketing plan for the following product. For each item, provide a brief "Why this works" explanation to help the artisan learn.

**Product Details:**
- **Product Name:** {{{productName}}}
- **Description:** {{{productDescription}}}

---

**Generate the following marketing assets:**

1.  **Target Audience:**
    - **Who they are:** Describe the ideal customer for this product. Be specific about their lifestyle, values, and interests.
    - **Why this works:** Explain why this audience is a good match for the product.

2.  **Engaging Social Media Post (for Instagram/Facebook):**
    - **Post Text:** Write an exciting post. Use emojis and storytelling. Include 3-5 relevant hashtags.
    - **Why this works:** Explain the strategy behind the caption and hashtag choices.

3.  **Promotional Email:**
    - **Subject Line:** Create a catchy and intriguing subject line.
    - **Email Body:** Write a short, compelling email that tells a story about the product and has a clear call to action.
    - **Why this works:** Explain why the subject line and body are effective for email marketing.

4.  **Social Media Ad (for Facebook/Instagram Ads):**
    - **Headline:** A short, powerful headline (under 40 characters).
    - **Body:** Compelling ad copy that highlights the main benefit (around 125 characters).
    - **Call-to-Action (CTA):** A direct and clear call to action.
    - **Why this works:** Explain why this combination of headline, body, and CTA is effective for a paid ad.

5.  **Platform Recommendations for Selling in India:**
    - **Platforms:** Suggest 2-3 specific Indian online marketplaces (e.g., Amazon Karigar, Flipkart Samarth, Okhai, Jaypore, Etsy India).
    - **Marketing Tip for Each:** For each platform, provide one concrete, actionable marketing tip tailored to that platform's audience and features.
    - **Why this works:** Briefly explain why these platforms are suitable for this specific product.

Keep the tone enthusiastic, authentic, and focused on the art, the artisan, and the educational purpose of the platform.`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async input => {
    return await prompt(input);
  }
);
