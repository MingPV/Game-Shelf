"use client";

import { RentingRequest } from "../../app/types/game";

// Convert date to desired format
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
  rentingRequest: RentingRequest[];
}) => {
  const currentDate = new Date(); // Current date for comparison

  // Destructure the dates from the first rentingRequest object

  const { created_at, start_date, end_date } = rentingRequest[0];

  // Compare the current date with the different key dates to determine the status
  const isBeforeStartDate = new Date(start_date) > currentDate;
  const isBeforeEndDate = new Date(end_date) > currentDate;

  // Set opacity based on which stage the rentingRequest is in
  const getOpacityClass = (date: string) => {
    const dateToCompare = new Date(date);
    return currentDate < dateToCompare ? "opacity-40" : "opacity-100";
  };

  return (
    <div className="py-4 ">
      <ul className="steps w-full">
        {/* Reservation */}
        <li
          data-content={``}
          className={`step flex-start flex items-center pt-2 md:block md:pt-0 ${getOpacityClass(created_at)}`}
        >
          <p className="mt-2 text-sm text-bg_white opacity-80 font-bold">
            Reservation
          </p>
          <div className="ms-4 md:ms-0">
            <h4 className=" text-md font-semibold">
              {convertDate(created_at)}
            </h4>
          </div>
        </li>

        {/* Start Date */}
        <li
          data-content={isBeforeStartDate ? "●" : ""}
          className={`step  flex-start flex items-center pt-2 md:block md:pt-0 ${getOpacityClass(start_date)}`}
        >
          <p className="mt-2 text-sm text-bg_white opacity-80 font-bold">
            Start Date
          </p>
          <div className="ms-4 md:ms-0">
            <h4 className=" text-md font-semibold">
              {convertDate(start_date)}
            </h4>
          </div>
        </li>

        {/* End Date */}
        <li
          data-content={isBeforeEndDate ? "●" : ""}
          className={`step flex-start flex items-center pt-2 md:block md:pt-0 ${getOpacityClass(end_date)}`}
        >
          <p className="mt-2 text-sm text-bg_white opacity-80 font-bold">
            End Date
          </p>
          <div className="ms-4 md:ms-0">
            <h4 className=" text-md font-semibold">{convertDate(end_date)}</h4>
          </div>
        </li>
      </ul>
    </div>
  );
};
