import { RentingRequest } from "../../app/types/game";
import { FaHourglassStart, FaPlayCircle } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";

const convertDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const StatusTracking = ({
  rentingRequest,
}: {
  rentingRequest: RentingRequest;
}) => {
  // Destructure the prop
  return (
    <ol className="w-full  md:flex md:justify-center md:gap-6 md:border-s-0 md:border-t">
      <li>
        <div className="flex-start flex items-center pt-2 md:block md:pt-0">
          <div className="-ms-[5px] me-3 h-8 w-8 rounded-full bg-gs_white md:-mt-4 md:me-0 md:ms-0 flex items-center justify-center">
            <FaHourglassStart className="text-gs_black text-slate-500" />
          </div>
          <p className="mt-2 text-sm text-bg_white opacity-80 font-bold">
            Reservation
          </p>
        </div>
        <div className="ms-4 md:ms-0">
          <h4 className=" text-md font-semibold">
            {convertDate(rentingRequest.created_at)}
          </h4>
        </div>
      </li>
      <li>
        <div className="flex-start flex items-center pt-2 md:block md:pt-0">
          <div className="-ms-[5px] me-3 h-8 w-8 rounded-full bg-gs_white md:-mt-4 md:me-0 md:ms-0 flex items-center justify-center">
            <FaPlayCircle className="text-gs_black text-slate-500" />
          </div>
          <p className="mt-2 text-sm text-bg_white opacity-80 font-bold">
            Start Date
          </p>
        </div>
        <div className="ms-4 md:ms-0">
          <h4 className=" text-md font-semibold">
            {convertDate(rentingRequest.start_date)}
          </h4>
        </div>
      </li>
      <li>
        <div className="flex-start flex items-center pt-2 md:block md:pt-0">
          <div className="-ms-[5px] me-3 h-8 w-8 rounded-full bg-gs_white md:-mt-4 md:me-0 md:ms-0 flex items-center justify-center">
            <IoIosTime className="text-gs_black text-slate-500" />
          </div>
          <p className="mt-2 text-sm text-bg_white opacity-80 font-bold">
            End Date
          </p>
        </div>
        <div className="ms-4 md:ms-0">
          <h4 className=" text-md font-semibold">
            {convertDate(rentingRequest.end_date)}
          </h4>
        </div>
      </li>
    </ol>
  );
};
