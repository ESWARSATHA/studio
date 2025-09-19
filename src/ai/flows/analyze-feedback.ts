
'use server';
/**
 * @fileOverview Analyzes customer feedback using AI.
 *
 * - analyzeFeedback - A function that takes customer feedback and returns an analysis.
 * - AnalyzeFeedbackInput - The input type for the analyzeFeedback function.
 * - AnalyzeFeedbackOutput - The return type for the analyzeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFeedbackInputSchema = z.object({
  feedback: z.string().describe("The customer's feedback message."),
});
export type AnalyzeFeedbackInput = z.infer<typeof AnalyzeFeedbackInputSchema>;

const AnalyzeFeedbackOutputSchema = z.object({
  category: z.enum(["Bug Report", "Feature Request", "Praise", "General Feedback"]).describe("The category of the feedback."),
  summary: z.string().describe("A concise summary of the feedback."),
  sentiment: z.enum(["Positive", "Negative", "Neutral"]).describe("The sentiment of the feedback."),
});
export type AnalyzeFeedbackOutput = z.infer<typeof AnalyzeFeedbackOutputSchema>;

export async function analyzeFeedback(input: AnalyzeFeedbackInput): Promise<AnalyzeFeedbackOutput> {
  const {output} = await analyzeFeedbackFlow(input);
  if (!output) {
    throw new Error('The AI model failed to analyze the feedback. Please try again later.');
  }
  return output;
}

const prompt = ai.definePrompt({
  name: 'analyzeFeedbackPrompt',
  input: {schema: AnalyzeFeedbackInputSchema},
  output: {schema: AnalyzeFeedbackOutputSchema},
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
  prompt: `You are an expert at analyzing customer feedback.

Your task is to analyze the following feedback, categorize it, summarize it, and determine its sentiment.

Feedback: {{{feedback}}}

Based on this, please provide the following:
1.  **Category:** Classify the feedback as one of: "Bug Report", "Feature Request", "Praise", "General Feedback".
2.  **Summary:** Provide a one-sentence summary of the core message.
3.  **Sentiment:** Determine if the sentiment is "Positive", "Negative", or "Neutral".`,
});

const analyzeFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeFeedbackFlow',
    inputSchema: AnalyzeFeedbackInputSchema,
    outputSchema: AnalyzeFeedbackOutputSchema,
  },
  async input => {
    return await prompt(input);
  }
);
