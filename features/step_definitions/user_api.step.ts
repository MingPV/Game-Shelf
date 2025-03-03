import { Given, When, Then } from "@cucumber/cucumber";
import { createBrowserClient } from "@supabase/ssr";
import { expect } from "chai";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

let supabase: any;
let response: any;

Given("I have a Supabase client", function () {
  supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
});

When("I fetch users from the database", async function () {
  response = await supabase.from("users").select("*");
});

Then("I should receive a list of users", function () {
  expect(response.data).to.be.an("array");
  expect(response.status).to.equal(200);
});
