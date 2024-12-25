import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import UserContext from "@/app/contexts/UserContext";

// this component should validate the token and redirect if invalid
export const RequireAuth = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [hasUser, setHasUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { user } = context;
    if (!user) {
      return navigate("/");
    }
    setHasUser(true);
    setIsLoading(false);
  }, [context]);

  if (!isLoading && hasUser) return <Outlet />;
};
