import { Suspense, createContext, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/ErrorFallback";
import { User } from "@/types";

import * as jose from "jose";

type AppProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | null;
  setToken: (token: string) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setToken: () => {},
});

export const AppProvider = ({ children }: AppProviderProps) => {
  console.log("rendering AppProvider");
  // token state, and get initial token value (probably null)

  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("PROVIDER effect running");
    const updateUser = () => {
      console.log("PROVIDER updating user with token:", token);
      if (token) {
        const { firstName, lastName, email, accountId } = jose.decodeJwt(
          token
        ) as User;
        setUser({ firstName, lastName, email, accountId }); // decode token to set User
        console.log(`set user to ${JSON.stringify(user)}`);
      } else {
        setUser(null); // if no token, erase the user from context
      }
    };
    updateUser();
  }, [token]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <UserContext.Provider value={{ user, setToken }}>
          {children}
        </UserContext.Provider>
      </ErrorBoundary>
    </Suspense>
  );
};
