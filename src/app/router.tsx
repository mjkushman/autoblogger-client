import { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { UserContext } from "./provider";
import { User } from "@/types";
import api from "@/utils/api";
import { RequireAuth } from "./layouts/RequireAuth";
import { AccountRoot } from "./routes/account";
import { NewAgent } from "./routes/account/new-agent";

const createAppRouter = (user: User | null) => {
  return createBrowserRouter([
    // each route goes here
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { HomeRoute } = await import("./routes/home");
            return { Component: HomeRoute };
          },
        },
        {
          path: "account",
          element: <RequireAuth />,
          children: [
            {
              path: "",
              element: <AccountRoot />,
              loader: async () => {
                if (!user || !user.accountId) return null;
                return api.get(`accounts/`); // passes accountId as part of token
              },
            },
            {
              path: "new-agent",
              element: <NewAgent />,
              loader: async () => {
                if (!user || !user.accountId) return null;
                return api.get(`accounts/`); // passes accountId as part of token
              },
            },
          ],
        },
        {
          path: "docs",
          element: <>Docs home placeholder</>,
        },
      ],
    },
    {
      path: "/auth",
      element: <Outlet />, // a different layout
      children: [
        {
          path: "",
          element: <Navigate to="/auth/login" replace />, // redirects home
        },
        {
          path: "login",
          lazy: async () => {
            const { LoginRoute } = await import("./routes/auth/login");
            return { Component: LoginRoute };
          },
        },
      ],
    },

    // catch all not found routes
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./routes/not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);
};

export const AppRouter = () => {
  const context = useContext(UserContext);
  const user = context ? context.user : null;
  const router = createAppRouter(user);

  return <RouterProvider router={router} />;
};
