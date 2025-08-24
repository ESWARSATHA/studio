
'use server';

import { z } from 'zod';
import { generateMarketingCopy } from '@/ai/flows/generate-marketing-copy';

const generateCopySchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  productDescription: z.string().min(1, 'Product description is required.'),
});

export async function handleGenerateMarketingCopy(prevState: any, formData: FormData) {
  try {
    const validatedFields = generateCopySchema.safeParse({
      productName: formData.get('productName'),
      productDescription: formData.get('productDescription'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors };
    }

    const result = await generateMarketingCopy(validatedFields.data);
    return { status: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to generate marketing copy. Please try again.' };
  }
}
