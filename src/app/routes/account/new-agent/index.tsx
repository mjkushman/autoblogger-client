import { AgentCreate } from "@/components/AgentCreate";
import { Account } from "@/types";

import { useState } from "react";
import { useLoaderData } from "react-router";

export const NewAgent = (): React.ReactNode => {
  const [account] = useState(useLoaderData() as Account);
  console.log("rendering NewAgent");
  return (
    <>
      <div className="my-10">
        <h1 className="text-5xl">Create a new agent</h1>
      </div>

      <div className="py-2 my-4">
        <AgentCreate accountId={account.accountId} />
      </div>
    </>
  );
};
