// function in (admin-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { Dispute } from "../types/admin";
import { verificationRequests } from "../types/user";

export const addVerificationRequest = async (formData: FormData) => {
  const provider_id = formData.get("provider_id")?.toString();
  console.log("Add Verification:", formData, "\nProvider Id:", provider_id);

  const supabase = await createClient();

  const { data, error } = await supabase.from("verification_requests").insert([
    {
      provider_id: provider_id,
      status: "pending",
    },
  ]);

  if (error) {
    console.log("Add Verification Request Error:", error);
    encodedRedirect("error", "/home", "Failed to add verification request.");
  }
};

export const updateVerificationRequest = async (formData: FormData) => {
  const provider_id = formData.get("provider_id")?.toString();
  const status = formData.get("status")?.toString();
  const admin_id = Number(formData.get("admin_id"));

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .update({
      status: status,
      approver: admin_id,
    })
    .eq("provider_id", provider_id)
    .select();

  if (error) {
    encodedRedirect("error", "/home", "Failed to update verification request.");
  }
};

export const deleteVerificationRequest = async (formData: FormData) => {
  const supabase = await createClient();

  const provider_id = formData.get("provider_id")?.toString();

  const { data, error } = await supabase
    .from("verification_requests")
    .delete()
    .eq("provider_id", provider_id);

  if (error) {
    encodedRedirect("error", "/home", "Failed to delete verification request.");
  }

  // return encodedRedirect("success", "/", "Delete verification request success.");
};

export const selectVerificationRequest = async (provider_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .select("*")
    .eq("provider_id", provider_id)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to fetch verification request.");
  }

  return data;
};

export const selectAllVerificationRequest = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .select("*, users(*)");

  if (error) {
    throw new Error("Failed to fetch verification requests.");
  }

  return data;
};

export const selectAllUnverifiedVerificationRequest = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .select("*, users(*)")
    .neq("status", "verified");

  if (error) {
    throw new Error("Failed to fetch verification requests.");
  }

  return data;
};

export const getAllReports = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("disputes")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch disputes");
  }

  return data as Dispute[];
};

export const getAllPendingReports = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("disputes")
    .select("*")
    .eq("status", "waiting")
    .order("id", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch disputes");
  }

  return data as Dispute[];
};

export const getAllPendingVerifications = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch verification_requests");
  }

  return data as verificationRequests[];
};

export const updateReport = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  const verdict = formData.get("verdict")?.toString();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("disputes")
    .update({ status: status, verdict: verdict })
    .eq("id", id)
    .select();
};

export const updateTakeReport = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  const admin_id = formData.get("admin_id")?.toString();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("disputes")
    .update({ status: "considering", admin_id: admin_id })
    .eq("id", id)
    .select();

  return data;
};

export const updateReportVerdict = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  const verdict = formData.get("verdict")?.toString();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("disputes")
    .update({
      status: "complete",
      verdict: verdict,
      verdict_timestamp: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  return data;
};

export const countReportsByStatusAndDate = async (
  month: string,
  year: string,
  status: string
) => {
  const supabase = await createClient();

  // const month = formData.get("month")?.toString() || "undefined";
  // const year = formData.get("year")?.toString() || "undefined";
  // const status = formData.get("status")?.toString() || "";

  // if (month !== "undefined" && year !== "undefined") {
  const curMonth = parseInt(month) + 1;
  const curYear = parseInt(year);

  const nextMonth = curMonth + 1;
  const nextYear = nextMonth === 13 ? curYear + 1 : curYear;

  const { count, error } = await supabase
    .from("disputes")
    .select("*", { count: "exact" })
    .eq("status", status)
    .lt("created_at", `${nextYear}-${nextMonth.toString().padStart(2, "0")}-01`) // Started before the next month
    .gte("created_at", `${curYear}-${curMonth.toString().padStart(2, "0")}-01`); // Ends after the start of the selected month

  if (error) {
    throw new Error("Failed to fetch disputes");
  }

  return count;
};

export const getTopReportedUsers = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_top_reported_users_with_types"
  );

  if (error) {
    console.error("Error fetching top reporters:", error);
    return [];
  }

  console.log(data);
  return data;
};
