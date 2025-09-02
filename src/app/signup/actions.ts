
'use server';

import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  phone2: z.string().min(10, 'Please enter a valid second phone number.'),
  address: z.string().min(10, 'Please enter a valid address.'),
  productCategory: z.string().min(1, 'Please select a product category.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters.'),
  role: z.enum(['artisan', 'buyer'], { required_error: 'Please select a role.' }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function handleCreateAccount(prevState: any, formData: FormData) {
  try {
    const validatedFields = signupSchema.safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      phone2: formData.get('phone2'),
      address: formData.get('address'),
      productCategory: formData.get('productCategory'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      role: formData.get('role'),
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.errors.map(e => e.message).join(' ');
      return { status: 'error', message: errorMessages };
    }
    
    // In a real application, this is where you would use the Firebase Admin SDK
    // to create a user from the server-side.
    // For this prototype, we'll simulate a successful account creation.
    console.log('Simulating account creation for:', validatedFields.data.email);

    return { status: 'success', message: 'Account created successfully!' };

  } catch (error: any) {
    console.error("Overall action error:", error);
    return { status: 'error', message: 'An unexpected error occurred. Please try again.' };
  }
}
