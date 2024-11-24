import { Account } from "./Account.type"
import { Agent } from "./Agent.type"

export type CreateAccountResponse = {
    token: string
}
export type LoginResponse = {
    token: string
}

export type ApiResponse<T = string> = {
    status: number;
    message?: string;
    data: T;
  };

export type AgentsApiResponse = ApiResponse<Agent[]>
export type AgentApiResponse = ApiResponse<Agent>
export type AccountApiResponse = ApiResponse<Account>