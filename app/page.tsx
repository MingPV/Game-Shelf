export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-center justify-center font-bold">
          <div>This is Home Page</div>
          <div>button from daisyUI</div>
          <button className="btn bg-base-300">Click me</button>
        </div>
      </main>
    </>
  );
}
