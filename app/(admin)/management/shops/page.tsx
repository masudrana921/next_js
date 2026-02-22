"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/services/api/axiosClient";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          🛒 Our Shop
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {/* Image Preview */}
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>

            <div className="flex-grow">
              <h2 className="text-lg font-semibold">
                {product.name}
              </h2>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2">
                ৳ {product.price}
              </p>
            </div>

            <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2 rounded-lg transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}