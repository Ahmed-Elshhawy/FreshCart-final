"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/loginSchema";
import * as zod from "zod";

// استيراد toast
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback-url") ?? "/";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  async function SubmitForm(values: zod.infer<typeof loginSchema>) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl,
      });

      if (response?.ok) {
        // toast نجاح مثل cart
        toast.success("Login successful!");
        setTimeout(() => router.replace(response.url || "/"), 1000);
      } else {
        setErrorMessage(" Wrong email or password");
      }
    } catch (err) {
      setErrorMessage("Unexpected error, try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-5/6 md:w-1/2 rounded-2xl p-10 bg-gray-200 mt-10 relative">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-green-600 text-2xl font-bold text-center">
        Login Now
      </h2>

      <form onSubmit={form.handleSubmit(SubmitForm)}>
        {/* Email */}
        <div className="mt-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                <Input
                  className="w-full bg-white"
                  {...field}
                  id={field.name}
                  placeholder="Enter Your Email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                <Input
                  type="password"
                  className="w-full bg-white"
                  {...field}
                  id={field.name}
                  placeholder="Enter Your Password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* رسالة الخطأ فوق الزرار */}
        {errorMessage && (
          <p className="text-red-600 text-sm mt-2 text-center">
            {errorMessage}
          </p>
        )}

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full cursor-pointer my-5 flex justify-center items-center gap-2 "
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>

        <div className="flex justify-between">
          <Link className="py-4 ps-3 text-green-600" href={"/register"}>
            Don't Have Account? Sign Up
          </Link>
          <Link className="py-4 pe-3 text-blue-600" href={"/forgetPassword"}>
            Forget Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
