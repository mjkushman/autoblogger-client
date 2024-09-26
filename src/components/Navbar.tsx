import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/provider";
import { AuthService } from "@/utils/authService";

export const Navbar = () => {
  const { user, setToken } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    setToken(null);
    navigate("/");
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <nav className="flex justify-end gap-3">
      {user?.email}
      <NavLink to={"/auth/login"}>Docs</NavLink>
      {!currentUser && <NavLink to={"/auth/login"}>Sign in</NavLink>}
      {currentUser && (
        <>
          <NavLink to={"#"} onClick={() => handleLogout()}>
            Sign out
          </NavLink>
          <NavLink to={"#"}>Account</NavLink>
        </>
      )}
    </nav>
  );
};
