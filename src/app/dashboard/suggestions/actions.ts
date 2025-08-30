
'use server';

import { z } from 'zod';
import { analyzeFeedback } from '@/ai/flows/analyze-feedback';

const analyzeFeedbackSchema = z.object({
  feedback: z.string().min(1, 'Feedback cannot be empty.'),
});

export async function handleAnalyzeFeedback(prevState: any, formData: FormData) {
  try {
    const validatedFields = analyzeFeedbackSchema.safeParse({
      feedback: formData.get('feedback'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors };
    }

    const result = await analyzeFeedback(validatedFields.data);
    return { status: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to analyze feedback. Please try again.' };
  }
}
