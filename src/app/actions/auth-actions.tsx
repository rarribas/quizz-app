'use server'
import { createUser } from "@/lib/user";
import { signIn } from "next-auth/react";
import { hashUserPassword } from "@/lib/hash";
// import { redirect } from "next/navigation";

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

export async function signup(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {

  const rawEmail = formData.get('email');
  const rawPassword = formData.get('password')

  const errors = {} as ErrorsObject;

  if (typeof rawEmail !== 'string' || !rawEmail.includes('@')) {
    errors.email = 'Please enter a valid email address';
  }

  if (typeof rawPassword !== 'string' || rawPassword.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const email = rawEmail as string;
  const password = hashUserPassword(rawPassword as string);

  try {
    await createUser(email, password);
    return {
      success: true,
      credentials: { email, password: rawPassword as string}
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
  
  // return {
  //   success: true,
  //   credentials: { email, password }
  // }
  // redirect("/quizz")
}
