import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router";


export const MainLayout = () => {
  console.log("Rendering MainLayout ");

  return (
    <div className="bg-gray-50 p-0 text-gray-950">
      <div className="max-w-4xl mx-auto">
        <Navbar />
        <main className="p-3 display-flex">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
