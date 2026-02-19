"use client";
import { useRouter } from "next/navigation"; // Next.js 13+ useRouter
import React, { useState } from "react";
import Cookies from "js-cookie";
import api from "@/services/api/axiosClient";
import Link from "next/link"; // 

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/token/", { username, password });

      // Access এবং Refresh Token সেভ করা
      Cookies.set("access", response.data.access);
      Cookies.set("refresh", response.data.refresh);

      // লগইন সফল হলে চাইলে রিডিরেক্ট
      console.log("Login successful!");
          // Redirect based on roles
          
      const user = response.data.user;
      console.log(user);


      if (user.is_staff == true && user.is_superuser == true) {
        router.push("/management"); // Staff + Superuser → Management
      } else {
        router.push("/"); // Active normal user → Landing page
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?  <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
