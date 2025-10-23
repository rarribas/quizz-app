import { render, fireEvent, waitFor } from "@testing-library/react";
import {RawLoginForm} from "./LoginForm";
import { login } from "@/app/actions/auth-actions";
import { signIn } from "next-auth/react";


jest.mock("@/app/actions/auth-actions", () => ({
  login: jest.fn(),
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

describe("LoginForm", () => {
  it("shows error if missing email or password", async() => {
    (login as jest.Mock).mockImplementation(async () => ({
      errors: {
        email: "Please enter a valid email address",
        password: "Password must be at least 8 characters long",
      },
    }));
    const { getByText, getByTestId } = render(<RawLoginForm />);

    const loginButton  = getByText("Login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByTestId("error-list")).toBeInTheDocument();
      expect(getByText("Please enter a valid email address")).toBeInTheDocument();
      expect(getByText("Password must be at least 8 characters long")).toBeInTheDocument();
    });
  });

  it("Disable controls and show processing when click submit", async () => {
    (login as jest.Mock).mockResolvedValue({
      success: true,
      credentials: { email: "test@test.com", password: "12345678" },
    });

    const { getByTestId, getByText, getByLabelText } = render(<RawLoginForm />);
    const loginForm = getByTestId("login-form");

    fireEvent.submit(loginForm);

    await waitFor(() => {
      expect(getByLabelText(/password/i)).toBeDisabled();
      expect(getByLabelText(/email/i)).toBeDisabled();
      expect(getByText("Processing ...")).toBeInTheDocument();
      expect(getByTestId("button-login")).toBeDisabled();
    });
  });

  it("redirects to /quizz on successful login", async () => {
    (login as jest.Mock).mockResolvedValue({
      success: true,
      credentials: { email: "test@test.com", password: "12345678" },
    });

    (signIn as jest.Mock).mockResolvedValue({ ok: true });

    const { getByText } = render(<RawLoginForm />);

    const loginButton = getByText("Login");
    fireEvent.click(loginButton);

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