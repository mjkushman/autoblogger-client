import { AccountSettings } from "@/app/routes/account/AccountSettings";
import { AgentSettingsForm } from "@/app/routes/account/AgentSettings";
import { Loading } from "@/components/Loading";
import {
  Account,
  Agent,
  User,
  AgentsApiResponse,
  AgentApiResponse,
  AgentFormData,
  ApiResponse,
} from "@/types";
import { AccountFormData } from "@/types/Account.type";
import { AccountApiResponse, PostsApiResponse, Post } from "@/types";
import api from "@/utils/api";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  user: User;
};
export const AccountRoot = ({ user }: Props) => {
  // const account = useLoaderData() as Account;
  const navigate = useNavigate();
  const agentLimit = 100;

  const [agents, setAgents] = useState<Agent[]>();
  const [account, setAccount] = useState<Account>();
  const [posts, setPosts] = useState<Post[]>();

  // show or hide New Agent form
  const [isNewAgentFormVisible, setIsNewAgentFormVisible] = useState(false);

  // fetch agents
  const fetchAgents = async () => {
    const { data } = await api.get<AgentsApiResponse>("agents");
    setAgents(data);
  };
  // fetch Account
  const fetchAccount = async () => {
    const { data } = await api.get<AccountApiResponse>("accounts");
    setAccount(data);
  };
  // fetch Account
  const fetchPosts = async () => {
    const { data } = await api.get<PostsApiResponse>("posts");
    console.log('post fetch result:', data)
    setPosts(data);
  };

  useEffect(() => {
    fetchAgents();
    fetchAccount();
    fetchPosts()
  }, [user]);

  useEffect(() => {
    setAgents(() => agents);
  }, [agents]);
  useEffect(() => {
    setAccount(() => account);
  }, [account]);

  const updateAgent = async (formData: AgentFormData): Promise<void> => {
    // Invoke API call
    try {
      await api.patch<AgentFormData, AgentApiResponse>(`agents`, formData);
      fetchAgents();
    } catch (error) {
      console.log(`Failed to submit: ${error}`);
    }
  };

  const createAgent = async (formData: AgentFormData): Promise<void> => {
    try {
      await api
        .post<AgentFormData, AgentApiResponse>(`agents`, formData)
        .then(() => setIsNewAgentFormVisible(false));
      fetchAgents();
    } catch (error) {
      console.log(`Failed to create Agent: ${error}`);
    }
  };

  const deleteAgent = async (agentId: string) => {
    try {
      await api.delete<{ agentId: string }, ApiResponse>("agents", { agentId });
      fetchAgents();
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
          disabled={account?.Agents?.length >= agentLimit}
          className="my-2 mx-4 px-4 py-2 rounded-xl bg-violet-800 text-gray-100 data-[disabled]:bg-gray-500"
        >
          {isNewAgentFormVisible ? "Cancel" : "Create New Agent"}
        </Button>
      </div>

      {isNewAgentFormVisible && (
        <div className="outline outline-amber-500 outline-2">
        <AgentSettingsForm
          agent={null}
          createAgent={createAgent}
          updateAgent={updateAgent}
          deleteAgent={deleteAgent}
        />
        </div>
      )}

      <div className="py-2 my-4">
        {agents ? (
          agents.map((agent) => {
            return (
              <AgentSettingsForm
                agent={agent}
                updateAgent={updateAgent}
                deleteAgent={deleteAgent}
                key={agent.agentId}
                posts= {posts?.filter(p => p.agentId == agent.agentId)}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      <div className="flex flex-auto m-auto justify-center">
        FETCHED POSTS

      </div>
    </div>
  );
};
