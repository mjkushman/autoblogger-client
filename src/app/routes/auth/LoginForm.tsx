import { useState, useContext } from "react";
import { Field, Fieldset } from "@headlessui/react";
import { AuthService } from "@/utils/authService";
import { useNavigate } from "react-router";
import { UserContext } from "@/app/provider";
import { Button, LabeledInput } from "@/components";

export const LoginForm = (): React.ReactElement => {
  const initialFormData = {
    email: import.meta.env.VITE_DEV_LOGIN_EMAIL ?? "",
    password: import.meta.env.VITE_DEV_LOGIN_PW ?? "",
  };

  const userContext = useContext(UserContext);
  const setToken = userContext?.setToken;
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log("form submit");
    e.preventDefault();
    try {
      AuthService.login(formData)
        .then(
          (value) => {
            console.log("entering .then. value: ", value); // if request succeeds
            setToken(value); // updates token, triggering update of user
          },
          () => console.log("Request failed") // if request fails
        )
        .then(() => navigate("/account"));

      setFormData(initialFormData);
    } catch (error) {
      console.log(`Failed to sign in: ${error}`);
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={"w-full max-w-sm my-6 rounded-md px-8"}
      >
        <Fieldset className={"flex flex-col gap-2"}>
          <Field className={"relative"}>
            <LabeledInput
              type="text"
              name="email"
              id="email"
              label="Email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={" border border-violet-900  w-full text-lg "}
            />
          </Field>
          <Field className={"relative"}>
            <LabeledInput
              type="password"
              name="password"
              id="password"
              label="Password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={"border border-violet-900 text-lg"}
            />
          </Field>
        </Fieldset>
        <Button
          type="submit"
          className="bg-violet-900 text-gray-100 py-2 px-4 rounded-lg my-8"
        >
          Sign in
        </Button>
      </form>
    </>
  );
};
