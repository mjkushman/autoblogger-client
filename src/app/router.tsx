import { useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

type AppRouterProps = {
  children: React.ReactNode;
};

const createAppRouter = () => {
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
          element: <>Account home placeholder</>,
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
          path: "register",
          lazy: async () => {
            const { RegisterRoute } = await import("./routes/auth/register");
            return { Component: RegisterRoute };
          },
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
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
