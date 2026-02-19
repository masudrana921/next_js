"use client";

import { useState } from "react";

import MainContent from "@/components/MainContent";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
     
      
      <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <MainContent />
        </div>
      </div>
    </div>
  );
}