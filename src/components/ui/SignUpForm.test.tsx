import { render, fireEvent, waitFor } from "@testing-library/react";
import {RawSignUpForm} from "./SignUpForm";
import { signup } from "@/app/actions/auth-actions";
import { signIn } from "next-auth/react";


jest.mock("@/app/actions/auth-actions", () => ({
  signup: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(), // you can check calls in tests
    back: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated", // pretend user is not logged in
  })),
}));

describe("SignUpForm", () => {
  it("shows error if missing email, usernmae or password", async() => {
    (signup as jest.Mock).mockImplementation(async () => ({
      errors: {
        email: "Please enter a valid email address",
        username: "Username is required",
        password: "Password must be at least 8 characters long",
      },
    }));
    const { getByText, getByTestId } = render(<RawSignUpForm />);

    const signupButton  = getByText("Submit");
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(getByTestId("error-list")).toBeInTheDocument();
      expect(getByText("Please enter a valid email address")).toBeInTheDocument();
      expect(getByText("Username is required")).toBeInTheDocument();
      expect(getByText("Password must be at least 8 characters long")).toBeInTheDocument();
    });
  });

  it("Disable controls and show processing when click submit", async () => {
    (signup as jest.Mock).mockResolvedValue({
      success: true,
      credentials: { email: "test@test.com", userName: 'testUser', password: "12345678" },
    });

    const { getByTestId, getByText, getByLabelText } = render(<RawSignUpForm />);
    const signUpForm = getByTestId("submit-form");

    fireEvent.submit(signUpForm);

    await waitFor(() => {
      // button should be disabled
      expect(getByLabelText(/password/i)).toBeDisabled();
      expect(getByLabelText(/user name/i)).toBeDisabled();
      expect(getByLabelText(/email/i)).toBeDisabled();
      expect(getByText("Processing ...")).toBeInTheDocument();
      expect(getByTestId("button-signup")).toBeDisabled();
    });
  });

  it("redirects to /quizz on successful signup", async () => {
    (signup as jest.Mock).mockResolvedValue({
      success: true,
      credentials: { email: "test@test.com", userName: 'testUser', password: "12345678" },
    });

    (signIn as jest.Mock).mockResolvedValue({ ok: true });

    const { getByText } = render(<RawSignUpForm />);

    const signupButton = getByText("Submit");
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "test@test.com",
        password: "12345678",
        redirect: true,
        callbackUrl: "/quizz",
      });
    });
  });
})