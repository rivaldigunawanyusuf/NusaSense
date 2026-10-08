"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, Globe } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Simple email validation regex
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailError) {
      setEmailError(true);
      return;
    }
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    setLoading(false);
    
    if (res?.error) {
      alert("Invalid credentials. Try demo@nusasense.com / password");
    } else {
      router.push("/app");
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
        <p className="text-sm text-neutral-400">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral-200">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            className={`h-11 rounded-lg bg-[#262626] px-4 text-white outline-none transition-all ${
              emailError 
                ? "ring-1 ring-red-500 focus:ring-red-500" 
                : "border border-transparent focus:ring-1 focus:ring-brand"
            }`}
          />
          {emailError && (
            <span className="text-xs text-red-500">Please enter a valid email address</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-neutral-200">
              Password
            </label>
            <Link href="#" className="text-xs font-medium text-brand transition-colors hover:text-brand-strong">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:ring-1 focus:ring-brand"
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg bg-brand font-semibold text-canvas transition-colors hover:bg-brand-strong"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-brand transition-colors hover:text-brand-strong">
          Sign up
        </Link>
      </p>
    </div>
  );
}
