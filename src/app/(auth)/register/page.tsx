"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Apple, Globe } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAppStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0; // 0 bars
    if (password.length < 6) return 1; // Weak
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 3; // Strong
    return 2; // Medium
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted", { name, email, password, confirmPassword, agreeTerms });
    login({ name: name || "Demo User", email });
    router.push("/app");
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">Create an account</h1>
        <p className="text-sm text-neutral-400">Sign up to get started with NusaSense</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-neutral-200">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-lime-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral-200">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-lime-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-neutral-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-lime-500"
          />
          
          {/* Password Strength Indicator */}
          <div className="mt-1 flex gap-1">
            <div className={`h-1 flex-1 rounded-full ${strength >= 1 ? (strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-amber-500' : 'bg-green-500') : 'bg-neutral-800'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${strength >= 2 ? (strength === 2 ? 'bg-amber-500' : 'bg-green-500') : 'bg-neutral-800'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${strength >= 3 ? 'bg-green-500' : 'bg-neutral-800'}`}></div>
          </div>
          {password.length > 0 && (
            <span className={`text-xs ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : 'text-green-500'}`}>
              {strength === 1 ? 'Weak' : strength === 2 ? 'Medium' : 'Strong'}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-200">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-lime-500"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            id="terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-700 bg-[#262626] text-lime-500 focus:ring-lime-500 focus:ring-offset-0"
          />
          <label htmlFor="terms" className="text-xs text-neutral-400">
            I agree to the{" "}
            <Link href="#" className="text-lime-500 hover:underline">
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link href="#" className="text-lime-500 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg bg-lime-500 font-semibold text-black transition-colors hover:bg-lime-400 active:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!agreeTerms}
        >
          Create Account
        </button>
      </form>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-neutral-800"></div>
        <span className="shrink-0 px-4 text-xs tracking-wider text-neutral-500 uppercase">Or sign up with</span>
        <div className="flex-grow border-t border-neutral-800"></div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white font-semibold text-black transition-colors hover:bg-neutral-200"
        >
          <Apple className="size-5" />
          <span>Sign up with Apple</span>
        </button>
        
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-transparent font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          <Globe className="size-5 text-neutral-300" />
          <span>Sign up with Google</span>
        </button>
      </div>

      <p className="mt-2 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-lime-500 transition-colors hover:text-lime-400">
          Log in
        </Link>
      </p>
    </div>
  );
}
