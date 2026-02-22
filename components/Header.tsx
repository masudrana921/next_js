"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Moon,
  Sun
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout } from "@/services/api/auth";
import { useEffect } from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  const [username, setUsername] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username || null);           
      setProfileImage(user.profile_image || null);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    // Remove tokens from cookies (if your app uses cookies)
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Show success message
    toast.success("Logged out successfully");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
  

      <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
            </button>

            {/* Logo */}
            <Link href="/management" className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-30 blur" />
                <ShoppingBag className="relative h-6 w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center ml-8">
              <ul className="flex items-center gap-1">
                {[
                  { name: "Home", href: "/" },
                  { name: "Shop", href: "/shop", hasDropdown: true },
                  { name: "Categories", href: "/categories", hasDropdown: true },
                  { name: "Deals", href: "/deals", badge: "HOT" },
                  { name: "New Arrivals", href: "/new" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
                      )}
                      {item.badge && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Mobile Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden lg:block p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              ) : (
                <Moon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              )}
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden lg:flex items-center gap-1 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
            >
              <Heart className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs font-medium text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="User menu"
              >
                <div className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={username || "User"}
                      className="h-8 w-8 object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <span className="hidden lg:block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {username || "Guest"}
                </span>
                <ChevronDown className="hidden lg:block h-4 w-4 text-zinc-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg py-1">
                  {[
                    { icon: User, label: "Profile", href: "/management/profile" },
                    { icon: Package, label: "Orders", href: "/management/orders" },
                    { icon: Heart, label: "Wishlist", href: "/wishlist" },
                    { icon: Settings, label: "Settings", href: "/settings" },
                    { icon: LogOut, label: "Logout", onClick: handleLogout },
                  ].map((item) => (
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={item.label}
                        onClick={item.onClick}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full text-left"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t border-zinc-200 dark:border-zinc-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            </div>
          </div>
        )}
      </div>

    </header>
  );
}