import {Blog, Agent} from '@/types'
type Account = {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  apiKey: string;
  apiKeyIndex: string;
  imageUrl: string;
  createdAt: Date,
  updatedAt: Date;
  Blogs: Blog[],
  Agents: Agent[]
};
export default Account