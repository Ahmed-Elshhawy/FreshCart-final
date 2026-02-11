// import NextAuth, { User } from "next-auth";
// import { UserResponse } from "./authInterfase";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface User {
//     user: UserResponse;
//     token: string;
//   }

//   interface session {
//     user: UserResponse;
//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT extends User {
//     /** OpenID ID Token */
//     idToken?: string;
//   }
// }

// src/types/next-auth.d.ts

import { UserResponse } from "./authInterfase";

declare module "next-auth" {
  interface Session {
    user: UserResponse;
    token?: string;
  }

  interface User {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: UserResponse;
    token?: string;
    idToken?: string;
  }
}
