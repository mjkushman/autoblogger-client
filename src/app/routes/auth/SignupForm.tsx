import { useState, useContext } from "react";
import { Field, Fieldset } from "@headlessui/react";
import { useNavigate } from "react-router";
import { AuthService } from "@/utils/authService";
import { ApiError } from "@/utils/api";
import UserContext from "@/app/contexts/UserContext";
import { Button, LabeledInput } from "@/components";
import { FormError } from "./FormError";

export const SignupForm = () => {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: import.meta.env.VITE_DEV_SIGNUP_FIRSTNAME ?? "",
    lastName: import.meta.env.VITE_DEV_SIGNUP_LASTNAME ?? "",
    email: import.meta.env.VITE_DEV_SIGNUP_EMAIL ?? "",
    password: import.meta.env.VITE_DEV_SIGNUP_PASSWORD ?? "",
    verifyPassword: import.meta.env.VITE_DEV_SIGNUP_VERIFYPASSWORD ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.verifyPassword) {
      setError("Your passwords don't match. Please retype them.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await AuthService.createAccount({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      setToken(token);
      navigate("/account");
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 409
          ? "An account with this email already exists. Try signing in instead."
          : "We couldn't create your account right now. Please try again in a moment."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <Fieldset className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field className="relative">
            <LabeledInput
              type="text"
              name="firstName"
              id="firstName"
              label="First name"
              required
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Field>
          <Field className="relative">
            <LabeledInput
              type="text"
              name="lastName"
              id="lastName"
              label="Last name"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Field>
        </div>
        <Field className="relative">
          <LabeledInput
            type="email"
            name="email"
            id="email"
            label="Email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Field>
        <Field className="relative">
          <LabeledInput
            type="password"
            name="password"
            id="password"
            label="Password"
            required
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
        </Field>
        <Field className="relative">
          <LabeledInput
            type="password"
            name="verifyPassword"
            id="verifyPassword"
            label="Confirm password"
            required
            autoComplete="new-password"
            value={formData.verifyPassword}
            onChange={handleChange}
          />
        </Field>
      </Fieldset>
      {error && <FormError>{error}</FormError>}
      <Button type="submit" size="lg" loading={isSubmitting} className="mt-6 w-full">
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
};
