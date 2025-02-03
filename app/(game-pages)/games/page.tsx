import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SearchItems } from "@/components/search-items";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <SearchItems />
      </main>
    </>
  );
}
