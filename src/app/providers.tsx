import React, { Suspense } from "react";

import UserProvider from "@/providers/UserProvider";
import { Loading } from "@/components/Loading";
// import { useContext } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  //   const user = useContext(UserProvider)
  return (
    <Suspense fallback={<Loading />}>
      <UserProvider>
        <Suspense fallback={<Loading />}></Suspense>
        {children}
      </UserProvider>
    </Suspense>
  );
};

export default Providers;
