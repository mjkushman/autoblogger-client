type Agent = {
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
    isEnabled: boolean;
    cronSchedule: string;
    displaySchedule: string;
  };
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export default Agent;
