import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import IconMenu from "./iconmenu"; // Assuming you have an IconMenu component

interface GotoPageProps {
  icon: React.ReactNode; // Icon component
  announce: string; // Dynamic announcement text
  topage: string; // Destination page path (e.g., "/inventory", "/dashboard")
  setWindow: Dispatch<SetStateAction<string>>; // Function to set the window
  type: string; // Type to pass to IconMenu
}

export default function GotoPage({
  icon,
  announce,
  topage,
  setWindow,
  type,
}: GotoPageProps) {
  return (
    <div className="bg-white bg-opacity-10 rounded-xl p-6 md:px-8 mx-4 flex-col flex justify-center items-center w-full">
      <div className="text-9xl opacity-50 p-6">{icon}</div>{" "}
      {/* Display the icon passed as a prop */}
      <p className="text-lg text-gs_white pt-6">{announce}</p>{" "}
      {/* Dynamic announcement */}
      {/* Button to go to the destination page */}
      <Link href={topage}>
        <button className="mt-4 px-6 py-2 btn btn-outline  text-white rounded-lg ">
          Go to {topage.replace("/", "").toUpperCase()} Page
        </button>
      </Link>
    </div>
  );
}
