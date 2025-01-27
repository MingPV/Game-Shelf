import AuthButton from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoNotifications } from "react-icons/io5";
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
      <body className="bg-gs_bg_gradient text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col  items-center">
              <nav className="w-full flex justify-center  h-16">
                <div className="w-full max-w-[95vw] flex justify-center items-center p-3  text-sm ">
                  <div className="navbar ">
                    <div className="flex flex-row gap-4 w-full">
                      <Link href="/" className="text-xl font-bold">
                        GameShelf
                      </Link>
                      <Input
                        placeholder="Search Board game by name or desc ..."
                        className="rounded-full border border-1-gs_white"
                      />
                    </div>
                    <div className="flex-none flex flex-row justify-evenly items-center px-4 ">
                      <ul className="menu menu-horizontal px-1">
                        <li>
                          <Link href="/">Home</Link>
                        </li>
                        <li>
                          <Link href="/">Explore</Link>
                        </li>
                        <li>
                          <Link href="/">Personal Collection</Link>
                        </li>
                        <li>
                          <Link href="/">Drops</Link>
                        </li>

                        <li>
                          <details>
                            <summary>More</summary>
                            <ul className="rounded-t-none p-2 bg-opacity-30">
                              <li>
                                <Link href="/">Stats</Link>
                              </li>
                              <li>
                                <Link href="/">Edit profile</Link>
                              </li>
                            </ul>
                          </details>
                        </li>
                      </ul>
                    </div>
                    <div className="w-full flex flex-row  justify-end gap-4">
                      <IoNotifications className="text-gs_white text-xl" />
                      <Button className="border border-gs_white rounded-lg px-4 py-2">
                        Wallet
                      </Button>
                      <AuthButton />
                    </div>
                  </div>
                </div>
              </nav>
              <div className="flex flex-col flex-1 p-5 w-full">{children}</div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
