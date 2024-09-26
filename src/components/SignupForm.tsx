import { useState, useContext } from "react";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { AuthService } from "@/utils/authService";
import { UserContext } from "@/app/provider";

export const SignupForm = () => {
  const { setToken } = useContext(UserContext);

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);

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
          console.log('Entering .then with value:' ,value)
          setToken(value);
        },
        () => console.log("Request failed")
      );

      setFormData(initialFormData);
    } catch (error) {
      console.log(`Failed to create account: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm my-2  rounded-md px-8"
    >
      <Fieldset className={"flex flex-col gap-2"}>
        <Field>
          <Label
            className={"flex justify-start text-sm text-gray-700 px-2 py-1"}
          >
            First Name
          </Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            required
            placeholder="Clark"
            autoComplete="firstName"
            value={formData.firstName}
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
            Last Name
          </Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Kent"
            autoComplete="lastName"
            value={formData.lastName}
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
              "bg-transparent border border-violet-900  w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-md text-lg h-10"
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
              "bg-transparent border border-violet-900  w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-md text-lg h-10"
            }
          />
        </Field>
        <Field>
          <Label
            className={"flex justify-start text-sm text-gray-700 px-2 py-1"}
          >
            Verify Password
          </Label>
          <Input
            type="password"
            name="verifyPassword"
            id="verifyPassword"
            placeholder="verify password"
            value={formData.verifyPassword}
            onChange={handleChange}
            className={
              "bg-transparent border border-violet-900  w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none rounded-md text-lg h-10"
            }
          />
        </Field>
      </Fieldset>
      <button
        formAction="submit"
        className="bg-violet-900 text-gray-100 py-2 px-4 rounded-lg my-8"
      >
        Get API Key
      </button>
    </form>
  );
};
