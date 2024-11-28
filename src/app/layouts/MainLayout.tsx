import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";


export const MainLayout = () => {
  return (
    <div className="bg-gray-50 p-0 text-gray-950 leading-relaxed">
      <div className="mx-auto">
        <Navbar />
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
