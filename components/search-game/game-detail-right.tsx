import { Boardgame } from "@/app/types/game";
import { UserData } from "@/app/types/user";
import RentalRequestList from "../rental/rental-request";
import Link from "next/link";

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
    <div className="w-[90%] md:w-1/2 flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
      <div>
        <p className="text-sm md:text-base text-gs_white/50">Board Game Name</p>
        <p className="text-2xl md:text-4xl font-bold">{boardgame.bg_name}</p>
      </div>

      <div className="flex text-sm md:text-base flex-wrap w-full gap-2">
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
        <p className="text-sm md:text-base text-gs_white/50 mb-2">Store</p>
        <Link
          className="flex flex-row items-center gap-3 w-fit hover:bg-white/10 p-2 rounded-md"
          href={`/profile/${provider?.username}`}
          prefetch={true}
        >
          <img
            alt="mock_provider"
            src={provider ? provider.profilePicture : "./mock_provider.jpeg"}
            className="rounded-full w-12"
          />
          <p className="text-md md:text-lg lg:text-xl font-bold">
            {provider ? provider.username : "N/A"}
          </p>
        </Link>
      </div>

      <div>
        <p className="text-sm md:text-base text-gs_white/50">Detail</p>
        <p className="text-md md:text-lg">{boardgame.description || "N/A"}</p>
      </div>
    </div>
  );
}
