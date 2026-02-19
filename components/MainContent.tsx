"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Eye, 
  ChevronRight,
  Filter,
  Grid,
  List,
  ArrowUpDown
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  isNew?: boolean;
}

export default function MainContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 124,
      image: "/headphones.jpg",
      badge: "-38%",
      isNew: false
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 299.99,
      rating: 4.8,
      reviews: 89,
      image: "/watch.jpg",
      isNew: true
    },
    {
      id: 3,
      name: "Premium Backpack",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.3,
      reviews: 56,
      image: "/backpack.jpg",
      badge: "-37%"
    },
    {
      id: 4,
      name: "Sneakers Running Shoes",
      price: 89.99,
      rating: 4.6,
      reviews: 203,
      image: "/shoes.jpg",
      isNew: true
    },
    {
      id: 5,
      name: "Laptop Stand",
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.4,
      reviews: 78,
      image: "/stand.jpg",
      badge: "-30%"
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 24.99,
      rating: 4.2,
      reviews: 145,
      image: "/mouse.jpg"
    },
    {
      id: 7,
      name: "Mechanical Keyboard",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.7,
      reviews: 67,
      image: "/keyboard.jpg",
      badge: "-27%"
    },
    {
      id: 8,
      name: "4K Monitor 27''",
      price: 399.99,
      rating: 4.9,
      reviews: 42,
      image: "/monitor.jpg",
      isNew: true
    }
  ];

  const categories = [
    { id: "all", name: "All Products", count: 245 },
    { id: "electronics", name: "Electronics", count: 89 },
    { id: "fashion", name: "Fashion", count: 67 },
    { id: "home", name: "Home & Living", count: 45 },
    { id: "sports", name: "Sports", count: 34 },
    { id: "books", name: "Books", count: 10 },
  ];

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/" className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-zinc-400" />
        <Link href="/shop" className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 text-zinc-400" />
        <span className="text-zinc-900 dark:text-white font-medium">All Products</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          All Products
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Showing 1-8 of 245 products
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }
              `}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Sort & View Controls */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`
                p-2 rounded-md transition-colors
                ${viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }
              `}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`
                p-2 rounded-md transition-colors
                ${viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }
              `}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Button */}
          <button className="lg:hidden p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={
        viewMode === 'grid'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {products.map((product) => (
          <div
            key={product.id}
            className={`
              group relative bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300
              ${viewMode === 'list' ? 'flex gap-6 p-4' : ''}
            `}
          >
            {/* Product Image */}
            <div className={`
              relative overflow-hidden rounded-xl
              ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}
            `}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 group-hover:scale-110 transition-transform duration-500" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full">
                    {product.badge}
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2 py-1 text-xs font-bold bg-green-500 text-white rounded-full">
                    NEW
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <Heart className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                </button>
                <button className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                  <Eye className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className={`
              ${viewMode === 'list' ? 'flex-1 py-2' : 'p-4'}
            `}>
              <div className="mb-2">
                <h3 className="font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Link href={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`
                        h-4 w-4
                        ${i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-zinc-300 dark:text-zinc-600'
                        }
                      `}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>

              {/* List View Additional Info */}
              {viewMode === 'list' && (
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 rounded-full border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
          Load More Products
        </button>
      </div>
    </div>
  );
}