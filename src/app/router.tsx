import { Suspense, useContext } from "react";
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
import { ApiResponse } from "@/types/Api.type";
import { Loading } from "@/components/Loading";

// type Props = {
//   user: User | null
// }

const createAppRouter = (user: User) => {
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
          element: (
            <Suspense fallback={<Loading />}>
              <RequireAuth />
            </Suspense>
          ),
          children: [
            {
              path: "",
              element: <AccountRoot user={user} />,
              loader: async () => {
                if (!user || !user.accountId) return null;
                const { data } = await api.get<Promise<ApiResponse>>(
                  `accounts/`
                ); // passes accountId as part of token
                return data;
              },
            },
            {
              path: "new-agent",
              element: <NewAgent />,
              loader: async () => {
                if (!user || !user.accountId) return null;
                const { data } = await api.get<Promise<ApiResponse>>(
                  `accounts/`
                ); // passes accountId as part of token
                return data;
              },
            },
          ],
        },
        {
          path: "api",
          lazy: async () => {
            const { Redoc } = await import("./routes/redoc");
            return { Component: Redoc };
          },
        },
      ],
    },
    {
      path: "/auth",
      element: <Outlet />,
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
