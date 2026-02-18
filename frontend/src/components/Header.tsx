import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import logo from "@/assets/Logo.svg";

export function Header() {
  const { user } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-50">
      <img src={logo} alt="Financy" className="h-8" />

      <nav className="flex items-center gap-8">
        <Link 
          to="/dashboard" 
          className={`text-sm font-inter font-semibold transition-colors ${
            isActive("/dashboard") ? "text-brand-base border-brand-base py-5" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Dashboard
        </Link>
        <Link to="/transactions" 
          className={`text-sm font-inter font-semibold transition-colors ${
            isActive("/transactions") ? "text-brand-base border-brand-base py-5" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Transações
        </Link>
        <Link to="/categories" 
          className={`text-sm font-inter font-semibold transition-colors ${
            isActive("/categories") ? "text-brand-base border-brand-base py-5" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Categorias
        </Link>
      </nav>

      <Link 
        to="/profile" 
        className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold hover:bg-gray-200 transition-all overflow-hidden"
      >
        {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
      </Link>
    </header>
  );
}