import { TbCurrencyBaht } from "react-icons/tb";
import ModalUpdateBg from "../inventory/modal-update-bg";
import DeleteBoardgame from "../inventory/delete-bg";
import { Boardgame } from "@/app/types/game";
import { SetStateAction } from "react";

export default function Skeleton() {
  const boardgame: Boardgame = {
    id: 1,
    provier_id: "1",
    bg_name: "sand",
    description: "hello mock hello mock hello mock hello mock hello mock",
    bg_picture: "",
    price: 120,
    created_at: "string",
    status: "pending",
    types: ["1", "2"],
    quantity: 1, // fix this na
  };
  return (
    <>
      <div
        className={`card shadow-xl m-5 relative grid grid-row md:grid-cols-3 skeleton bg-black opacity-10 rounded-sm`}
      >
        <div className="bg-white col-span-1 flex justify-start  md:w-full  h-64 m-2 md:m-4 overflow-hidden rounded-xl opacity-20">
          {/* <img
            src={"/mock_user.jpeg"}
            alt="boardgame picture"
            className="w-full h-full object-cover object-top"
          /> */}
        </div>

        <div className="card-body flex flex-col p-2 md:p-4 md:col-span-2 m-4">
          <div className="flex flex-row items-start justify-between">
            <div>
              <p
                className="text-lg font-semibold capitalize
                      md:text-2xl
                      lg:text-3xl bg-white opacity-20 rounded-lg"
              >
                {"------------"}
              </p>
            </div>

            <div
              className={` px-5 py-2 transition-transform transform  bg-white opacity-20 rounded-lg`}
            >
              {"Available"}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <p className="font-bold mt-2 col-span-3 md:col-span-2 bg-white opacity-0 rounded-lg">
              Type:
            </p>
            <ol className="flex flex-wrap mt-2 gap-2 col-span-3 md:col-span-4">
              <li className=" text-xs font-medium px-3 py-1 shadow-sm bg-white opacity-0 rounded-lg">
                {"-----------"}
              </li>
            </ol>

            <p className="font-bold col-span-3 md:col-span-2 opacity-0">
              Price:
            </p>
            <p className="col-span-3 md:col-span-4 flex items-center opacity-0">
              {"boardgame.price"} &nbsp;
              <TbCurrencyBaht /> / day
            </p>

            <p className="font-bold col-span-3 md:col-span-2 opacity-0">
              Description:
            </p>
            <p className={`col-span-3 md:col-span-4`}>
              {/* {showDetail? 
                        boardgame.description 
                        : (boardgame.description.slice(0, 100))
                        }
                        {!showDetail?
                          <button className="text-gray-100 opacity-70"> ...see more</button>
                          : <button className="text-gray-100 opacity-70">see less</button>
                        } */}
            </p>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out "max-h-0 opacity-0 "`}
          ></div>

          <div
            className="flex justify-center
                    md:justify-end gap-2"
          >
            <div className="bg-white opacity-20 rounded-lg">
              <ModalUpdateBg
                boardgame={boardgame}
                setBoardgameData={function (
                  value: SetStateAction<Boardgame>
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
            <div className="bg-white opacity-20 rounded-lg">
              <DeleteBoardgame boardgameId={boardgame.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
