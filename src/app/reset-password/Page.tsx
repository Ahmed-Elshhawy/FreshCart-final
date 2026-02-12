"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword: password,
        }),
      },
    );

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      localStorage.removeItem("resetEmail");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-purple-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
