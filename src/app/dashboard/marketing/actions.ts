
'use server';

import { z } from 'zod';
import { generateMarketingCopy } from '@/ai/flows/generate-marketing-copy';

const generateCopySchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  productDescription: z.string().min(1, 'Product description is required.'),
});

export async function handleGenerateMarketingCopy(prevState: any, formData: FormData) {
  const validatedFields = generateCopySchema.safeParse({
    productName: formData.get('productName'),
    productDescription: formData.get('productDescription'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error' as const,
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await generateMarketingCopy(validatedFields.data);
    return {
      status: 'success' as const,
      message: 'Marketing copy generated successfully.',
      data: result,
      errors: null,
    };
  } catch (error) {
    console.error('Error generating marketing copy:', error);
    return {
      status: 'error' as const,
      message: 'Failed to generate marketing copy. The AI model may be temporarily unavailable. Please try again later.',
      data: null,
      errors: null,
    };
  }
}
