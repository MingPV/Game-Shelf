import AuthButton from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

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
      <body className="bg-neutral-900 text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col  items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-neutral-800">
                <div className="w-full max-w-5xl flex justify-between items-center p-3  text-sm">
                  <Link href="/"> GameShelf </Link>
                  <div className="flex flex-row">
                    <div className="flex flex-row gap-4 items-center px-4">
                      {" "}
                      <div className="text-xs">Home</div>
                      <div className="text-xs">Explore</div>
                      <div className="text-xs">Personal Collection</div>
                      <div className="text-xs">Drops</div>
                      <div className="text-xs">More</div>
                    </div>
                    <AuthButton />
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
