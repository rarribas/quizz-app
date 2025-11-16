'use server'
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/lib/hash";

type ErrorsObject = {
  email?: string;
  password?: string;
  userName?: string;
};

export type SignupFormState = {
  errors?: ErrorsObject;
  credentials?: {
    email?: string;
    password?: string;
    userName?: string;
  };
  success?: boolean,
};

interface MongoDuplicateKeyError {
  code: 11000;
  keyPattern?: Record<string, number>;
  keyValue?: Record<string, string>;
}

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

function isMongoDuplicateKeyError(err: unknown): err is MongoDuplicateKeyError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as Record<string, unknown>).code === 11000
  );
}

export async function signup(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userName = formData.get("userName") as string;

  const errors = validateCredetentials(email, password);

  if (!userName || userName.trim() === "") {
    errors.userName = "Username is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    await createUser(email, hashedPassword, userName);

    return {
      success: true,
      credentials: { email, password },
    };

  } catch (err: unknown) {

    // Properly typed MongoDB duplicate key error
    if (isMongoDuplicateKeyError(err)) {
      const field =
        Object.keys(err.keyPattern ?? err.keyValue ?? {})[0] ?? "email";

      return {
        errors: {
          [field]: `${field} already exists`,
        },
      };
    }

    return {
      errors: {
        email: "Something went wrong. Please try again.",
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