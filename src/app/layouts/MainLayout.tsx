import { Link, Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { siteLinks } from "@/utils/siteLinks";

export const MainLayout = () => (
  <div className="flex min-h-screen flex-col bg-gray-50 leading-relaxed text-gray-900">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
      <span>© {new Date().getFullYear()} Autoblogger</span>
      <span className="mx-2" aria-hidden="true">·</span>
      <Link to={siteLinks.api.path} className="transition hover:text-violet-800">
        API docs
      </Link>
    </footer>
  </div>
);
