import { AccountSettings } from "@/components/AccountSettings";
import { AgentSettingsForm } from "@/components/AgentSettings";
import { Account } from "@/types";
import { useState } from "react";
import { useLoaderData } from "react-router";

export const AccountRoot = () => {
  const [account] = useState(useLoaderData() as Account);

  return (
    <>
      <div className="my-10">
        <h1 className="text-5xl">Settings</h1>
      </div>
      <h1 className="pt-2 text-2xl font-semibold">Account</h1>
      <div className="py-2 my-4">
        <AccountSettings account={account} />
      </div>
      <h1 className="pt-2 text-2xl font-semibold">Agents</h1>
      <div className="py-2 my-4">
        {account.Agents.map((agent) => {
          return <AgentSettingsForm agent={agent} key={agent.agentId} />;
        })}
      </div>
      <div className="flex flex-auto m-auto justify-center"></div>

    </>
  );
};
