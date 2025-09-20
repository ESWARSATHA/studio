
'use server';

import { z } from 'zod';
import { analyzeFeedback } from '@/ai/flows/analyze-feedback';

const analyzeFeedbackSchema = z.object({
  feedback: z.string().min(10, 'Feedback must be at least 10 characters.'),
});

export async function handleAnalyzeFeedback(prevState: any, formData: FormData) {
  try {
    const validatedFields = analyzeFeedbackSchema.safeParse({
      feedback: formData.get('feedback'),
    });

    if (!validatedFields.success) {
      return {
        status: 'error' as const,
        message: 'Invalid input.',
        errors: validatedFields.error.flatten().fieldErrors,
        data: null,
      };
    }

    const result = await analyzeFeedback(validatedFields.data);
    return {
      status: 'success' as const,
      message: 'Feedback analyzed successfully.',
      data: result,
      errors: null,
    };
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    return {
      status: 'error' as const,
      message: 'Failed to analyze feedback. The AI model may be temporarily unavailable.',
      data: null,
      errors: null,
    };
  }
}
