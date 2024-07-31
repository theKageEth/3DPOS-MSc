import { Quicksand } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Mr.UK",
  description: "Mr.UK Pizzeria Pasta",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={quicksand.className}>
        <SessionProvider>
          <div className="relative overflow-x-hidden">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
