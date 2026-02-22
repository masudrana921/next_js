"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home,
  ShoppingBag,
  Grid,
  Tag,
  Package,
  Heart,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  TrendingUp,
  Award,
  X
} from "lucide-react";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", icon: Home, href: "/management" },
    { id: "shop", label: "Shop", icon: ShoppingBag, href: "/management/shops" },
    { id: "categories", label: "Categories", icon: Grid, href: "/categories" },
    { id: "deals", label: "Deals", icon: Tag, href: "/orders", badge: "HOT" },
    { id: "orders", label: "Orders", icon: Package, href: "/management/orders" },
    { id: "wishlist", label: "Wishlist", icon: Heart, href: "/wishlist", count: 2 },
    { id: "recent", label: "Recently Viewed", icon: Clock, href: "/recent" },
  ];

  const categories = [
    { name: "Electronics", count: 245, icon: "📱" },
    { name: "Fashion", count: 532, icon: "👕" },
    { name: "Home & Living", count: 189, icon: "🏠" },
    { name: "Sports", count: 124, icon: "⚽" },
    { name: "Books", count: 876, icon: "📚" },
    { name: "Toys", count: 167, icon: "🎮" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header - Mobile Only */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="font-semibold text-zinc-900 dark:text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-3 mb-6">
              <p className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Menu
              </p>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.id);
                      onClose();
                    }}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${activeItem === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded">
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Categories Section */}
            <div className="px-3 mb-6">
              <p className="px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Categories
              </p>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/category/${category.name.toLowerCase()}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={onClose}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Special Offers */}
            <div className="px-3 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                <TrendingUp className="h-6 w-6 text-white mb-2" />
                <h4 className="font-semibold text-white mb-1">Summer Sale</h4>
                <p className="text-sm text-white/80 mb-3">Up to 70% off</p>
                <button className="text-xs font-medium text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                  Shop Now →
                </button>
              </div>
            </div>

            {/* Footer Links */}
            <div className="px-3 pb-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              {[
                { icon: Award, label: "Premium", href: "/premium" },
                { icon: HelpCircle, label: "Help & Support", href: "/help" },
                { icon: Settings, label: "Settings", href: "/settings" },
                { icon: LogOut, label: "Logout", href: "/logout" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors mb-1"
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}