import { Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { UserContext } from "./provider";
import { User } from "@/types";
import api from "@/utils/api";
import { RequireAuth } from "@/app/layouts/RequireAuth";
import { AccountRoot } from "@/app/routes/account";
import { ApiResponse } from "@/types/Api.type";
import { Loading } from "@/components/Loading";
import { siteLinks } from "@/utils/siteLinks";
import Post from "@/components/PostView";
import { type RouteConfig } from "";

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
              path: ":postId",
              element: (
                <Suspense fallback={<Loading />}>
                  <Post />
                </Suspense>
              ),
              loader: async ({ params }) => {
                const { data } = await api.get<Promise<ApiResponse>>(
                  `posts/${params.postId}`
                );
                return data;
              },
            },
          ],
        },
        {
          path: siteLinks.api.path,
          lazy: async () => {
            const { Redoc } = await import("./routes/redoc");
            return { Component: Redoc };
          },
        },
      ],
    },
    {
      path: siteLinks.auth.path,
      lazy: async () => {
        const { LoginRoute } = await import("./routes/auth");
        return { Component: LoginRoute };
      },
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
