
'use server';

import { z } from 'zod';
import { answerQuery } from '@/ai/flows/customer-support';

const answerQuerySchema = z.object({
  query: z.string().min(1, 'Query cannot be empty.'),
});

export async function handleAnswerQuery(prevState: any, formData: FormData) {
  try {
    const validatedFields = answerQuerySchema.safeParse({
      query: formData.get('query'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors };
    }

    const result = await answerQuery(validatedFields.data);
    return { status: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to get an answer. Please try again.' };
  }
}
`