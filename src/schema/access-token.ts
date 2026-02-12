// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getAccessToken() {
//   const authToken = (await cookies()).get("next-auth.session-token")?.value;
//   const token = await decode({
//     token: authToken,
//     secret: process.env.NEXTAUTH_SECRET!,
//   });
//   return token?.token;
// }

// ............
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    headers: {
      token: token.token as string,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
