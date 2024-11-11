export type Agent = {
  agentId: string;
  accountId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isEnabled: boolean;
  postSettings: {
    llm: string;
    maxWords: number;
    time: string,
    daysOfWeek: string[],
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

// export default Agent;
