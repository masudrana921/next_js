import "./globals.css";
import UserHeader from "@/components/UserHeader";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ShopHub",
  description: "Ecommerce Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        {/* Header */}

        {/* Page Content */}
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: '#22c55e',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
