import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { email } from "zod";
import { failedLogin, successLogin } from "./app/types/authInterfase";
import { error } from "console";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        //call Api
        const response = await fetch(`${process.env.API}auth/signin`, {
          method: "post",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        const payload: failedLogin | successLogin = await response.json();
        console.log(payload);

        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error("Erorr......");
        }
      },
    }),
  ],
  //encrypted
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
};

//useSession ..client(navbar)
//  ,getSession, getServerSession
