"use client";

import { useState } from "react";
import Link from "next/link";
import { Apple, Chrome } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailError) {
      setEmailError(true);
      return;
    }
    console.log("Login submitted", { email, password });
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
                : "border border-transparent focus:ring-1 focus:ring-lime-500"
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
            <Link href="#" className="text-xs font-medium text-lime-500 transition-colors hover:text-lime-400">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:ring-1 focus:ring-lime-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg bg-lime-500 font-semibold text-black transition-colors hover:bg-lime-400 active:bg-lime-600"
        >
          Sign In
        </button>
      </form>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-neutral-800"></div>
        <span className="shrink-0 px-4 text-xs tracking-wider text-neutral-500 uppercase">Or continue with</span>
        <div className="flex-grow border-t border-neutral-800"></div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white font-semibold text-black transition-colors hover:bg-neutral-200"
        >
          <Apple className="size-5" />
          <span>Sign in with Apple</span>
        </button>
        
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-transparent font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          <Chrome className="size-5 text-neutral-300" />
          <span>Sign in with Google</span>
        </button>
      </div>

      <p className="mt-2 text-center text-sm text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-lime-500 transition-colors hover:text-lime-400">
          Sign up
        </Link>
      </p>
    </div>
  );
}
