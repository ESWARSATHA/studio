
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
