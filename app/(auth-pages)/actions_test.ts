import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";
import { SignJWT, importJWK } from "jose";

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
