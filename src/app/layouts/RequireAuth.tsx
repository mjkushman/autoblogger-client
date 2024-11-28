import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../provider";

export const RequireAuth = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.user) {
      navigate("/");
    }
  }, [userContext]);
  
  return <Outlet />;
};
