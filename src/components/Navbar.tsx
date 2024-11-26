import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/provider";
import { AuthService } from "@/utils/authService";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { NavBarLink } from "@/types";

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

  const navLinks: NavBarLink[] = [
    { label: "Home", to: "/", key: 1 },
    { label: "API", to: `api`, key: 2 },
  ];

  const signedInNavLinks: NavBarLink[] = [
    { label: "Account", to: "/account", key: 3 },
  ];
  const signedOutNavLinks: NavBarLink[] = [
    { label: "Get Started", to: "/auth/login", key: 4 },
    { label: "Sign In", to: "/auth/login", key: 5 },
  ];

  return (
    <nav className="bg-transparent dark:border-gray-700 max-w-4xl mx-auto">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Autoblogger
          </span>
        </NavLink>

        <div className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-inherit md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
          {navLinks.map(({ label, to, key }) => (
            <NavLink
              key={key}
              to={to}
              className={
                "block py-2 px-3 rounded md:bg-transparent md:p-0 md:dark:bg-transparent aria-[current=page]:text-violet-700"
              }
            >
              {label}
            </NavLink>
          ))}

          {!currentUser &&
            signedOutNavLinks.map(({ label, to, key }) => (
              <NavLink
                key={key}
                to={to}
                className={
                  "block py-2 px-3 rounded md:bg-transparent md:p-0 md:dark:bg-transparent aria-[current=page]:text-violet-700"
                }
              >
                {label}
              </NavLink>
            ))}

          {currentUser && (
            <Menu as="div" className="group">
              {({ open }) => (
                <>
                  <MenuButton className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-violet-700 md:p-0 md:w-auto ">
                    {currentUser?.firstName ? currentUser.firstName : "User"}
                    <svg
                      className={`w-2.5 h-2.5 ms-2.5 transform transition duration-150 ease-in-out ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </MenuButton>
                  {/* <!-- Dropdown menu --> */}
                  <MenuItems
                    anchor="bottom"
                    className="font-normal py-2 text-sm text-gray-700 dark:text-gray-400 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 group-hover:block"
                  >
                    {signedInNavLinks.map(({ label, to, key }) => (
                      <MenuItem>
                        <NavLink
                          key={key}
                          to={to}
                          className="block px-4 py-2 hover:bg-gray-100 aria-[current=page]:text-violet-700 text-center m-auto"
                        >
                          {label}
                        </NavLink>
                      </MenuItem>
                    ))}
                    <div className="py-1">
                      <Button
                        onClick={() => handleLogout()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 m-auto"
                      >
                        Sign out
                      </Button>
                    </div>
                  </MenuItems>
                </>
              )}
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
};
