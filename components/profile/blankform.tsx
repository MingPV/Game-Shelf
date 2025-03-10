"use client";
import { Dispatch, SetStateAction } from "react";
import IconMenu from "./iconmenu";
export default function Blankform({
  type,
  setWindow,
}: {
  type: string;
  setWindow: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div className="bg-white bg-opacity-10 rounded-xl p-6 md:px-8 mx-4 flex-col flex justify-center items-center w-full">
        <div className="flex justify-between items-center w-full flex-col">
          <IconMenu type={type} setWindow={setWindow} />
        </div>
        <div className="text-center">Only BlankForm Not Implemented Yet. </div>
      </div>
    </>
  );
}
