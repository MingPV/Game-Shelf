"use client";

import NoBoardgameMatch from "@/components/search-game/no-match-card";
import GameDetailLeft from "@/components/search-game/game-detail-left";
import GameDetailRight from "@/components/search-game/game-detail-right";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Boardgame, Boardgame_type } from "@/app/types/game";
import { UserData } from "@/app/types/user";
import GameDetailLoading from "@/components/search-game/game-detail-loading";

export default function GameDetails() {
  const { gid } = useParams();
  const gameId = Number(gid);

  const [bg, setBg] = useState<Boardgame | null>(null);
  const [boardgameTypes, setBoardgameTypes] = useState<any[]>([]);
  const [provider, setProvider] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async (): Promise<{
      data: Boardgame_type[];
      token: string;
    }> => {
      const res = await fetch("/api/boardgames/types", {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };
    const fetchBoardgameById = async (
      boardgameID: Number
    ): Promise<{
      data: Boardgame;
      token: string;
    }> => {
      const res = await fetch(`/api/boardgames/${boardgameID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchData = async () => {
      if (isNaN(gameId)) {
        console.error("Invalid gameId:", gid);
        setLoading(false);
        return;
      }

      try {
        const { data: fetchedBg } = await fetchBoardgameById(gameId);
        if (!fetchedBg) {
          console.warn(`No boardgame found for gameId: ${gameId}`);
          setLoading(false);
          return;
        }
        setBg(fetchedBg);

        const { data: fetchedTypes } = await fetchTypes();
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

    const fetchUserByID = async (
      userID: string
    ): Promise<{
      data: UserData[];
      token: string;
    }> => {
      const res = await fetch(`/api/users/${userID}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchProvider = async () => {
      try {
        const { data: fetchedProvider } = await fetchUserByID(bg.provider_id);
        setProvider(fetchedProvider[0] || null);
      } catch (error) {
        console.log("Error fetching provider:", error);
      }
    };

    fetchProvider();
  }, [bg]);

  if (loading) {
    return <GameDetailLoading />;
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
    <div className="flex flex-col md:flex-row w-[90%] space-y-10 md:space-x-10 lg:space-x-20 justify-center self-center">
      <GameDetailLeft boardgame={bg} provider={provider} />
      <GameDetailRight
        boardgame={bg}
        boardgame_type={mappedBoardgameType}
        provider={provider}
      />
    </div>
  );
}
