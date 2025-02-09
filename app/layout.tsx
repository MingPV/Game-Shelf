import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/navbar";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={""} suppressHydrationWarning>
      <body className="bg-gs_bg_gradient bg-fixed text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col  items-center">
              <Navbar />
              <div className="flex flex-col flex-1 p-5 w-full">{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
