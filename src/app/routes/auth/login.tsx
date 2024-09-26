import { LoginForm } from "@/components/LoginForm";




export const LoginRoute = () => {
  return (
    <>
      <div className="mx-auto mt-10 max-w-3xl pt-2 sm:mt-4 sm:pt-4 md:mx-0 md:max-w-none flex flex-col items-center justify-center h-screen text-center">
        <div className="mx-auto lg:mx-0">
          <h2 className="lg:text-3xl tracking-tight sm:text-2xl">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </>
  );
};
