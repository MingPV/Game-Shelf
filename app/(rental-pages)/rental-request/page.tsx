import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import VerificationList from "@/components/admin-pages/verification-list";
import RentalRequestList from "@/components/rental/rental-request";

export default async function ManageReuqest() {
  return <RentalRequestList />;
}
