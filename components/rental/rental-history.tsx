"use client";
import { selectPlayerRentingRequest } from "@/app/(rental-pages)/actions";
import { RentingRequest } from "@/app/types/game";
import { useEffect, useState } from "react";

export default function RentalHistory() {
  const [rentalHistory, setRentalHistory] = useState<RentingRequest[]>([]);

  useEffect(() => {
    const fetchRentalHistory = async () => {
      const fetched = await selectPlayerRentingRequest();
      setRentalHistory(fetched);
    };

    fetchRentalHistory();
  }, []);
  console.log(rentalHistory);

  return (
    <h1 className="text-5xl">
      เอา rentalHistory ไปใช้ได้เลย มีตัวอย่างข้อมูลที่ console.log() เอาไว้อยู่
      (this page is for player na)
    </h1>
  );
}
