"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useAppStore } from "@/lib/store/useAppStore";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAppStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telegram, setTelegram] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0; // 0 bars
    if (password.length < 6) return 1; // Weak
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 3; // Strong
    return 2; // Medium
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, telegramChatId: telegram }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegisterError(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        setRegisterError("Registration successful, but login failed. Please try logging in.");
        setLoading(false);
      } else {
        router.push("/app");
      }
    } catch (err) {
      setRegisterError("Failed to connect to the server.");
      setLoading(false);
    }
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
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-brand"
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
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="telegram" className="text-sm font-medium text-neutral-200">
            Telegram Username or ID
          </label>
          <input
            id="telegram"
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@yourtelegram (Optional)"
            className="h-11 rounded-lg border border-transparent bg-[#262626] px-4 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-neutral-200">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 w-full rounded-lg border border-transparent bg-[#262626] px-4 pr-10 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white focus:outline-none"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          <div className="mt-1 flex gap-1">
            <div className={`h-1 flex-1 rounded-full ${strength >= 1 ? (strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-orange-500' : 'bg-brand') : 'bg-neutral-800'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${strength >= 2 ? (strength === 2 ? 'bg-orange-500' : 'bg-brand') : 'bg-neutral-800'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${strength >= 3 ? 'bg-brand' : 'bg-neutral-800'}`}></div>
          </div>
          {password.length > 0 && (
            <span className={`text-xs ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-orange-500' : 'text-brand'}`}>
              {strength === 1 ? 'Weak' : strength === 2 ? 'Medium' : 'Strong'}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-200">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 w-full rounded-lg border border-transparent bg-[#262626] px-4 pr-10 text-white outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          {passwordMatchError && (
            <span className="text-xs text-red-500">Passwords do not match</span>
          )}
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            id="terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-700 bg-[#262626] text-brand focus:ring-brand focus:ring-offset-0"
          />
          <label htmlFor="terms" className="text-xs text-neutral-400">
            I agree to the{" "}
            <Link href="#" className="text-brand hover:underline">
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link href="#" className="text-brand hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {registerError && (
          <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
            {registerError}
          </div>
        )}

        <button
          type="submit"
          className="mt-2 h-11 w-full rounded-lg bg-brand font-semibold text-canvas transition-colors hover:bg-brand-strong disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={!agreeTerms || loading}
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-canvas border-t-transparent" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand transition-colors hover:text-brand-strong">
          Log in
        </Link>
      </p>
    </div>
  );
}
