import { Boardgame } from "@/app/types/game";
import { UserData } from "@/app/types/user";

type BoardgameType = {
  [key: string]: string;
};

export default function GameDetailRight({
  boardgame,
  boardgame_type,
  provider,
}: {
  boardgame: Boardgame;
  boardgame_type: BoardgameType;
  provider: UserData | null;
}) {
  return (
    <div className="w-1/2 flex flex-col space-y-8">
      <div>
        <p className="text-md text-gs_white/50">Board Game Name</p>
        <p className="text-4xl font-bold">{boardgame.bg_name}</p>
      </div>

      <div className="flex text-md flex-wrap w-full gap-2">
        {boardgame.types?.map((type, index) => (
          <div
            key={index}
            className="py-1 px-2 rounded-lg bg-gs_white/20 opacity-95"
          >
            {boardgame_type[type] || "Unknown Type"}
          </div>
        ))}
      </div>

      <div>
        <p className="text-md text-gs_white/50 mb-2">Store</p>
        <div className="flex flex-row items-center gap-3">
          <img
            alt="mock_nofication_image"
            src={provider ? provider.profilePicture : "./mock_provider.jpeg"}
            className="rounded-full w-12"
          />
          <p className="text-xl font-bold">
            {provider ? provider.username : "N/A"}
          </p>
        </div>
      </div>

      {/* <button
        className="w-1/2 font-semibold text-sm px-4 rounded-xl py-2 self-start border border-white border-opacity-0 hover:border-opacity-80 bg-gs_purple_gradient"
        onClick={() => alert("checked!")}
      >
        Check Schedule
      </button> */}

      <div>
        <p className="text-md text-gs_white/50">Detail</p>
        <p className="text-lg">{boardgame.description}</p>
      </div>
    </div>
  );
}
