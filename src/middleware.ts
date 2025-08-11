import { withAuth } from "next-auth/middleware";
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("TOKEN", token);
      // `token` is your JWT from NextAuth
      return !!token?.email && token.email.trim() !== "";
    },
  },
});

export const config = {
  matcher: ["/quizz"],
};