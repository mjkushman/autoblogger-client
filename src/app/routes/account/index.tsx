import { AccountSettings } from "@/components/AccountSettings";
import { AgentSettingsForm } from "@/components/AgentSettingsForm";
import { Account } from "@/types";
import { useState } from "react";
import { useLoaderData } from "react-router";

export const AccountRoot = () => {
  const [account, setAccount] = useState(useLoaderData() as Account);

  return (
    <>
      <div className="p-4 my-4-10">
        <h1 className="text-5xl">Settings</h1>
      </div>
      <div className="py-2 my-4">
        {/* section component */}
        <AccountSettings account={account} />
      </div>

      {/* temporary div for viewing forms as I edit them */}
      <div className="py-2 my-4">
        {/* section component */}
        {account.Agents.map((agent) => {
          return <AgentSettingsForm agent={agent}  key={agent.agentId}/>;
        })}
      </div>
      <div className="flex flex-auto m-auto justify-center"></div>
    </>
  );
};
