import { Account } from "@/types";
import React, {
  useContext,
  useState,
} from "react";
import api from "@/utils/api";
import { useNavigate } from "react-router";

import { AuthService } from "@/utils/authService";
import  UserContext  from "@/app/contexts/UserContext";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
} from "@headlessui/react";
import { AccountFormData } from "@/types/Account.type";
import { LabeledInput, Button as StyledButton } from "@/components";

type Props = {
  account: Account;
  updateAccount: (formData: AccountFormData) => Promise<void>;
};

export const AccountSettings = ({ account, updateAccount }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyVisibile, setIsApiKeyVisibile] = useState<boolean>(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await api
        .delete("accounts")
        .then(() => AuthService.logout())
        .then(() => navigate("/"))
        .then(() => setToken(null))
        .then(() => setIsLoading(false));
    } catch (error) {
      console.log("failed to delete:", error);
    }
  };

  const initialAccountFormData: AccountFormData = {
    accountId: account.accountId,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
  };

  const [accountFormData, setAccountFormData] = useState(
    initialAccountFormData
  );

  const isDataChanged =
    JSON.stringify(accountFormData) !== JSON.stringify(initialAccountFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAccountFormData((accountFormData) => ({
      ...accountFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      await updateAccount(accountFormData).then(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:drop-shadow-md border border-gray-300">
        <form onSubmit={handleSubmit}>
          <Fieldset className=" flex flex-wrap my-2 items-center  justify-between">
            <div className="flex flex-wrap gap-1 items-center  ">
              <Label className="text-xl mr-4 font-semibold">
                Personal Info
              </Label>
              <Field className={"relative"}>
                <LabeledInput
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  type="text"
                  placeholder={accountFormData.firstName}
                  value={accountFormData.firstName}
                  onChange={handleChange}
                />
              </Field>
              <Field className={"relative"}>
                <LabeledInput
                  name="lastName"
                  id="lastName"
                  type="text"
                  label="Last Name"
                  placeholder={accountFormData.lastName}
                  value={accountFormData.lastName}
                  onChange={handleChange}
                />
              </Field>
              <Field className={"relative"}>
                <LabeledInput
                  name="email"
                  id="email"
                  type="email"
                  label="Email"
                  placeholder={accountFormData.email}
                  value={accountFormData.email}
                  onChange={handleChange}
                />
              </Field>
            </div>
            <div>
              <StyledButton
                disabled={!isDataChanged || isLoading}
                formAction="submit"
                type="submit"
                className="data-[disabled]:invisible shadow-2xl"
              >
                Save
              </StyledButton>
            </div>
          </Fieldset>

          <Field className="flex flex-wrap gap-2 items-center my-2">
            <span>
              <Label className="text-xl font-semibold">
                Autoblogger API Key
              </Label>
              <Description className="text-sm text-gray-500">
                Never share your Autoblogger API key
              </Description>
            </span>
            <Button
              className="p-1 text-sm rounded-xl bg-gray-200"
              onClick={() => setIsApiKeyVisibile(!isApiKeyVisibile)}
            >
              {isApiKeyVisibile ? "Hide" : "Show"}
            </Button>
            <span className="flex-grow">
              <Input
                name="apiKey"
                id="apiKey"
                type={isApiKeyVisibile ? "text" : "password"} // Hold this in state so user can toggle visibility
                value={account.apiKey}
                disabled
                className="bg-white w-full rounded-xl m-2 p-2 data-[focus]:shadow-inner data-[focus]:border-hidden text-gray-800 text-sm"
              />
            </span>
          </Field>
        </form>
        <hr className="my-6" />

        <div className="mb-6">
          {isDeleteVisible ? (
            <Button
              onClick={() => setIsDeleteVisible(!isDeleteVisible)}
              className="text-green-800 text-bold block my-2 rounded-full bg-green-100 px-4 py-1"
            >
              Nevermind
            </Button>
          ) : (
            <Button
              onClick={() => setIsDeleteVisible(!isDeleteVisible)}
              className="text-sm block my-2 text-slate-500"
            >
              Destroy Account
            </Button>
          )}
          <span hidden={!isDeleteVisible} className="text-sm ">
            <p className="inline-flex items-center px-4 py-1 text-rose-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Proceed with caution
            </p>
            <p className="mt-2">
              Are you sure?
              <br />
              Destroying your account deletes all your information including
              your agent, posts, and any post comments. <br />
              This action cannot be undone.
            </p>
            <Button
              onClick={() => handleDelete()}
              className="text-rose-700 text-sm  border-rose-700 p-1 rounded-lg underline"
            >
              I'm sure, destroy my account.
            </Button>
          </span>
        </div>
      </div>
    </>
  );
};
