import { Suspense } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

import api from "@/utils/api";
import { RequireAuth } from "@/app/layouts/RequireAuth";
import { AccountRoot } from "@/app/routes/account";
import { ApiResponse } from "@/types/Api.type";
import { Loading } from "@/components/Loading";
import { siteLinks } from "@/utils/siteLinks";
import Post from "@/components/PostView";
import ErrorPage from "@/components/ErrorPage";

export const AppRouter = () => {
  

  const routes: RouteObject[] = [
    // each route goes here
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
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
              element: (
                <Suspense fallback={<Loading />}>
                  <AccountRoot />
                </Suspense>
              ),
              errorElement: <ErrorPage />,

            },
            {
              path: ":postId",
              element: (
                <Suspense fallback={<Loading />}>
                  <Post />
                </Suspense>
              ),
              errorElement: <ErrorPage />,
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
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_normalizeFormMethod: true,
    },
  });

  return <RouterProvider router={router} />;
};
