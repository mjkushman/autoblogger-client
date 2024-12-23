import { createContext } from "react";
type UserContextType = {
  user: User | null;
  setToken: (token: string) => void;
};


const UserContext = createContext<UserContextType>({
  user: null,
  setToken: () => {},
});
export default UserContext;