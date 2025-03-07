import { DashBoardStatus } from "./dashboard-status";
import { DashBoardPaid } from "./dashboard-paid";
export default function DashBoard() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center mb-32 w-full">
        <div className="flex flex-col items-center justify-center font-bold w-full gap-6">
          <p className="text-2xl ">My Dashboard</p>
          <div className="grid grid-cols-5 w-full gap-4 ">
            {/* overview */}
            <div className="col-span-3 flex flex-col gap-4  p-4 rounded-lg border border-gs_white border-opacity-50">
              <p className="text-xl">Overview</p>
              <div className="flex flex-col rounded-md  ">
                <DashBoardStatus status="renting" />
              </div>

              <div className="flex flex-col rounded-md ">
                <DashBoardStatus status="reserved" />
              </div>

              <div className="flex flex-col rounded-md ">
                <DashBoardStatus status="canceled" />
              </div>
            </div>

            <div className="col-span-2 max-h-[80vh]  overflow-y-auto px-4 bg-gs_white bg-opacity-10 rounded-md">
              <div className=" overflow-y-auto py-2">
                <DashBoardPaid />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
