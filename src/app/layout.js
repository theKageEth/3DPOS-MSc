import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mr.UK",
  description: "Mr.UK Pizzeria Pasta",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
