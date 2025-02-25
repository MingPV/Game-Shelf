import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 mt-56">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>Welcome back admin</div>

          <Link
            className="mt-2 btn btn-outline btn-primary"
            href="/manage-provider"
          >
            Manage Provider
          </Link>
        </div>
      </main>
    </>
  );
}
