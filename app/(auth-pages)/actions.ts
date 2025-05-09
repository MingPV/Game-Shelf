"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, importJWK } from "jose";
import { createClient as createClient2 } from "@/utils/supabase/client";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const isProviderSelected = formData.get("isProvider");
  let isProvider = false;

  if (isProviderSelected == "true") {
    isProvider = true;
  }

  if (!email || !password) {
    return { status: "error", message: "Email and password are required" };
  }

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return { status: "error", message: error.message };
  } else {
    // Try inserting the user into the public.user table

    if (authData?.user?.id) {
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email: email,
            username: username,
            isProvider: isProvider,
          },
        ])
        .select();

      if (!error) {
        const secretJWK = {
          kty: "oct",
          k: process.env.JOSE_SECRET,
        };

        const secretKey = await importJWK(secretJWK, "HS256");
        const token = await new SignJWT({ email, userData: data[0] })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .sign(secretKey);

        (await cookies()).set("token", token, {
          httpOnly: true, // Keeps it secure from client-side JavaScript
          sameSite: "lax", // Helps prevent CSRF attacks
          path: "/", // Available to the whole site
        });
      }
    }

    return { status: "success", message: "Sign up successful!" };
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { status: "error", message: "Incorrect password or email" };
  }

  let getUserData;

  if (authData.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", authData.user.id)
      .single();

    if (error) {
      console.error("Error fetching user data:", error.message);
      return {
        status: error,
        message: "Something went wrong please try again",
      };
    }

    getUserData = data;

    console.log("Fetched user data:", data);
  }

  const secretJWK = {
    kty: "oct",
    k: process.env.JOSE_SECRET,
  };

  const secretKey = await importJWK(secretJWK, "HS256");
  const token = await new SignJWT({ email, userData: getUserData })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secretKey);

  (await cookies()).set("token", token, {
    httpOnly: true, // Keeps it secure from client-side JavaScript
    sameSite: "lax", // Helps prevent CSRF attacks
    path: "/", // Available to the whole site
  });
  return { status: "success" };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  (await cookies()).set("token", "");
  return;
};

export const signOutAction2 = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  (await cookies()).set("token", "");
  return;
};

export const checkUsernameUnique = async (username: string) => {
  if (username === "" || username === null) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (error) {
    return false;
  }

  return data.length === 0;
};

export const checkEmailUnique = async (email: string) => {
  if (email === "" || email === null) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    return false;
  }

  return data.length === 0;
};
