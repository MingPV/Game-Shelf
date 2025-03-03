import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify, importJWK } from "jose";
import { UserData } from "@/app/types/user";
import { signOutAction } from "@/app/(auth-pages)/actions";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // CORS selectPlayerRentingRequest
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE, PATCH"
    );

    response.headers.set(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, Authorization, X-Requested-With, Referer, User-Agent"
    );
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    // const supabase = createServerClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    //   {
    //     cookies: {
    //       getAll() {
    //         return request.cookies.getAll();
    //       },
    //       setAll(cookiesToSet) {
    //         cookiesToSet.forEach(({ name, value }) =>
    //           request.cookies.set(name, value)
    //         );
    //         response = NextResponse.next({
    //           request,
    //         });
    //         cookiesToSet.forEach(({ name, value, options }) =>
    //           response.cookies.set(name, value, options)
    //         );
    //       },
    //     },
    //   }
    // );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs

    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET,
    };
    const secretKey = await importJWK(secretJWK, "HS256");

    const token = request.cookies.get("token");
    if (!token || token.value === "") {
      await signOutAction();
      return NextResponse.redirect(new URL("/sign-in", request.url));
    } else {
      try {
        // const { payload } = await jwtVerify(token.value, secretKey);
        // console.log("ming", payload);
        // if (payload.exp && payload.exp * 1000 < Date.now()) {
        //   console.log("Token expired");
        //   await signOutAction();
        // }
      } catch (error) {
        console.log("Invalid token:", error);
        await signOutAction();
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    // for provider

    if (request.nextUrl.pathname.startsWith("/home")) {
      const token = request.cookies.get("token");
      if (!token || token.value == "") {
        await signOutAction();
        return NextResponse.redirect(new URL("/home", request.url));
      }
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      const userData = payload.userData as UserData;

      if (userData.isProvider) {
        return NextResponse.redirect(new URL("/provider-home", request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/provider-home")) {
      const token = request.cookies.get("token");
      if (!token || token.value == "") {
        await signOutAction();
        return NextResponse.redirect(new URL("/home", request.url));
      }
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      const userData = payload.userData as UserData;

      if (!userData.isProvider) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/inventory")) {
      const token = request.cookies.get("token");

      if (!token || token.value == "") {
        await signOutAction();
        return NextResponse.redirect(new URL("/home", request.url));
      }
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      const userData = payload.userData as UserData;

      if (!userData.isProvider) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/add-game")) {
      const token = request.cookies.get("token");
      if (!token || token.value == "") {
        await signOutAction();
        return NextResponse.redirect(new URL("/home", request.url));
      }
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      const userData = payload.userData as UserData;

      if (!userData.isProvider) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }
    if (request.nextUrl.pathname.startsWith("/rental-request")) {
      const token = request.cookies.get("token");
      if (!token || token.value == "") {
        await signOutAction();
        return NextResponse.redirect(new URL("/home", request.url));
      }
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      const userData = payload.userData as UserData;

      if (!userData.isProvider) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }

    // // for admin

    if (request.nextUrl.pathname.startsWith("/admin-homepage")) {
      const token = request.cookies.get("token");
      if (!token || token.value == "") {
        await signOutAction();
        return NextResponse.redirect(new URL("/home", request.url));
      }
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      const userData = payload.userData as UserData;

      if (!userData.is_admin) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/manage-provider")) {
      const token = request.cookies.get("token");
      if (!token || token.value == "") {
        await signOutAction();
        return NextResponse.redirect(new URL("/home", request.url));
      }
      const payload = JSON.parse(atob(token.value.split(".")[1]));
      const userData = payload.userData as UserData;

      if (!userData.is_admin) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
