import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { useState } from "react";

export const LoginRoute = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return hasAccount ? (
    <div className="mx-auto max-w-3xl pt-2 sm:mt-4 sm:pt-4 md:mx-0 md:max-w-none flex flex-col items-center justify-center h-screen text-center">
      <div className="mx-auto lg:mx-0">
        <h2 className="lg:text-3xl tracking-tight sm:text-2xl">
          Sign in to your account
        </h2>
        <p>try: org1@org1.com // hashedpassword</p>
      </div>
      <div>
      <p>New to Autoblogger?
      <button className="px-1 text-violet-800" onClick={() => setHasAccount(false)}> Create an account</button></p>
      </div>
      <LoginForm />
    </div>
  ) : (
    <div className="mx-auto max-w-3xl pt-2 sm:mt-4 sm:pt-4 md:mx-0 md:max-w-none flex flex-col items-center justify-center h-screen text-center">
      <div className="mx-auto lg:mx-0">
        <h2 className="lg:text-3xl tracking-tight sm:text-2xl">
          Create a new account
        </h2>
      </div>
      <div>
      <p>Already have an account?
      <button className="px-1 text-violet-800" onClick={() => setHasAccount(true)}> Sign in</button></p>
      </div>
      <SignupForm />
      
    </div>
  );
};
