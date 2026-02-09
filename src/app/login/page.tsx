"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import forgrtPassword from "../forgetPassword/page";

export default function Login() {
  const searthParams = useSearchParams();
  const callbackUrl = searthParams.get("callback-url");
  const [isLoading, setisLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function SubmitForm(values: zod.infer<typeof loginSchema>) {
    setisLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl ?? "/",
      redirect: false,
    });
    console.log(response);
    if (response?.ok) {
      //home
      toast.success("Login Success");

      window.location.href = response.url || "/";
    } else {
      toast.error("Invalid Email or Password");
    }
    setisLoading(false);
  }
  return (
    <>
      <div className="mx-auto w-5/6 md:w-1/2 rounded-2xl p-10 bg-gray-200 mt-10 ">
        <h2 className="text-green-600 text-2xl font-bold text-center">
          Login Now
        </h2>
        <form className=" " onSubmit={form.handleSubmit(SubmitForm)}>
          <div className="mt-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                  <Input
                    className="w-full  bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="mt-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                  <Input
                    type="password"
                    className="w-full  bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className=" w-full  my-5 px-10 cursor-pointer"
          >
            {isLoading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="w-3 h-3 me-1 animate-spin text-fg-brand"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C6442"
                />
              </svg>
            ) : (
              "Sign in"
            )}
          </Button>
          <div className="flex justify-between ">
            <Link className=" py-4 ps-3 text-green-600 " href={"/register"}>
              Don't Have Account Sign Up?
            </Link>
            <Link className=" py-4 pe-3 text-blue-600" href={"/forgetPassword"}>
              Forget Password ?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
