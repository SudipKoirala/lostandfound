"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FEATURES = [
  { title: "Smart Match", description: "AI finds your item", Icon: SearchIcon },
  { title: "Live Map", description: "Geo-tagged reports", Icon: MapPinIcon },
  {
    title: "Safe Handoff",
    description: "Verified chat & claim",
    Icon: ChatIcon,
  },
];

const INPUT_CLASSES =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition-all focus:border-[#7B2428] focus:outline-none focus:ring-2 focus:ring-[#7B2428]/20";

const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(" ");

export default function Login() {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev: any) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!form.userName.trim()) newErrors.userName = "Username is required.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.userName,
          password: form.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setApiError(data.message || "Failed to login.");
        return;
      }

      // Successfully logged in
      router.push("/");
    } catch (error) {
      setApiError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] lg:grid lg:grid-cols-[5fr_7fr]">
      <aside className="hidden flex-col justify-between bg-[#7B2428] p-12 text-white xl:p-16 lg:flex">
        <div>
          <div className="mb-16 flex items-center gap-2">
            <SearchIcon className="h-8 w-8 text-[#E2B764]" />
            <span className="text-2xl font-bold text-[#E2B764]">Foundify</span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] xl:text-6xl">
            A safer way to recover what matters.
          </h1>
          <p className="mb-12 max-w-md text-lg text-red-100">
            Smart matching, verified handoffs, and a community of careful
            neighbors — all in one place.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            {FEATURES.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <Icon className="mb-3 h-6 w-6 text-white" />
                <h3 className="mb-1 font-bold">{title}</h3>
                <p className="text-xs text-red-200">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-red-200">
            <ShieldIcon className="h-4 w-4" />
            SOC 2 · GDPR · End-to-end safe handoff
          </div>
          <div className="text-sm text-red-100">
            New to Foundify?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#E2B764] hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 py-8 sm:py-12">
        <div className="w-full max-w-[95%] sm:max-w-[480px]">
          <div className="mb-6 sm:mb-8">
            <p className="mb-2 sm:mb-3 text-xs font-bold uppercase text-[#C69C45]">
              Welcome back
            </p>
            <h2 className="mb-2 sm:mb-3 text-2xl sm:text-4xl font-extrabold text-[#4A1014]">
              Sign in to Foundify
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Access your reports, claims and messages.
            </p>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white py-2.5 font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <GoogleIcon />
            Google
          </button>

          <div className="mb-6 sm:mb-8 mt-6 sm:mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <p className="text-xs font-semibold uppercase text-gray-400 whitespace-nowrap">
              Or continue with email
            </p>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="maya.chen@foundify.app"
                className={cn(
                  INPUT_CLASSES,
                  errors.userName && "border-red-300 focus:border-red-500",
                )}
              />
              {errors.userName && (
                <p className="text-xs sm:text-sm text-red-600">
                  {errors.userName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-end justify-between gap-3">
                <label className="text-sm font-bold text-gray-900">
                  Password <span className="text-red-500">*</span>
                </label>
                <Link
                  href="#"
                  className="text-xs font-semibold text-[#C69C45] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={cn(
                    INPUT_CLASSES,
                    errors.password && "border-red-300 focus:border-red-500",
                    "pr-16",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs sm:text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                id="rememberMe"
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
                style={{ accentColor: "#0eb1bf" }}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Keep me signed in on this device
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 sm:mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B2428] px-4 py-3.5 font-bold text-white transition-all cursor-pointer hover:bg-[#631c20] disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block animate-spin">⟳</span>
                  Signing in...
                </span>
              ) : (
                <>
                  Sign in <ArrowRightIcon className="h-5 w-5" />
                </>
              )}
            </button>

            {apiError && (
              <div className="rounded-lg border border-red-100 bg-red-50 p-3 sm:p-4 text-sm text-red-700 animate-in fade-in">
                ✗ {apiError}
              </div>
            )}
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#C69C45] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Icons
function SearchIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zm-7 0a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function MapPinIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function ChatIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
