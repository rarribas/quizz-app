'use server'
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";

type ErrorsObject = {
  email?: string;
  password?: string;
};

export type SignupFormState = {
  errors?: ErrorsObject;
  credentials?: {
    email?: string;
    password?: string;
  };
  success?: boolean,
};

function validateCredetentials(email: string, password:string):ErrorsObject{
  const errors = {} as ErrorsObject;
  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  return errors;
}

export async function signup(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors = validateCredetentials(email, password);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    await createUser(email, hashedPassword);
    return {
      success: true,
      credentials: { email, password: password}
    }
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code?: number }).code === 11000
    ) {
      return {
        errors: {
          email: 'It seems this account already exists. Please choose a different email.',
        },
      };
    }

    return {
      errors: {
        email: 'Something went wrong. Please try again.',
      },
    };
  }
}

export async function login(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const errors = validateCredetentials(email, password);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    success: true,
    credentials: { email, password}
  }
}