import Image from "next/image";
import { ShoppingBag, Star, Truck, Shield, RefreshCw, Heart } from "lucide-react";
import Link from "next/link";
import UserHeader from "@/components/UserHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <UserHeader />
    
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-black dark:to-zinc-950">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Summer Sale - Up to 70% Off
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="block text-zinc-900 dark:text-white">
                    Discover Your
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Perfect Style
                  </span>
                </h1>
                
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0">
                  Explore our curated collection of premium products designed to elevate your everyday life. Quality meets affordability.
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-medium text-white hover:opacity-90 transition-opacity">
                    Search
                  </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                  <div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">50K+</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Happy Customers</div>
                  </div>
                  <div className="h-12 w-px bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">10K+</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Products</div>
                  </div>
                  <div className="h-12 w-px bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">4.8</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Average Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Product Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform z-20">
                      <p className="font-semibold">Product Name</p>
                      <p className="text-sm opacity-90">$49.99</p>
                    </div>
                    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
                { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
                { icon: RefreshCw, title: "30-Day Returns", desc: "Easy returns policy" },
                { icon: Star, title: "Premium Quality", desc: "Hand-picked products" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white dark:bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                Shop by Category
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Find exactly what you're looking for
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "Electronics", "Fashion", "Home", "Sports", "Books", "Toys"
              ].map((category, i) => (
                <a
                  key={i}
                  href="#"
                  className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex items-end justify-center text-center hover:scale-105 transition-transform duration-300"
                >
                  <span className="text-white font-semibold text-lg z-10">{category}</span>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                  Featured Products
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
                  Most popular items this week
                </p>
              </div>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                View All →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="group relative rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 group-hover:scale-110 transition-transform duration-500" />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Heart className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    </button>
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -20%
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Product Name {item}</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2">(124)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">$39.99</span>
                        <span className="text-sm text-zinc-500 line-through ml-2">$49.99</span>
                      </div>
                      <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">ShopHub</span>
              </div>
              <p className="text-zinc-400 text-sm">
                Your one-stop shop for everything you need. Quality products, amazing prices.
              </p>
            </div>
            {[
              {
                title: "Shop",
                links: ["All Products", "Categories", "Deals", "New Arrivals"]
              },
              {
                title: "Support",
                links: ["Contact Us", "FAQs", "Shipping", "Returns"]
              },
              {
                title: "Company",
                links: ["About Us", "Blog", "Careers", "Press"]
              },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-sm text-zinc-400">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}