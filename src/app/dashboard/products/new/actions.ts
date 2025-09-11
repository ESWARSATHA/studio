
'use server';

import { z } from 'zod';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { refineProductStory } from '@/ai/flows/refine-product-story';
import { suggestPrice } from '@/ai/flows/suggest-price';
import { generateProductImage } from '@/ai/flows/generate-product-image';

const generateDescriptionSchema = z.object({
  photoDataUri: z.string().min(1, 'Image data is required.'),
});

const refineStorySchema = z.object({
    productName: z.string().min(1, 'Product name is required.'),
    productDescription: z.string().min(1, 'Product description is required.'),
    story: z.string().min(1, 'Story cannot be empty.'),
});

const suggestPriceSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  productDescription: z.string().min(1, 'Product description is required.'),
});

const generateImageSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
});

export async function handleGenerateDescription(prevState: any, formData: FormData) {
  try {
    const validatedFields = generateDescriptionSchema.safeParse({
      photoDataUri: formData.get('photoDataUri'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors };
    }

    const result = await generateProductDescription(validatedFields.data);
    return { status: 'success', data: result, type: 'description' };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to generate description. Please try again.', type: 'description' };
  }
}

export async function handleRefineStory(prevState: any, formData: FormData) {
  try {
    const validatedFields = refineStorySchema.safeParse({
      productName: formData.get('productName'),
      productDescription: formData.get('productDescription'),
      story: formData.get('story'),
    });

     if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors, type: 'story' };
    }

    const { productName, productDescription, story } = validatedFields.data;
    const result = await refineProductStory({ productName, productDescription, voiceInput: story });
    return { status: 'success', data: result, type: 'story' };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to refine story. Please try again.', type: 'story' };
  }
}

export async function handleSuggestPrice(prevState: any, formData: FormData) {
  try {
    const validatedFields = suggestPriceSchema.safeParse({
      productName: formData.get('productName'),
      productDescription: formData.get('productDescription'),
    });

    if (!validatedFields.success) {
      return { status: 'error', message: 'Invalid input.', errors: validatedFields.error.flatten().fieldErrors, type: 'price' };
    }

    const result = await suggestPrice(validatedFields.data);
    return { status: 'success', data: result, type: 'price' };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to suggest price. Please try again.', type: 'price' };
  }
}

export async function handleGenerateImage(prevState: any, formData: FormData) {
    try {
        const validatedFields = generateImageSchema.safeParse({
            description: formData.get('description'),
        });

        if (!validatedFields.success) {
            return { status: 'error', message: 'A description is required to generate an image.', errors: validatedFields.error.flatten().fieldErrors, type: 'image' };
        }
        
        const result = await generateProductImage(validatedFields.data);
        return { status: 'success', data: result, type: 'image' };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Failed to generate image. Please try again later.', type: 'image' };
    }
}
