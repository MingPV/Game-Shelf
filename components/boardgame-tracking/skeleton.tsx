import { TbCurrencyBaht } from "react-icons/tb";
import ModalUpdateBg from "../inventory/modal-update-bg";
import DeleteBoardgame from "../inventory/delete-bg";
import { Boardgame } from "@/app/types/game";

export default function Skeleton() {
    
    const boardgame:Boardgame = {
        id: 1,
        provier_id: "1",
        bg_name: "sand",
        description: "hello mock hello mock hello mock hello mock hello mock",
        bg_picture: "",
        price: 120,
        created_at: "string",
        status: "pending",
        types: ["1", "2"],
      }
    return (
        <>
            {/* <div className="card shadow-xl border-white border-[1px] m-5 relative transition-all duration-300 grid grid-row md:grid-cols-3">
                <div className="skeleton bg-gs_white/20 h-1/2 w-full md:h-auto md:w-1/3 rounded-lg"></div>
                <div className="flex flex-col p-2 w-2/3 h-auto">
                    <div className="skeleton bg-gs_white/20 h-8 w-1/3 rounded-lg m-2"></div>
                    <div className="skeleton bg-gs_white/20 h-8 w-full rounded-lg m-2"></div>
                    <div className="skeleton bg-gs_white/20 h-8 w-full rounded-lg m-2"></div>
                </div>
            </div> */}
            <div
                  className={`card shadow-xl border-white border-[1px] m-5 relative transition-all duration-300 grid grid-row md:grid-cols-3`}
                >
                  <div className="bg-white col-span-1 flex justify-start  md:w-full  h-64 m-2 md:m-4 overflow-hidden rounded-xl">
                    <img
                      src={"/mock_user.jpeg"}
                      alt="boardgame picture"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
            
                  <div className="card-body flex flex-col p-2 md:p-4 md:col-span-2 m-4">
                    <div className="flex flex-row items-start justify-between w-full">
                      <p className="text-lg font-semibold capitalize
                      md:text-2xl
                      lg:text-3xl">
                        {"boardgame.bg_name"}
                      </p>
                      <button
                        className={`rounded-lg px-5 py-2 transition-transform transform hover:opacity-80`}
                        
                      >
                        {"boardgame.status"}
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      <p className="font-bold mt-2 col-span-3 md:col-span-2">Type:</p>
                      <ol className="flex flex-wrap mt-2 gap-2 col-span-3 md:col-span-4">
                          <li
                            className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-md shadow-sm"
                          >
                            {"boardgame_type[type]"}
                          </li>
                      </ol>
            
                      <p className="font-bold col-span-3 md:col-span-2">Price:</p>
                      <p className="col-span-3 md:col-span-4 flex items-center">
                        {"boardgame.price"} &nbsp;
                        <TbCurrencyBaht /> / day
                      </p>
            
                      <p className="font-bold col-span-3 md:col-span-2">Description:</p>
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
                    >
                    </div>
            
                    <div className="flex justify-center
                    md:justify-end gap-2">
                      <ModalUpdateBg boardgame={boardgame} />
                      <DeleteBoardgame boardgameId={boardgame.id} />
                    </div>
                  </div>
                </div>
        </>
    );
}