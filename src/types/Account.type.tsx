import { Blog, Agent } from "@/types";
export type Account = {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  apiKey: string;
  apiKeyIndex: string;
  openAiApiKey: string,
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  Blogs: Blog[];
  Agents: Agent[];
};


export type AccountFormData = {
  accountId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  apiKey?: string;
  openAiApiKey?: string,
  Blogs?: Blog[];
}