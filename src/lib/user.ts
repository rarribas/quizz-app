import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

type CreateUserResult = 
  | { success: true }
  | { success: false; error: string };

export async function createUser(
  email: string, 
  password: string
): Promise<CreateUserResult> {

  try {
    await connectToDatabase();

    const newUser = new User({ email, password });
    await newUser.save();

    return { success: true };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
    return { success: false, error: 'Failed to create user' };
  }
}
