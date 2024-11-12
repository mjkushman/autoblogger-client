import { AccountSettings } from "@/components/AccountSettings";
import { AgentSettingsForm } from "@/components/AgentSettings";
import { Loading } from "@/components/Loading";
import { Account } from "@/types";
import { Button } from "@headlessui/react";
import { useLoaderData, useNavigate } from "react-router";

export const AccountRoot = () => {
  const account = useLoaderData() as Account;
  const navigate = useNavigate();
  const agentLimit = 100;

  // useEffect(()=> {
  //   if(account) setIsLoading(false)
  // }, [account])

  // if(isLoading) return <Loading />
  return (
    <>
      <div className="my-10">
        <h1 className="text-5xl">Settings</h1>
      </div>
      <h1 className="pt-2 text-2xl font-semibold">Account</h1>
      <div className="py-2 my-4">
        {account ? <AccountSettings account={account} /> : <Loading />}
      </div>
      <div className="flex justify-between">
        <h1 className="pt-2 text-2xl font-semibold">Agents</h1>

        <Button
          onClick={() => navigate("new-agent")}
          disabled={account?.Agents.length >= agentLimit}
          className="my-2 mx-4 px-4 py-2 rounded-xl bg-violet-800 text-gray-100 data-[disabled]:bg-gray-500"
        >
          New
        </Button>
      </div>

      <div className="py-2 my-4">
        {account ? (
          account?.Agents.map((agent) => {
            return <AgentSettingsForm agent={agent} key={agent.agentId} />;
          })
        ) : (
          <Loading />
        )}
      </div>
      <div className="flex flex-auto m-auto justify-center"></div>
    </>
  );
};
