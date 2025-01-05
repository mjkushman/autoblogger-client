import { useState, useContext } from "react";
import { Field, Fieldset } from "@headlessui/react";
import { AuthService } from "@/utils/authService";
import  UserContext  from "@/app/contexts/UserContext";
import { useNavigate } from "react-router";
import { Button, LabeledInput } from "@/components";

export const SignupForm = () => {
  const { setToken } = useContext(UserContext);

  const initialFormData = {
    firstName: import.meta.env.VITE_DEV_SIGNUP_FIRSTNAME ?? "",
    lastName: import.meta.env.VITE_DEV_SIGNUP_LASTNAME ?? "",
    email: import.meta.env.VITE_DEV_SIGNUP_EMAIL ?? "",
    password: import.meta.env.VITE_DEV_SIGNUP_PASSWORD ?? "",
    verifyPassword: import.meta.env.VITE_DEV_SIGNUP_VERIFYPASSWORD ?? "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
      alert("Passwords must match");
      return;
    }
    console.log("form submitted");

    // Invoke API call
    try {
      AuthService.createAccount({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }).then(
        (value) => {
          setToken(value);
          navigate("/account");
        },
        () => console.log("Request failed") // if request fails
      );

      setFormData(initialFormData);
    } catch (error) {
      console.log(`Failed to create account: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm my-6  rounded-md px-8"
    >
      <Fieldset className={"flex flex-col gap-2"}>
        <Field className={"relative"}>
          <LabeledInput
            type="text"
            name="firstName"
            id="firstName"
            label="First Name"
            required
            autoComplete="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={"border border-violet-900 text-lg"}
          />
        </Field>

        <Field className={"relative"}>
          <LabeledInput
            type="text"
            name="lastName"
            id="lastName"
            label="Last Name"
            autoComplete="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={"border border-violet-900 text-lg"}
          />
        </Field>
        <Field className={"relative"}>
          <LabeledInput
            type="text"
            name="email"
            id="email"
            label="Email"
            autoComplete="email"

            value={formData.email}
            onChange={handleChange}
            className={"border border-violet-900 text-lg"}
          />
        </Field>
        <Field className={"relative"}>

          <LabeledInput
            type="password"
            name="password"
            id="password"
            label="Password"
            required
            
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            className={"border border-violet-900 text-lg"}
          />
        </Field>
        <Field className={"relative"}>
          <LabeledInput
            type="password"
            name="verifyPassword"
            id="verifyPassword"
            label="Verify Password"
            autoComplete="new-password"
            value={formData.verifyPassword}
            onChange={handleChange}
            className={"border border-violet-900 text-lg"}
          />
        </Field>
      </Fieldset>
      <Button
        type="submit"
        className="my-8"
      >
        Create Account
      </Button>
    </form>
  );
};
