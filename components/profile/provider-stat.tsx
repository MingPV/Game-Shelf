"use client";

import { IoGameControllerOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaBahtSign } from "react-icons/fa6";
import { UserData } from "@/app/types/user";
import { ReviewData } from "@/app/types/review";
import { useState, useEffect } from "react";
import {
  selectReceiptsByProviderId,
  selectReviewByProviderId,
} from "@/app/(user-pages)/actions";
import { Boardgame } from "@/app/types/game";
import { Receipt } from "@/app/types/receipt";

export default function ProviderStat({ user }: { user: UserData }) {
  const [boardgames, setBoardgames] = useState<Boardgame[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [receiptAmount, setReceiptAmount] = useState<number>(0);

  useEffect(() => {
    const fetchProviderBoardgame = async (
      searchValue: string,
      provider_id: string,
      selectedTypeFilter: string[]
    ): Promise<{
      data: Boardgame[];
      token: string;
    }> => {
      const queryString = new URLSearchParams({
        searchValue: searchValue,
        provider_id: provider_id,
        selectedTypeFilter: selectedTypeFilter.join(","), // Join array into a comma-separated string
      }).toString();

      const res = await fetch(`/api/boardgames/provider?${queryString}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      return res.json();
    };

    const fetchBoardgame = async () => {
      try {
        const { data: fetchData } = await fetchProviderBoardgame(
          "",
          user.uid,
          []
        );

        setBoardgames(fetchData);
      } catch (error) {
        console.log("Error fetching boardgames");
      }
    };

    const fetchReceipt = async () => {
      try {
        const fetchReceipts = await selectReceiptsByProviderId(user.uid);
        setReceipts(fetchReceipts);
      } catch (error) {
        console.log("error fetching receipts");
      }
    };

    fetchBoardgame();
    fetchReceipt();
  }, [user.uid]);

  useEffect(() => {
    console.log(boardgames);
    console.log(receipts);

    let totalAmount = 0;
    if (receipts.length > 0) {
      receipts.forEach((review) => {
        totalAmount += parseInt(review.amount.toString(), 10);
      });
      totalAmount = parseFloat(totalAmount.toFixed(2));
      setReceiptAmount(totalAmount);
    }
  }, [boardgames, receipts]);
  return (
    <div className="flex flex-row gap-4">
      <div className="stats shadow my-4 bg-transparent border border-gs_white border-opacity-50">
        <div className="stat ">
          <div className="stat-figure ">
            <IoGameControllerOutline className="text-3xl" />
          </div>
          <div className="stat-value text-3xl">{boardgames.length}</div>
          <div className="stat-desc text-center">boardgames</div>
        </div>
      </div>
      <div className="stats shadow my-4 bg-transparent border border-gs_white border-opacity-50">
        <div className="stat ">
          <div className="stat-figure ">
            <FaRegStar className="text-3xl" />
          </div>
          <div className="stat-value text-3xl">
            {user.rating == 0 ? "N/A" : user.rating.toString()}
          </div>
          <div className="stat-desc text-center">rating</div>
        </div>
      </div>
      <div className="stats shadow my-4 bg-transparent border border-gs_white border-opacity-50">
        <div className="stat ">
          <div className="stat-figure ">
            <FaBahtSign className="text-3xl" />
          </div>
          <div className="stat-value text-3xl">
            {new Intl.NumberFormat("en", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(receiptAmount)}
          </div>
          <div className="stat-desc text-center">baht</div>
        </div>
      </div>
    </div>
  );
}
