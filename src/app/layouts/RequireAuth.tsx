import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../provider";

type Props = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: Props) => {
  console.log("Rendering RequireAuth Layout ");

  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  if (!userContext?.user) {
    navigate("/");
    return null;
  }

  return <>{children}</>;
};
