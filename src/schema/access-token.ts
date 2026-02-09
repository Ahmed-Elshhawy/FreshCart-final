import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const authToken = (await cookies()).get("next-auth.session-token")?.value;
  const token = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return token?.token;
}
