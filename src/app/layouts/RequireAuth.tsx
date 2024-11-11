import { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { UserContext } from "../provider";


export const RequireAuth = () => {
  console.log("Rendering RequireAuth Layout ");

  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  if (!userContext?.user) {
    navigate("/");
    return null;
  }

  return <Outlet/>;
};
