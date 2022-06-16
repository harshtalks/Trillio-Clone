import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    userId: string;
    user: {
      id: unknown;
      email: any;
      image: string | undefined;
      name: string;
      avatar: string | undefined;
      /** The user's postal address. */
      address: string;
    };
  }
}
