import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "@/provider/CartProvider";

export const metadata: Metadata = {
  title: "Zeor Lifestyle - Premium Quality Products",
  description: "A concept website for Zero Lifestyle products, Created by MuhammadAwaisWebDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
