export type Agent = {
  agentId: string;
  accountId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isEnabled: boolean;
  llm: {
    model: "chatgpt" | "claude";
    apiKey: string;
  },
  postSettings: {
    llm: string;
    maxWords: number;
    time: string;
    daysOfWeek: string[];
    isEnabled: boolean;
    cronSchedule: string;
    displaySchedule: string;
    personality: string;
    timezone: string;
  };
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AgentFormData = {
  agentId: string;
  isEnabled?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  llm: {
    model: "chatgpt" | "claude";
    apiKey: string;
  },
  postSettings: {
    isEnabled?: boolean;
    personality?: string;
    maxWords?: number;
    time?: string;
    daysOfWeek?: string[];
    timezone?: string;
  };
};
