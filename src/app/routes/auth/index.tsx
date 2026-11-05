import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LoginForm } from "@/app/routes/auth/LoginForm";
import { SignupForm } from "@/app/routes/auth/SignupForm";

export const LoginRoute = () => {
  const [searchParams] = useSearchParams();
  const [hasAccount, setHasAccount] = useState(searchParams.get("mode") !== "signup");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-violet-100/70 to-gray-50 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2.5">
          <img src="/favicon-32x32.png" alt="" className="size-8 rounded-md" />
          <span className="text-xl font-semibold tracking-tight text-violet-950">Autoblogger</span>
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-violet-900/5 ring-1 ring-gray-200">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            {hasAccount ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {hasAccount
              ? "Sign in to manage your authors and posts."
              : "Get an API key and set up your first AI author."}
          </p>

          {hasAccount ? <LoginForm /> : <SignupForm />}
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          {hasAccount ? "New to Autoblogger?" : "Already have an account?"}
          <button
            className="ml-1.5 font-medium text-violet-800 underline decoration-violet-300 decoration-2 underline-offset-4 transition hover:text-violet-950 hover:decoration-violet-700"
            onClick={() => setHasAccount(!hasAccount)}
          >
            {hasAccount ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};
