
'use server';

import { z } from 'zod';
import { generateProductSuggestions } from '@/ai/flows/generate-product-suggestions';

const generateSuggestionsSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  productDescription: z.string().min(1, 'Product description is required.'),
  productCategory: z.string().min(1, 'Product category is required.'),
});

export async function handleGenerateSuggestions(prevState: any, formData: FormData) {
  try {
    const validatedFields = generateSuggestionsSchema.safeParse({
      productName: formData.get('productName'),
      productDescription: formData.get('productDescription'),
      productCategory: formData.get('productCategory'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors };
    }

    const result = await generateProductSuggestions(validatedFields.data);
    return { status: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to generate suggestions. Please try again.' };
  }
}
