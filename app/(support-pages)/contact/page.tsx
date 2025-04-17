"use client";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center mb-32 w-full">
        <div className="flex flex-col items-center justify-center font-bold w-full">
          <form className="w-full max-w-xl p-12 rounded-2xl  bg-white/10 space-y-6">
            <h1 className="text-2xl font-bold text-center text-white/90 bg-transparent w-full">
              Get in touch
            </h1>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="frm-email"
                className="text-sm font-medium text-white/90 bg-transparent"
              >
                Email
              </label>
              <input
                id="frm-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="px-4 py-2 border border-white/90 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="frm-phone"
                className="text-sm font-medium text-white/90 bg-transparent"
              >
                Phone
              </label>
              <input
                id="frm-phone"
                type="text"
                name="phone"
                autoComplete="tel"
                required
                className="px-4 py-2 border border-white/90 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="frm-first"
                  className="text-sm font-medium text-white/90 bg-transparent"
                >
                  First Name
                </label>
                <input
                  id="frm-first"
                  type="text"
                  name="first"
                  autoComplete="given-name"
                  required
                  className="px-4 py-2 border border-white/90 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="frm-last"
                  className="text-sm font-medium text-white/90 bg-transparent"
                >
                  Last Name
                </label>
                <input
                  id="frm-last"
                  type="text"
                  name="last"
                  autoComplete="family-name"
                  required
                  className="px-4 py-2 border border-white/90 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="frm-message"
                className="text-sm font-medium text-white/90 bg-transparent"
              >
                Message
              </label>
              <textarea
                id="frm-message"
                name="message"
                rows={4}
                className="px-4 py-2 border border-white/90 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full btn btn-outline border-white opacity-80 text-white font-bold  py-2 px-4 rounded-md "
              >
                <p>Submit</p>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
