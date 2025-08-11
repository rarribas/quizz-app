import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';


type UserResult = 
  | { success: true }
  | { success: false; error: string };

export async function createUser(
  email: string, 
  password: string
): Promise<UserResult> {

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

// TODO: ADD Types jere
export async function findUserByEmail(email: string){
  try {
    await connectToDatabase();

    const user = await User.findOne({ email }).exec();
    return user;  // returns null if not found or user document if found
  } catch (err) {
    console.error('Error finding user:', err);
    return null; // or throw, depending on your error handling preference
  }
}