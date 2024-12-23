import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import UserContext from "@/app/contexts/UserContext";
import { Loading } from "@/components/Loading";

// this component should validate the token and redirect if invalid
export const RequireAuth = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [hasUser, setHasUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { user } = context;
    if (user) {
      setHasUser(true);
    }
    setIsLoading(false);
  }, [context]);

  if (isLoading) return <Loading />;

  if (hasUser) return <Outlet />;

  return navigate("/");
};
