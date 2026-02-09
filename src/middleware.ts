//prevent any one to routing except they login
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", "/profile", "/wishList"];
const authPages = ["/login", "/register"];

//i have request then get token
//i dont have request then go to redirect(login)
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      //cart (go to any page)
      return NextResponse.next();
    } else {
      //redirect url
      // (go to login)
      let redirectUrl = new URL("/login", process.env.NEXTAUTH_URL);
      redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  //auth pages
  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      //here (login)
      return NextResponse.next();
    } else {
      //redirect url
      // (go to any page (ex home))
      let redirectUrl = new URL("/", process.env.NEXTAUTH_URL);
      return NextResponse.redirect(redirectUrl);
    }
  }
  //go any other pages
  return NextResponse.next();
}
