export default function LoadingReportCard() {
  // Skeleton loader for loading state
  return (
    <div className="w-full grid grid-cols-12 text-sm bg-black/10 bg-opacity-10 border-opacity-50 p-4 rounded-xl skeleton">
      <div className="flex flex-col gap-4 justify-between col-span-10 opacity-20">
        {/* Created At Skeleton */}
        <div className="grid grid-cols-6 pt-2">
          <p className="h-6 bg-gs_white bg-opacity-30 rounded-md w-fit text-white text-opacity-0">
            ----------------------------
          </p>
        </div>
        <div className="grid grid-cols-6 pt-2">
          <div className="col-span-2  md:col-span-2 lg:col-span-1">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-16 "></div>
          </div>
          <div className="col-span-4  md:col-span-4 lg:col-span-5">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-fit text-white text-opacity-0">
              ----------------
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 pt-2">
          <div className="col-span-2  md:col-span-2 lg:col-span-1">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-16 "></div>
          </div>
          <div className="col-span-4  md:col-span-4 lg:col-span-5">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-fit text-white text-opacity-0">
              -------------
            </div>
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="grid grid-cols-6">
          <div className="col-span-2  md:col-span-2 lg:col-span-1">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-12 "></div>
          </div>
          <div className="col-span-4  md:col-span-4 lg:col-span-5">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-1/2 text-white text-opacity-0 ">
              -----------------------------------------------------------------------------
            </div>
          </div>
        </div>

        {/* Verdict Skeleton */}
        {/* <div className="grid grid-cols-6">
          <div className="col-span-2  md:col-span-2 lg:col-span-1">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-20 "></div>
          </div>
          <div className="col-span-4  md:col-span-4 lg:col-span-5">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-fit text-white text-opacity-0 ">
              -------------
            </div>
          </div>
        </div> */}

        {/* Considered By Skeleton */}
        <div className="grid grid-cols-6">
          <div className="col-span-2  md:col-span-2 lg:col-span-1">
            <div className="h-4 bg-gs_white bg-opacity-30 rounded-md w-16 "></div>
          </div>
          <div className="col-span-4  md:col-span-4 lg:col-span-5 flex flex-row items-center gap-2">
            <div className="h-10 bg-gs_white bg-opacity-30 rounded-full w-12 h-12 "></div>
            <div className="h-8 bg-gs_white bg-opacity-30 rounded-md w-32 "></div>
          </div>
        </div>
      </div>

      {/* Status Button Skeleton */}
      {/* <div className="flex items-start justify-end col-span-2">
        <button className="w-24 h-10 bg-gs_white bg-opacity-30 rounded-lg text-gray-700 cursor-not-allowed opacity-50 "></button>
      </div> */}
    </div>
  );
}
