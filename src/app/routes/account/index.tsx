import { AccountSettings } from "@/app/routes/account/AccountSettings";
import { AgentSettingsForm } from "@/app/routes/account/AgentSettings";
import { Loading } from "@/components/Loading";
import {
  Account,
  Agent,
  AgentsApiResponse,
  AgentApiResponse,
  UpdateAgentFormData,
  ApiResponse,
  CreateAgentFormData,
} from "@/types";
import { AccountFormData } from "@/types/Account.type";
import { AccountApiResponse } from "@/types";
import api from "@/utils/api";
import { Button } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import Posts from "@/components/Posts";
import UserContext from "@/app/contexts/UserContext";

export const AccountRoot = () => {
  // gets user from context
  const context = useContext(UserContext);
  const { user } = context;
  const [agents, setAgents] = useState<Agent[]>();
  const [account, setAccount] = useState<Account>();
  const [isLoading, setIsLoading] = useState(false);

  // show or hide New Agent form
  const [isNewAgentFormVisible, setIsNewAgentFormVisible] = useState(false);

  // fetch agents
  const fetchAgents = async () => {
    setIsLoading(true);
    await api
      .get<AgentsApiResponse>("agents")
      .then(({ data }) => {
        setAgents(data);
      })
      .finally(() => setIsLoading(false));
  };
  // fetch Account
  const fetchAccount = async () => {
    setIsLoading(true);
    await api
      .get<AccountApiResponse>("accounts")
      .then(({ data }) => {
        setAccount(data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (user) {
      fetchAccount();
      fetchAgents();
    }
  }, [user]);

  useEffect(() => {
    setAgents(() => agents);
  }, [agents]);
  useEffect(() => {
    setAccount(() => account);
  }, [account]);

  const updateAgent = async (formData: UpdateAgentFormData): Promise<void> => {
    // Invoke API call
    try {
      await api
        .patch<UpdateAgentFormData, AgentApiResponse>(`agents`, formData)
        .then(() => fetchAgents());
    } catch (error) {
      console.log(`Failed to submit: ${error}`);
    }
  };

  const createAgent = async (formData: CreateAgentFormData): Promise<void> => {
    try {
      await api
        .post<CreateAgentFormData, AgentApiResponse>(`agents`, formData)
        .then(() => {
          setIsNewAgentFormVisible(false);
          fetchAgents();
        });
    } catch (error) {
      console.log(`Failed to create Agent: ${error}`);
    }
  };

  const deleteAgent = async (agentId: string) => {
    try {
      await api
        .delete<{ agentId: string }, ApiResponse>("agents", { agentId })
        .then(() => fetchAgents());
    } catch (error) {
      console.log("failed to delete:", error);
    }
  };

  const updateAccount = async (formData: AccountFormData) => {
    try {
      const { data } = await api.patch<AccountFormData, AccountApiResponse>(
        "accounts",
        formData
      );
      setAccount(data);
    } catch (error) {
      console.log("failed to update account", error);
    }
  };

  const handleCreateAgentBtn = () => {
    setIsNewAgentFormVisible(!isNewAgentFormVisible);
  };

  return (
    <div className="px-10">
      <div className="my-10">
        <h1 className="text-5xl">Settings</h1>
      </div>
      <h1 className="pt-2 text-2xl font-semibold">Account</h1>
      <span className="text-sm text-gray-800 bg-violet-200 px-3 my-1 rounded-full">
        {account?.accountId}
      </span>
      {account ? (
        <div className="py-2 my-4">
          <AccountSettings account={account} updateAccount={updateAccount} />
        </div>
      ) : (
        <Loading />
      )}

      <div className="flex justify-between">
        <h1 className="pt-2 text-2xl font-semibold">Agents</h1>

        <Button
          onClick={handleCreateAgentBtn}
          className="my-2 mx-4 px-4 py-2 rounded-xl bg-violet-800 text-gray-100 data-[disabled]:bg-gray-500"
        >
          {isNewAgentFormVisible ? "Cancel" : "Create New Agent"}
        </Button>
      </div>

      {isNewAgentFormVisible && (
        <div className="outline outline-amber-500 outline-2">
          <AgentSettingsForm
            agent={null}
            isLoading={isLoading}
            createAgent={createAgent}
          />
        </div>
      )}

      {agents && (
        <div className="py-2 my-4">
          {agents ? (
            agents.map((agent) => {
              return (
                <AgentSettingsForm
                  agent={agent}
                  updateAgent={updateAgent}
                  deleteAgent={deleteAgent}
                  isLoading={isLoading}
                  key={agent.agentId}
                >
                  <Posts agentId={agent.agentId} />
                </AgentSettingsForm>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  );
};
