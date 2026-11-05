import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import UserContext from "@/app/contexts/UserContext";
import { AuthService } from "@/utils/authService";
import { navLinks, signedInNavLinks, signedOutNavLinks } from "@/utils/siteLinks";
import { buttonClasses } from "@/components/Button";

const desktopLink = ({ isActive }: { isActive: boolean }) =>
  classNames(
    "relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-violet-700 after:transition-transform after:duration-200",
    isActive
      ? "text-violet-900 after:scale-x-100"
      : "text-gray-600 hover:text-violet-900 after:scale-x-0 hover:after:scale-x-100"
  );

const mobileLink = ({ isActive }: { isActive: boolean }) =>
  classNames(
    "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
    isActive ? "bg-violet-50 text-violet-900" : "text-gray-700 hover:bg-gray-100"
  );

export const Navbar = () => {
  const { user, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    AuthService.logout();
    navigate("/", { replace: true });
  };

  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-40 border-b border-gray-200/70 bg-gray-50/80 backdrop-blur-md"
    >
      {({ open, close }) => (
        <>
          <nav
            aria-label="Main"
            className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6"
          >
            <Link to="/" className="flex items-center gap-2.5" onClick={() => close()}>
              <img src="/favicon-32x32.png" alt="" className="size-7 rounded-md" />
              <span className="text-lg font-semibold tracking-tight text-violet-950">
                Autoblogger
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map(({ label, path, id }) => (
                <NavLink key={id} to={path} className={desktopLink}>
                  {label}
                </NavLink>
              ))}

              {user ? (
                <Menu as="div">
                  <MenuButton className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-violet-900 data-[open]:bg-gray-100">
                    Account
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-4 text-gray-400 transition-transform duration-150 group-data-[open]:rotate-180"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </MenuButton>
                  <MenuItems
                    anchor="bottom end"
                    transition
                    className="z-50 w-48 origin-top-right rounded-xl bg-white p-1.5 text-sm text-gray-700 shadow-lg ring-1 ring-black/5 transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                    {signedInNavLinks.map(({ label, path, id }) => (
                      <MenuItem key={id}>
                        <Link
                          to={path}
                          className="block rounded-lg px-3 py-2 data-[focus]:bg-violet-50 data-[focus]:text-violet-900"
                        >
                          {label}
                        </Link>
                      </MenuItem>
                    ))}
                    <div className="my-1 h-px bg-gray-100" />
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full rounded-lg px-3 py-2 text-left data-[focus]:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to={signedOutNavLinks[1].path} className={buttonClasses("ghost", "sm")}>
                    {signedOutNavLinks[1].label}
                  </Link>
                  <Link to={signedOutNavLinks[0].path} className={buttonClasses("primary", "sm")}>
                    {signedOutNavLinks[0].label}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <DisclosureButton
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="size-6" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </DisclosureButton>
          </nav>

          {/* Mobile menu */}
          <DisclosurePanel
            transition
            className="origin-top border-t border-gray-200/70 px-4 pb-4 pt-2 transition duration-150 ease-out data-[closed]:-translate-y-2 data-[closed]:opacity-0 md:hidden"
          >
            <div className="space-y-1">
              {navLinks.map(({ label, path, id }) => (
                <NavLink key={id} to={path} className={mobileLink} onClick={() => close()}>
                  {label}
                </NavLink>
              ))}
              {user ? (
                <>
                  {signedInNavLinks.map(({ label, path, id }) => (
                    <NavLink key={id} to={path} className={mobileLink} onClick={() => close()}>
                      {label}
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      close();
                      handleLogout();
                    }}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link to={signedOutNavLinks[1].path} onClick={() => close()} className={buttonClasses("secondary", "md", "flex-1")}>
                    {signedOutNavLinks[1].label}
                  </Link>
                  <Link to={signedOutNavLinks[0].path} onClick={() => close()} className={buttonClasses("primary", "md", "flex-1")}>
                    {signedOutNavLinks[0].label}
                  </Link>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
