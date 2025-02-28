import { selectAllBoardgameType, selectGameAction } from "../../actions"
import NoBoardgameMatch from "@/components/search-game/no-match-card";
import GameDetailLeft from "@/components/search-game/game-detail-left";
import GameDetailRight from "@/components/search-game/game-detail-right";
import { selectUserById } from "@/app/(user-pages)/actions";

export default async function GameDetails({params} : {params:{gid:string}}) {

    const gameId = Number(params.gid)
    console.log(gameId)

    if (isNaN(gameId)) return (
        <div className="w-full place-items-center">
            <NoBoardgameMatch/>
        </div>
    )

    let bg
    let boardgameTypes
    try {
        bg = await selectGameAction(gameId)
        boardgameTypes = await selectAllBoardgameType()
    } catch (error) {
        return (
            <div className="w-full place-items-center">
                <NoBoardgameMatch/>
            </div>
        )
    }

    let provider
    try {
        provider = await selectUserById(bg.provider_id)
        console.log(provider)
    } catch(error) {
        return (
            <div className="w-full place-items-center">
                <NoBoardgameMatch/>
            </div>
        )
    }

    const mapped_boardgame_type = boardgameTypes.reduce((acc: any, type: any) => {
        acc[type.bg_type_id] = type.bg_type;
        return acc;
    }, {});

    return(
        <div className="flex flex-row w-[90%] space-x-20 justify-center self-center">
            <GameDetailLeft boardgame={bg} provider={provider[0]}/>
            <GameDetailRight boardgame={bg} boardgame_type={mapped_boardgame_type} provider={provider[0]}/>
        </div>
    )
}