import { DashBoardStatus } from "./dashboard-status";
import { DashBoardPaid } from "./dashboard-paid";
export default function DashBoard() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center items-center mb-32 w-full">
        <div className="flex flex-col items-center justify-center font-bold w-full gap-6">
          <p className="text-2xl ">My Dashboard</p>
          <div className="grid grid-cols-5 w-full gap-6 ">
            {/* overview */}
            <div className="col-span-3 flex flex-col gap-6 bg-gs_white bg-opacity-20 p-4 rounded-lg">
              <div className="flex flex-col  border border-gs_white border-opacity-50 rounded-md p-4 ">
                <DashBoardStatus status="renting" />
              </div>
              <div className="flex flex-col  border border-gs_white border-opacity-50 rounded-md p-4 ">
                <DashBoardStatus status="waiting for payment" />
              </div>
              <div className="flex flex-col  border border-gs_white border-opacity-50 rounded-md p-4 ">
                <DashBoardStatus status="reserved" />
              </div>
              <div className="flex flex-col  border border-gs_white border-opacity-50 rounded-md p-4 ">
                <DashBoardStatus status="requested" />
              </div>
            </div>

            <div className="col-span-2 max-h-[80vh]  overflow-y-auto p-4 bg-gs_white bg-opacity-10 rounded-md">
              <p className="sticky top-0 pb-2 backdr">To be paid</p>
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
