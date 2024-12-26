import React, { Suspense } from "react";

import UserProvider from "@/providers/UserProvider";
import { Loading } from "@/components/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/ErrorFallback";
// import { useContext } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  //   const user = useContext(UserProvider)
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <UserProvider>
          <Suspense fallback={<Loading />}>
          {children}
          </Suspense>
        </UserProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Providers;
