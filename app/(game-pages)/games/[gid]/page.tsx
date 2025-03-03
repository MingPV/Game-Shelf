'use client'

import { selectAllBoardgameType, selectGameAction } from "../../actions"
import NoBoardgameMatch from "@/components/search-game/no-match-card";
import GameDetailLeft from "@/components/search-game/game-detail-left";
import GameDetailRight from "@/components/search-game/game-detail-right";
import { selectUserById } from "@/app/(user-pages)/actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Boardgame } from "@/app/types/game";
import { UserData } from "@/app/types/user";

export default function GameDetails() {
    const { gid } = useParams();
    const gameId = Number(gid);

    const [bg, setBg] = useState<Boardgame | null>(null);
    const [boardgameTypes, setBoardgameTypes] = useState<any[]>([]);
    const [provider, setProvider] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isNaN(gameId)) {
                console.error("Invalid gameId:", gid);
                setLoading(false);
                return;
            }

            try {
                const fetchedBg = await selectGameAction(gameId);
                if (!fetchedBg) {
                    console.warn(`No boardgame found for gameId: ${gameId}`);
                    setLoading(false);
                    return;
                }
                setBg(fetchedBg);

                const fetchedTypes = await selectAllBoardgameType();
                setBoardgameTypes(fetchedTypes);
            } catch (error) {
                console.log("Error fetching boardgame:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [gameId]);

    useEffect(() => {
        if (!bg) return;

        const fetchProvider = async () => {
            try {
                const fetchedProvider = await selectUserById(bg.provider_id);
                setProvider(fetchedProvider[0] || null);
            } catch (error) {
                console.log("Error fetching provider:", error);
            }
        };

        fetchProvider();
    }, [bg]);

    if (loading) {
        return <div className="w-full place-items-center text-center">Loading...</div>;
    }

    if (!bg) {
        return (
            <div className="w-full place-items-center">
                <NoBoardgameMatch />
            </div>
        );
    }

    const mappedBoardgameType = boardgameTypes.reduce((acc: any, type: any) => {
        acc[type.bg_type_id] = type.bg_type;
        return acc;
    }, {});

    return (
        <div className="flex flex-row w-[90%] space-x-20 justify-center self-center">
            <GameDetailLeft boardgame={bg} provider={provider} />
            <GameDetailRight boardgame={bg} boardgame_type={mappedBoardgameType} provider={provider} />
        </div>
    );
}
