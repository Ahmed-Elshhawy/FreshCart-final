import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", "/profile", "/wishList"];
const authPages = ["/login", "/register"];
const publicPages = ["/", "/forgetPassword"]; // أي page عام

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // لو page عام، نتجاوز التحقق
  if (publicPages.includes(pathname)) return NextResponse.next();

  // نجرب نجيب التوكن
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Middleware token:", token);

  if (protectedPages.includes(pathname) && !token) {
    const redirectUrl = new URL("/login", process.env.NEXTAUTH_URL);
    redirectUrl.searchParams.set("callback-url", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (authPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL));
  }

  return NextResponse.next();
}

// .............
// //prevent any one to routing except they login
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// const protectedPages = ["/cart", "/profile", "/wishList"];
// const authPages = ["/login", "/register"];

// //i have request then get token
// //i dont have request then go to redirect(login)
// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req });

//   if (protectedPages.includes(req.nextUrl.pathname)) {
//     if (token) {
//       //cart (go to any page)
//       return NextResponse.next();
//     } else {
//       //redirect url
//       // (go to login)
//       let redirectUrl = new URL("/login", process.env.NEXTAUTH_URL);
//       redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);
//       return NextResponse.redirect(redirectUrl);
//     }
//   }
//   //auth pages
//   if (authPages.includes(req.nextUrl.pathname)) {
//     if (!token) {
//       //here (login)
//       return NextResponse.next();
//     } else {
//       //redirect url
//       // (go to any page (ex home))
//       let redirectUrl = new URL("/", process.env.NEXTAUTH_URL);
//       return NextResponse.redirect(redirectUrl);
//     }
//   }
//   //go any other pages
//   return NextResponse.next();
// }
// ..................
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// const protectedPages = ["/cart", "/profile", "/wishList"];
// const authPages = ["/login", "/register"];

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // console.log("Middleware token:", token);

//   if (protectedPages.includes(req.nextUrl.pathname)) {
//     if (token) {
//       return NextResponse.next();
//     } else {
//       let redirectUrl = new URL("/login", process.env.NEXTAUTH_URL);
//       redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);
//       return NextResponse.redirect(redirectUrl);
//     }
//   }

//   if (authPages.includes(req.nextUrl.pathname)) {
//     if (!token) {
//       return NextResponse.next();
//     } else {
//       let redirectUrl = new URL("/", process.env.NEXTAUTH_URL);
//       return NextResponse.redirect(redirectUrl);
//     }
//   }

//   return NextResponse.next();
// }
