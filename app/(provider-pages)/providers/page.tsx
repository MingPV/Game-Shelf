import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center mb-32">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>Provider Page</div>
        </div>
      </main>
    </>
  );
}
