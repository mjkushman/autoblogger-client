import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

import { Loading } from "@/components/Loading";
import {
  getAuthStatus,
  localStorageKey,
} from "@/utils/authService";

// this component should validate the token and redirect if invalid
export const RequireAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    const authStatus = await getAuthStatus();
    setIsAuth(authStatus);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === localStorageKey) checkAuth();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (isLoading) return <Loading />;
  if (!isAuth) return <Navigate to="/" replace />;

  return <Outlet />;
};
