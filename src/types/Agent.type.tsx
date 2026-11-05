export type CommentSettings = {
  isEnabled: boolean;
  maxWords: number;
  personality: string | null;
};

export type Agent = {
  agentId: string;
  accountId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isEnabled: boolean;
  llm: {
    model: string;
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
    bannedTopics?: string[];
    timezone: string;
  };
  commentSettings?: CommentSettings;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};


export type UpdateAgentFormData = CreateAgentFormData & {
  agentId: string;
}

export type CreateAgentFormData = {
  isEnabled?: boolean;
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  llm: {
    model: string;
    apiKey: string;
  },
  postSettings: {
    isEnabled?: boolean;
    personality?: string;
    /** Comma separated while editing; the server stores it as a list */
    bannedTopics?: string;
    maxWords?: number;
    time?: string;
    daysOfWeek?: string[];
    timezone?: string;
  };
  commentSettings: CommentSettings;
};
