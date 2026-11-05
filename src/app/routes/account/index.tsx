import { AccountSettings } from "@/app/routes/account/AccountSettings";
import { AgentSettingsForm } from "@/app/routes/account/AgentSettings";
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
import { Button, Message } from "@/components";
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
  const [loadError, setLoadError] = useState(false);

  // fetch agents
  const fetchAgents = async () => {
    setIsLoading(true);
    await api
      .get<AgentsApiResponse>("agents")
      .then(({ data }) => {
        setAgents(data);
      })
      .catch(() => setLoadError(true))
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
      .catch(() => setLoadError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (user) {
      fetchAccount();
      fetchAgents();
    }
  }, [user]);

  const updateAgent = async (formData: UpdateAgentFormData): Promise<void> => {
    // Invoke API call
    try {
      await api
        .patch<UpdateAgentFormData, AgentApiResponse>(`agents`, formData)
        .then(() => fetchAgents());
    } catch (error) {
      console.log(`Failed to submit: ${error}`);
      throw error; // let the form show the error
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
      throw error; // let the form show the error
    }
  };

  const deleteAgent = async (agentId: string) => {
    try {
      await api
        .delete<{ agentId: string }, ApiResponse>("agents", { agentId })
        .then(() => fetchAgents());
    } catch (error) {
      console.log("failed to delete:", error);
      throw error; // let the dialog show the error
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
      throw error; // let the form show the error
    }
  };

  const handleCreateAgentBtn = () => {
    setIsNewAgentFormVisible(!isNewAgentFormVisible);
  };

  const skeleton = (
    <div className="space-y-4" aria-hidden="true">
      <div className="h-48 animate-pulse rounded-2xl bg-gray-200/70" />
      <div className="h-64 animate-pulse rounded-2xl bg-gray-200/70" />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 animate-fade-in">
      <h1 className="text-3xl font-semibold tracking-tight text-violet-950">Dashboard</h1>
      <p className="mt-1 text-gray-600">Manage your account and the AI authors writing for your site.</p>

      {loadError && (
        <div role="alert" className="mt-6">
          <Message inline title="We couldn't load your dashboard">
            Check your connection, then refresh the page to try again.
          </Message>
        </div>
      )}

      <section className="mt-10" aria-labelledby="account-heading">
        <h2 id="account-heading" className="mb-3 text-xl font-semibold text-gray-900">
          Account
        </h2>
        {account ? (
          <AccountSettings account={account} updateAccount={updateAccount} />
        ) : (
          !loadError && <div className="h-64 animate-pulse rounded-2xl bg-gray-200/70" aria-hidden="true" />
        )}
      </section>

      <section className="mt-12" aria-labelledby="agents-heading">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 id="agents-heading" className="text-xl font-semibold text-gray-900">
              Agents
            </h2>
            <p className="text-sm text-gray-500">Each agent is an AI author with its own voice and schedule.</p>
          </div>
          <Button
            variant={isNewAgentFormVisible ? "secondary" : "primary"}
            onClick={handleCreateAgentBtn}
            aria-expanded={isNewAgentFormVisible}
          >
            {isNewAgentFormVisible ? "Cancel" : "Create new agent"}
          </Button>
        </div>

        <div className="space-y-6">
          {isNewAgentFormVisible && (
            <div className="rounded-2xl ring-2 ring-violet-300 animate-fade-in-up">
              <AgentSettingsForm agent={null} isLoading={isLoading} createAgent={createAgent} />
            </div>
          )}

          {!agents && !loadError && skeleton}

          {agents && agents.length === 0 && !isNewAgentFormVisible && (
            <Message
              inline
              title="You don't have any agents yet"
              action={<Button onClick={handleCreateAgentBtn}>Create your first agent</Button>}
            >
              An agent is an AI author. Set its voice and schedule and it starts writing posts for your site.
            </Message>
          )}

          {agents?.map((agent) => (
            <AgentSettingsForm
              agent={agent}
              updateAgent={updateAgent}
              deleteAgent={deleteAgent}
              isLoading={isLoading}
              key={agent.agentId}
            >
              <Posts agentId={agent.agentId} />
            </AgentSettingsForm>
          ))}
        </div>
      </section>
    </div>
  );
};
