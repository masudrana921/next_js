"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sideber"; // বানান ঠিক করা হয়েছে
import AuthChecker from "@/components/AuthChecker"; // Import

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      <Header />

      <div className="flex flex-1">
        
        {/* Sidebar Left */}
        <Sidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">

          {/* AuthChecker wrap */}
          <AuthChecker>
            {children}
          </AuthChecker>

        </main>

      </div>
     
    </div>
  );
}
