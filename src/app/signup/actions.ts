
'use server';

import { z } from 'zod';
import { auth, db, storage } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  avatar: z.instanceof(File).optional(),
});

export async function handleCreateAccount(prevState: any, formData: FormData) {
  try {
    const validatedFields = signupSchema.safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      avatar: formData.get('avatar'),
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.errors.map(e => e.message).join(' ');
      return { status: 'error', message: errorMessages };
    }
    
    const { username, email, phone, password, avatar } = validatedFields.data;

    // This is where Firebase Auth would be used on the client-side
    // For server actions, we'd typically use the Firebase Admin SDK, but we are using client SDK here
    // as an example of how one might structure this. A proper implementation would need a secure
    // server-side environment to handle authentication.
    // The code below simulates the flow but will not execute auth functions on the server.
    // It's a placeholder for client-side logic that would call these Firebase services.

    // A real server action would need to handle authentication differently, likely via the Admin SDK
    // For this example, we'll return an error indicating this limitation.
    // In a real app, the signup logic would be handled client-side with `useEffect` and state,
    // or by calling a dedicated API route.

    return { 
        status: 'error', 
        message: 'This is a mock-up. On the client, you would use Firebase SDK to create a user, upload the file, and save data.' 
    };

    /*
    // --- The following is pseudo-code for what would run on the client ---

    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Upload avatar to Firebase Storage
    let avatarUrl = '';
    if (avatar && avatar.size > 0) {
      const storageRef = ref(storage, `avatars/${user.uid}/${avatar.name}`);
      const snapshot = await uploadBytes(storageRef, avatar);
      avatarUrl = await getDownloadURL(snapshot.ref);
    }
    
    // 3. Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      username,
      email,
      phone,
      avatarUrl,
      createdAt: new Date(),
    });

    return { status: 'success', message: 'Account created successfully!' };
    */

  } catch (error: any) {
    console.error(error);
    // Provide more specific error messages
    if (error.code === 'auth/email-already-in-use') {
         return { status: 'error', message: 'This email is already registered.' };
    }
     if (error.code === 'auth/weak-password') {
         return { status: 'error', message: 'The password is too weak. Please use a stronger password.' };
    }
    return { status: 'error', message: 'An unknown error occurred. Please try again.' };
  }
}
