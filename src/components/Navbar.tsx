import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/provider";
import { AuthService } from "@/utils/authService";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const Navbar = () => {
  const { user, setToken } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);
  const navigate = useNavigate();

  // const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    navigate("/");
    AuthService.logout();
    setToken(null);
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <nav className="flex flex-row justify-between">
      {/* right side */}
      <div className="flex gap-3">
        <NavLink to={"/"}>Autoblogger</NavLink>
        <NavLink to={"/auth/login"}>Docs</NavLink>
      </div>

      {/* left side */}
      <div className="flex justify-end gap-3">
        {/* LOGGED OUT MENU */}
        {!currentUser && (
          <>
            <NavLink to={"/auth/login"}>Get Started</NavLink>
            <NavLink to={"/auth/login"}>Sign in</NavLink>
          </>
        )}

        {/* LOGGED IN MENU */}
        {currentUser && (
          <>
            <Menu as="div" className="group">
              {({ open }) => (
                <>
                  <MenuButton className="justify-center w-full rounded-sm focus:outline-none group-hover:bg-blue-100">
                    {currentUser.firstName}
                  </MenuButton>
                  <MenuItems
                    anchor="bottom"
                    className="shadow-lg group-hover:block"
                  >
                    <MenuItem>
                      <NavLink
                        to={"/account"}
                        className="group-hover:block data-[focus]:bg-blue-100"
                      >
                        Account
                      </NavLink>
                    </MenuItem>

                    <button
                      className="block data-[focus]:bg-blue-100"
                      onClick={() => handleLogout()}
                    >
                      Sign Out
                    </button>
                  </MenuItems>
                </>
              )}
            </Menu>
          </>
        )}
      </div>
    </nav>
  );
};
