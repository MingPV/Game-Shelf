import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fetchProvidersByFilterAction } from "../../lib/testService";

let searchResults: any[] = [];
let searchParams: {
  name: string;
};

Given(
  "the user has entered a search filter with name {string}",
  function (name: string) {
    searchParams = {
      name,
    };
  }
);

When("the user searches for providers", async function () {
  const { fetch_data, count_items } = await fetchProvidersByFilterAction(
    searchParams.name,
    1, // page
    15, // itemsPerPage
    1 // maxPage
  );
  searchResults = fetch_data || [];
});

Then("the matching providers should be displayed", function () {
  expect(searchResults.length).toBeGreaterThan(0);
});

Then("no providers should be displayed", function () {
    expect(searchResults.length).toBe(0);
});
  