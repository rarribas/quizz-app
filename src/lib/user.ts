import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

export interface UserI {
  _id?: string;
  id: string;
  email: string;
  password: string;
  userName: string;
}

type UserResult = 
  | { success: true }
  | { success: false; error: string };

export async function createUser(
  email: string, 
  password: string,
  userName: string
): Promise<UserResult> {

  try {
    await connectToDatabase();

    const newUser = new User({ email, password, userName });
    await newUser.save();

    return { success: true };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
    return { success: false, error: 'Failed to create user' };
  }
}
export async function findUserByEmail(email: string):Promise<UserI | null>{
  try {
    await connectToDatabase();

    const user = await User.findOne({ email }).exec();
    return user;  
  } catch (err) {
    console.error('Error finding user:', err);
    return null; 
  }
}