import "./globals.css";
import UserHeader from "@/components/UserHeader";

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
      </body>
    </html>
  );
}
