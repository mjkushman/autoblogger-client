import { createContext } from "react";
import {User} from "@/types"
type UserContextType = {
  user: User | null;
  setToken: (token: string | null) => void;
};


const UserContext = createContext<UserContextType>({
  user: null,
  setToken: () => {},
});
export default UserContext;