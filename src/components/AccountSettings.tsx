import { Account } from "@/types";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Navigate, useLoaderData } from "react-router";

type Props = {
  account: Account;
};

const placeholderResponse = {
  accountId: "act_00000000-0000-0000-0000-000000000001",
  email: "org1@org1.com",
  firstName: "Mandor",
  lastName: "Shebang",
  password: "hashedpassword",
  apiKey: "hashedapikey",
  apiKeyIndex: "1234567890",
  imageUrl:
    "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708534477/wcjwyet2dyaav8nl04ro.jpg",
  createdAt: "2024-09-19T17:56:08.799Z",
  updatedAt: "2024-09-19T17:56:08.799Z",
  Blogs: [
    {
      blogId: "blg_0000000001",
      accountId: "act_00000000-0000-0000-0000-000000000001",
      label: "My First Blog for org 1",
      createdAt: "2024-09-19T17:56:08.806Z",
      updatedAt: "2024-09-19T17:56:08.806Z",
    },
    {
      blogId: "blg_0000000002",
      accountId: "act_00000000-0000-0000-0000-000000000001",
      label: "My Second Blog for org 1",
      createdAt: "2024-09-19T17:56:08.807Z",
      updatedAt: "2024-09-19T17:56:08.807Z",
    },
  ],
  Agents: [
    {
      agentId: "agt_5d52f3ee-9cf9-4e31-8022-9ef3a956b5eb",
      accountId: "act_00000000-0000-0000-0000-000000000001",
      username: "mikes-agent",
      firstName: "AgentFN",
      lastName: "AgentLN",
      email: "agent@email.com",
      isEnabled: false,
      postSettings: {
        llm: "chatgpt",
        maxWords: 10000,
        isEnabled: false,
        cronSchedule: "* * * * *",
        displaySchedule: "Every minute",
      },
      commentSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      socialSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      imageUrl:
        "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708534477/wcjwyet2dyaav8nl04ro.jpg",
      authorBio: null,
      createdAt: "2024-08-13T04:03:10.692Z",
      updatedAt: "2024-08-13T04:03:10.692Z",
      blogId: null,
    },
    {
      agentId: "agt_6fbf15f7-f105-4242-8b44-96c783868178",
      accountId: "act_00000000-0000-0000-0000-000000000001",
      username: "mikes-agent",
      firstName: "AgentFN",
      lastName: "AgentLN",
      email: "agent@email.com",
      isEnabled: false,
      postSettings: {
        llm: "chatgpt",
        maxWords: 10000,
        isEnabled: false,
        cronSchedule: "* * * * *",
        displaySchedule: "Every minute",
      },
      commentSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      socialSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      imageUrl:
        "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708534477/wcjwyet2dyaav8nl04ro.jpg",
      authorBio: null,
      createdAt: "2024-08-13T04:03:11.993Z",
      updatedAt: "2024-08-13T04:03:11.993Z",
      blogId: null,
    },
    {
      agentId: "agt_00000000-0000-0000-00000000000b",
      accountId: "act_00000000-0000-0000-0000-000000000001",
      username: "agent002",
      firstName: "User",
      lastName: "One",
      email: "agent00b@gmail.com",
      isEnabled: false,
      postSettings: {
        llm: "chatgpt",
        maxWords: 300,
        isEnabled: true,
        cronSchedule: "* * * * *",
      },
      commentSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      socialSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      imageUrl:
        "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708534477/wcjwyet2dyaav8nl04ro.jpg",
      authorBio: null,
      createdAt: "2024-08-15T20:53:41.966Z",
      updatedAt: "2024-09-19T17:56:08.815Z",
      blogId: "blg_0000000001",
    },
    {
      agentId: "agt_aaaaaaaa-aaaa-aaaa-aaaaaaaaaaaa",
      accountId: "act_00000000-0000-0000-0000-000000000001",
      username: "agent001",
      firstName: "User",
      lastName: "One",
      email: "agent001@gmail.com",
      isEnabled: true,
      postSettings: {
        llm: "chatgpt",
        maxWords: 500,
        isEnabled: false,
        cronSchedule: "* * * * *",
      },
      commentSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      socialSettings: {
        llm: "chatgpt",
        maxWords: 100,
        isEnabled: false,
      },
      imageUrl:
        "https://res.cloudinary.com/dsvtolrpi/image/upload/v1708534477/wcjwyet2dyaav8nl04ro.jpg",
      authorBio: "",
      createdAt: "2024-08-13T03:52:10.282Z",
      updatedAt: "2024-09-19T17:56:08.814Z",
      blogId: "blg_0000000001",
    },
  ],
};

export const AccountSettings = ({ account }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [account, setAccount] = useState(useLoaderData() as Account);
  const [isApiKeyVisibile, setIsApiKeyVisibile] = useState(false);
  // const account = useLoaderData() as Account[]
  if (!account || !account.accountId)
    return <Navigate to="/auth/login" replace />;

  // useEffect(() => {
  //   setIsLoading(true);
  //   // const response = placeholderResponse as Account;
  //   // const apiResponse = api.get('account')

  //   // setAccount(response);
  //   setIsLoading(false);
  // }, []);

  // console.log(`LOADED DATA FROM DATALOADER: ${JSON.stringify(loadedData)}}`)

  // if (isLoading) return "Loading...";
  // if (!isLoading)
  return (
    <>
      <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div className="pt-4">
          <p className="py-2 text-l font-semibold">Name</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            {account.firstName} {account.lastName}
          </p>
        </div>
        <p className="py-2 text-l font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">{account?.email}</p>
        </div>
        <p className="py-2 text-l font-semibold">Account Id</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">{account.accountId}</p>
        </div>
        <p className="py-2 text-l font-semibold">API Key</p>
        <p className="font- text-slate-600">
          Do no share your API key. <br />
          Use this key in your app to make requests to the autoblogger server.
        </p>
        <div className="flex flex-row items-basline py-2">
          <button onClick={() => setIsApiKeyVisibile(!isApiKeyVisibile)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="m-auto mx-2 h-6 w-6 cursor-pointer font-semibold text-gray-600 underline decoration-2 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          </button>
          <span className="text-gray-700 h-10 px-4 w-1/2">
            {isApiKeyVisibile ? account.apiKey : "✹✹✹✹✹✹✹✹✹"}
          </span>
        </div>

        <hr className="mt-4 mb-8" />

        <div className="mb-10">
          <p className="py-2 text-l font-semibold">Destroy Account</p>
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
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
            Destroying your account deletes all your information including your
            agent, posts, and any post comments. <br />
            This action cannot be undone.
          </p>
          <button className="ml-auto text-sm text-rose-700 border-b-2 border-rose-700 my-1">
            Destroy account
          </button>
        </div>
      </div>
    </>
  );
};
