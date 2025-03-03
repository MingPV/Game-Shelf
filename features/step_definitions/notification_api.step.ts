import { Given, When, Then } from "@cucumber/cucumber";
import { createBrowserClient } from "@supabase/ssr";
import { expect } from "chai";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

let supabase: any;
let response: any;

Given("I have a Supabase client for notification", function () {
  supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
});

When("I fetch notifications from the database", async function () {
  // Try fetching notifications from a valid table
  response = await supabase.from("notifications").select("*");
});

When(
  "I try to fetch notifications from a nonexistent table",
  async function () {
    // Try fetching notifications from a table that doesn't exist
    response = await supabase.from("nonexistent_table").select("*");
  }
);

Then("I should receive a list of notifications", function () {
  // Check if response is successful and contains a list (array)
  expect(response.data).to.be.an("array");
  expect(response.status).to.equal(200);
});

Then("each notification should have the correct structure", function () {
  if (response.data) {
    response.data.forEach((notification: any) => {
      // check all item's structure
      expect(notification).to.have.property("id").that.is.a("number");
      expect(notification).to.have.property("receiver_id").that.is.a("string");
      expect(notification).to.have.property("message").that.is.a("string");
      expect(notification)
        .to.have.property("admin_id")
        .that.satisfy(
          (value: any) => typeof value === "string" || value === null
        );
      expect(notification).to.have.property("is_read").that.is.a("boolean");
      expect(notification).to.have.property("created_at").that.is.a("string");
    });
  }
});

Then(
  "I should receive an error from fetching notifications table",
  function () {
    // Check if response status is not 200, indicating an error
    expect(response.status).to.not.equal(200);
    expect(response.error).to.not.be.null;
  }
);
