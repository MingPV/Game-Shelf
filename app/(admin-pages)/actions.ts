// function in (admin-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

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

export const selectVerificationRequestByPageAction = async (page: number) => {
  const supabase = await createClient();
  const itemsPerPage = 30;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error } = await supabase
    .from("verification_requests")
    .select("*, users(*)")
    .range(from, to);

  if (error) {
    throw new Error("Failed to fetch verification requests.");
  }

  return data;
};
