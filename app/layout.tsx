import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { TodoProvider } from "./context/TodoContext";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do App",
  description: "A simple to-do app built with Next.js, TypeScript, Tailwind CSS and Shadcn UI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col p-3">
        <Providers>
          <TodoProvider>
          <Navbar />
          {children}
          <Footer />
          </TodoProvider>
        </Providers>
      </body>
    </html>
  );
}
