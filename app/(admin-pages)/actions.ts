// function in (admin-pages)

"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

export const updateVerificationRequest = async (formData: FormData) => {
  const provider_id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  const admin_id = formData.get("admin_id")?.toString();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .update({ 
        status: status, 
        approver: admin_id,
    })
    .eq("provider_id", provider_id)
    .select()

  if (error) {
    encodedRedirect("error", "/", "Failed to update verification request.");
  }

  return encodedRedirect("success", "/", "Update verification request success.");
};

export const deleteVerificationRequest = async (formData: FormData) => {
  const supabase = await createClient();

  const provider_id = formData.get("id")?.toString();

  const { data, error } = await supabase
    .from("verification_requests")
    .delete()
    .eq("provider_id", provider_id);

  if (error) {
    encodedRedirect("error", "/", "Failed to delete verification request.");
  }

  return encodedRedirect("success", "/", "Delete verification request success.");
};

export const selectVerificationRequest = async (provider_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .select("*")
    .eq("provider_id", provider_id)
    .single();

  if (error) {
    throw new Error("Failed to fetch verification request.");
  }

  return data;
};

export const selectAllVerificationRequest = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("verification_requests").select("*, users(*)");

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

