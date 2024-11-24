import { Account } from "@/types";
import React, {
  ReactEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "@/utils/api";
import { useNavigate } from "react-router";

import { AuthService } from "@/utils/authService";
import { UserContext } from "@/app/provider";
import {
  Button,
  Checkbox,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Switch,
  Textarea,
} from "@headlessui/react";
import { AccountFormData } from "@/types/Account.type";
import { AccountApiResponse } from "@/types/Api.type";

type Props = {
  account: Account;
  updateAccount: (formData: AccountFormData) => Promise<void>;
};

export const AccountSettings = ({ account, updateAccount }: Props) => {
  const [isApiKeyVisibile, setIsApiKeyVisibile] = useState<boolean>(false);
  const [isOpenAIApiKeyVisibile, setIsOpenAIApiKeyVisibile] =
    useState<boolean>(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api
        .delete("accounts")
        .then(() => AuthService.logout())
        .then(() => navigate("/"))
        .then(() => setToken(null));
    } catch (error) {
      console.log("failed to delete:", error);
    }
  };

  const initialAccountFormData: AccountFormData = {
    accountId: account.accountId,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    openAiApiKey: account.openAiApiKey,
  };

  const [accountFormData, setAccountFormData] = useState(
    initialAccountFormData
  );

  const isDataChanged =
    JSON.stringify(accountFormData) == JSON.stringify(initialAccountFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAccountFormData((accountFormData) => ({
      ...accountFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateAccount(accountFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:drop-shadow-md border border-gray-300">
        <form onSubmit={handleSubmit}>
          <Fieldset className="flex flex-wrap items-center my-2">
            <Label className="text-xl font-semibold">Personal Info</Label>
            <Input
              name="firstName"
              id="firstName"
              type="text"
              placeholder={accountFormData.firstName}
              value={accountFormData.firstName}
              onChange={handleChange}
              className="bg-white rounded-xl m-2 p-2 data-[focus]:shadow-inner data-[focus]:border-hidden text-md text-gray-800"
            />
            <Input
              name="lastName"
              id="lastName"
              type="text"
              placeholder={accountFormData.lastName}
              value={accountFormData.lastName}
              onChange={handleChange}
              className="bg-white rounded-xl m-2 p-2 data-[focus]:shadow-inner data-[focus]:border-hidden text-md text-gray-800"
            />
            <Input
              name="email"
              id="email"
              type="email"
              placeholder={accountFormData.email}
              value={accountFormData.email}
              onChange={handleChange}
              className="bg-white rounded-xl m-2 p-2 data-[focus]:shadow-inner data-[focus]:border-hidden text-md text-gray-800"
            />
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
            <span>
              <Button
                className="p-1 text-sm rounded-xl bg-gray-200"
                onClick={() => setIsApiKeyVisibile(!isApiKeyVisibile)}
              >
                {isApiKeyVisibile ? "Hide" : "Show"}
              </Button>
              <Input
                name="apiKey"
                id="apiKey"
                type={isApiKeyVisibile ? "text" : "password"} // Hold this in state so user can toggle visibility
                value={account.apiKey}
                disabled
                className="bg-white w-fit rounded-xl m-2 p-2 data-[focus]:shadow-inner data-[focus]:border-hidden text-gray-800 text-sm"
              />
            </span>
          </Field>

          <Field className="flex flex-wrap gap-2 items-center my-2">
            <span>
              <Label className="text-xl font-semibold">OpenAI API Key</Label>
              <Description className="text-sm text-gray-500">
                Add your API key for Open API to get started.
              </Description>
            </span>
            <span>
              <Button
                className="p-1 text-sm rounded-xl bg-gray-200"
                onClick={() =>
                  setIsOpenAIApiKeyVisibile(!isOpenAIApiKeyVisibile)
                }
              >
                {isOpenAIApiKeyVisibile ? "Hide" : "Show"}
              </Button>
              <Input
                type={isOpenAIApiKeyVisibile ? "text" : "password"}
                value={accountFormData?.openAiApiKey}
                onChange={handleChange}
                className="bg-white w-fit rounded-xl m-2 p-2 data-[focus]:shadow-inner data-[focus]:border-hidden text-gray-800 text-sm"
              />
            </span>
          </Field>

          <Button
            className="bg-violet-900 text-gray-100 py-2 px-4 rounded-lg my-4 data-[disabled]:bg-gray-200"
            hidden={isDataChanged}
            formAction="submit"
            type="submit"
          >
            Save
          </Button>
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
