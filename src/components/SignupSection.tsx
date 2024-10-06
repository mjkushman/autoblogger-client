import { SignupForm } from "@/components/SignupForm.tsx";

type Props = {};

export const SignupSection = (props: Props) => {
  return (
    <div id="signup" className="mx-auto text-center max-w-7xl pt-12 px-6 lg:px-8 my-2 border-t border-gray-200">
      <div className="mx-auto lg:mx-0">
        <h2 className="lg:text-3xl tracking-tight sm:text-2xl">Try it out</h2>
        <p className="mt-2 text-lg leading-8 text-gray-500">
          Create an account to get an API key
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl pt-2 sm:mt-4 sm:pt-4 md:mx-0 md:max-w-none flex justify-center">
        {/* Form goes here */}
        <SignupForm />
      </div>
    </div>
  );
};
