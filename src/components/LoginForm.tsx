import { useState, useContext } from "react";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { AuthService } from "@/utils/authService";
import { useNavigate } from "react-router";
import { UserContext } from "@/app/provider";

export const LoginForm = (): React.ReactElement => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  };

  const userContext = useContext(UserContext);
  const setToken = userContext?.setToken

  const navigate = useNavigate();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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
        className={"w-full max-w-sm my-2  rounded-md px-8"}
      >
        <p>try: org1@org1.com // hashedpassword</p>
        <Fieldset className={"flex flex-col gap-2"}>
          <Field>
            <Label
              className={"flex justify-start text-sm text-gray-700 px-2 py-1"}
            >
              Email
            </Label>
            <Input
              type="text"
              name="email"
              id="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900  w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-md text-lg h-10 "
              }
            />
          </Field>
          <Field>
            <Label
              className={"flex justify-start text-sm text-gray-700 px-2 py-1"}
            >
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              required
              placeholder="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className={
                "bg-transparent border border-violet-900  w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-md text-lg h-10 "
              }
            />
          </Field>
        </Fieldset>
        <button
          formAction="submit"
          className="bg-violet-900 text-gray-100 py-2 px-4 rounded-lg my-8"
        >
          Sign in
        </button>
      </form>
    </>
  );
};
