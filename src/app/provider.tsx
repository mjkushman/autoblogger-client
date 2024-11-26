import { Suspense, createContext, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/ErrorFallback";
import { User } from "@/types";
import { Loading } from "@/components/Loading";

import * as jose from "jose";

type AppProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User | null;
  setToken: (token: string) => void;
};

const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

export const UserContext = createContext<UserContextType>({
  user: null,
  setToken: () => {},
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const updateUser = async () => {
      if (token) {
        // verify and set user if good
        jose.jwtVerify<User>(token, secret).then(
          ({ payload }) => {
            setUser(payload);
            console.log("SETTING USER TO PAYLOAD:", payload);
          },
          (error: jose.errors.JOSEError) => {
            if (error instanceof jose.errors.JWTExpired) {
              // TODO: add logic to refresh token
              // console.log("token expired. Do logic to refresh token.");
            } else setUser(null);
          }
        );
      } else {
        setUser(null); // if no token, erase the user from context
      }
    };
    updateUser();
  }, [token]);

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <UserContext.Provider value={{ user, setToken }}>
          {children}
        </UserContext.Provider>
      </ErrorBoundary>
    </Suspense>
  );
};
