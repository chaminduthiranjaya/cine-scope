"use client";

import { ArrowLeft, Lock, Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginView() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already logged in, push to protected area
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/explore");
    }
  }, [status, router]);

  const isLoading = status === "loading";

  return (
    <div className="min-h-screen bg-[#0f0f12] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </button>

          <div className="mb-8">
            <h1 className="mb-3">Welcome back</h1>
            <p className="text-slate-400">
              Sign in to your account to continue your movie journey
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            <button
              className="cursor-pointer w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-gray-200"
              onClick={() => {
                signIn("google");
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button className="cursor-pointer w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-400 hover:bg-blue-500 text-white rounded-xl transition-all duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0f0f12] text-slate-400">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 text-slate-400"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-rose-600 transition-colors text-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-2 text-slate-400"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  id="password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-rose-600 transition-colors text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="cursor-pointer w-4 h-4 rounded border-slate-700 bg-slate-800 text-rose-600 focus:ring-rose-600 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-rose-600 hover:text-rose-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-rose-600/30 hover:shadow-xl hover:shadow-rose-600/40"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400">
            Don't have an account?{" "}
            <button className="cursor-pointer text-rose-600 hover:text-rose-700 transition-colors">
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <Image
          src="/images/login_right_side_image.png"
          alt="Cinema"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f12] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-rose-600/10" />
      </div>
    </div>
  );
}
