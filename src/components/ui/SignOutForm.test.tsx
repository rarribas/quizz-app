import { render, fireEvent } from "@testing-library/react";
import SignOutForm from "./SignOutForm";
import { signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("SignOutForm", () => {
  it("redirects to / on sign out", async () => {
    const {getByTestId } = render(<SignOutForm />);

    const signOutButton = getByTestId("signout-button-test");
    fireEvent.click(signOutButton);

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
  });
})
