// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { signIn } from "next-auth/react";
// import { email } from "zod";
// import { failedLogin, successLogin } from "./app/types/authInterfase";
// import { error } from "console";

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         //call Api
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API}auth/signin`,
//           {
//             method: "post",
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//             headers: {
//               "Content-type": "application/json",
//             },
//           },
//         );

//         const payload: failedLogin | successLogin = await response.json();
//         console.log(payload);

//         if ("token" in payload) {
//           return {
//             id: payload.user.email,
//             user: payload.user,
//             token: payload.token,
//           };
//         } else {
//           throw new Error("Erorr......");
//         }
//       },
//     }),
//   ],
//   //encrypted
//   callbacks: {
//     jwt: ({ token, user }) => {
//       if (user) {
//         token.user = user.user;
//         token.token = user.token;
//       }

//       return token;
//     },
//     session: ({ session, token }) => {
//       session.user = token.user;

//       return session;
//     },
//   },
// };
// .................
//auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { failedLogin, successLogin } from "./app/types/authInterfase";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials");
            return null;
          }

          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          console.log("Login response status:", res.status);

          const text = await res.text();
          console.log("Login response body:", text);

          let payload: failedLogin | successLogin;
          try {
            payload = JSON.parse(text);
          } catch (err) {
            console.error("Failed to parse JSON:", err);
            return null;
          }

          if ("token" in payload && payload.token) {
            console.log("Login successful, token:", payload.token);
            return {
              id: payload.user.email,
              user: payload.user,
              token: payload.token,
            };
          }

          console.error("Login failed, payload:", payload);
          return null;
        } catch (err: any) {
          console.error("Error in authorize:", err.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user!;
        token.token = user.token!;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = token.user;
      }

      session.token = token.token ?? undefined;
      return session;
    },
  },

  debug: true,
};

export default NextAuth(authOptions);

// ..............
// //useSession ..client(navbar)
// //  ,getSession, getServerSession
// .............
// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { signIn } from "next-auth/react";
// import { email } from "zod";
// import { failedLogin, successLogin } from "./app/types/authInterfase";
// import { error } from "console";

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         //call Api
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API}auth/signin`,
//           {
//             method: "post",
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//             headers: {
//               "Content-type": "application/json",
//             },
//           },
//         );

//         const payload: failedLogin | successLogin = await response.json();
//         console.log(payload);

//         if ("token" in payload) {
//           return {
//             id: payload.user.email,
//             user: payload.user,
//             token: payload.token,
//           };
//         } else {
//           throw new Error("Erorr......");
//         }
//       },
//     }),
//   ],
//   //encrypted
//   callbacks: {
//     jwt: ({ token, user }) => {
//       if (user) {
//         token.user = user.user;
//         token.token = user.token;
//       }

//       return token;
//     },
//     session: ({ session, token }) => {
//       session.user = token.user;

//       return session;
//     },
//   },
// };

// //useSession ..client(navbar)
// //  ,getSession, getServerSession
