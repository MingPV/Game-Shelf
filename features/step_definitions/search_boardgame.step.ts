import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fetchGamesByFilterAction, fetchAllBoardgameType } from "../../lib/testService";

let searchResults: any[] = [];
let searchParams: {
  name: string;
  price: [number, number];
  selectedTypeFilter: string[];
};

let boardgameTypeMap: Record<string, string> = {}; // mapping type name -> id


// load Boardgame type 
async function loadBoardgameTypeMap() {
    const boardgameTypes = await fetchAllBoardgameType();
    boardgameTypeMap = boardgameTypes.reduce((acc: any, type: any) => {
      acc[type.bg_type] = type.bg_type_id.toString(); // แปลง id เป็น string
      return acc;
    }, {});
  }
  
// load at start
(async () => {
  await loadBoardgameTypeMap();
})();

Given(
  "the user has entered a search filter with name {string}, price between {int} and {int}, and selected types {string}",
  function (name: string, minPrice: number, maxPrice: number, selectedTypes: string) {
    const selectedTypeIds = selectedTypes.split(", ").map(type => boardgameTypeMap[type.trim()] || ""); // แปลง type name -> id

    searchParams = {
      name,
      price: [minPrice, maxPrice],
      selectedTypeFilter: selectedTypeIds.filter(id => id !== ""), // กรอง type ที่ไม่รู้จักออก
    };
    // console.log(searchParams);
  }
);

When("the user searches for board games", async function () {
  const { fetch_data, count_items } = await fetchGamesByFilterAction(
    searchParams.name,
    searchParams.price,
    1, // page
    15, // itemsPerPage
    1, // maxPage
    searchParams.selectedTypeFilter // selectedTypeFilter
  );
  searchResults = fetch_data || [];
});

Then("the matching board games should be displayed", function () {
  expect(searchResults.length).toBeGreaterThan(0);
});

Then("no board games should be displayed", function () {
    expect(searchResults.length).toBe(0);
});
  