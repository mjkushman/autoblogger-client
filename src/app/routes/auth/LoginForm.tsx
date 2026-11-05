import { useState, useContext } from "react";
import { Field, Fieldset } from "@headlessui/react";
import { useNavigate } from "react-router";
import { AuthService } from "@/utils/authService";
import { ApiError } from "@/utils/api";
import UserContext from "@/app/contexts/UserContext";
import { Button, LabeledInput } from "@/components";
import { FormError } from "./FormError";

export const LoginForm = (): React.ReactElement => {
  const initialFormData = {
    // Dev-only prefill; import.meta.env.DEV is false in production builds,
    // so the VITE_DEV_LOGIN_* values are tree-shaken out of the bundle.
    email: import.meta.env.DEV ? import.meta.env.VITE_DEV_LOGIN_EMAIL ?? "" : "",
    password: import.meta.env.DEV ? import.meta.env.VITE_DEV_LOGIN_PASSWORD ?? "" : "",
  };

  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const token = await AuthService.login(formData);
      setToken(token); // updates token, triggering update of user
      navigate("/account");
    } catch (err) {
      const wrongCredentials = err instanceof ApiError && (err.status === 401 || err.status === 404);
      setError(
        wrongCredentials
          ? "That email and password don't match. Please check them and try again."
          : "We couldn't sign you in right now. Please try again in a moment."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <Fieldset className="flex flex-col gap-3">
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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
        </Field>
      </Fieldset>
      {error && <FormError>{error}</FormError>}
      <Button type="submit" size="lg" loading={isSubmitting} className="mt-6 w-full">
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
};
