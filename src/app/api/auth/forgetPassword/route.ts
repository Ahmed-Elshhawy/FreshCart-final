// // app/api*auth/forgetPassword*route.ts
// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

// export async function POST(req: NextRequest) {
//   try {
//     const { email } = await req.json();
//     if (!email)
//       return NextResponse.json({ error: "Email required" }, { status: 400 });

//     // 👇 Generate 6-digit code
//     const verificationCode = Math.floor(100000 + Math.random() * 900000);

//     // Create JWT token with code inside
//     const token = jwt.sign(
//       { email, verificationCode },
//       process.env.NEXTAUTH_SECRET!,
//       { expiresIn: "10m" }, // صالح لمدة 10 دقائق
//     );

//     // Configure nodemailer
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//     });

//     await transporter.sendMail({
//       from: process.env.SMTP_FROM,
//       to: email,
//       subject: "Your Verification Code",
//       text: `Your verification code is: ${verificationCode}`,
//     });

//     return NextResponse.json({ token, message: "Verification email sent" });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 },
//     );
//   }
// }
// // .............
