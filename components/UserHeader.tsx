"use client";

import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";

interface UserHeaderProps {
  cartItemCount?: number; // Cart এর item count দেখানোর জন্য
}

export default function UserHeader({ cartItemCount = 0 }: UserHeaderProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Products
            </a>
            <a href="#" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Categories
            </a>
            <a href="#" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Deals
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Heart className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button className="relative p-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Sign In */}
            <Link href="/login">
              <button className="hidden sm:block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
