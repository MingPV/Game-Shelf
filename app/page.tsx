import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>button from daisyUI</div>
          <button className="btn bg-base-300">Click me</button>
          <div>{user?.email}</div>
        </div>
      </main>
    </>
  );
}
