import { supabaseTest } from "@/utils/supabase/supabaseTestCilent";

// helper function
export const fetchGamesByFilterAction = async (
  name: string,
  price: [number, number],
  page: number,
  itemsPerPage: number,
  maxPage: number,
  selectedTypeFilter: string[]
) => {
  let page_to_fetch = page;

  if (page > maxPage) {
    page_to_fetch = 1;
  }

//   const supabase = await createClient();
  const from = (page_to_fetch - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // Step 1: Get total count first

  const query = supabaseTest
    .from("boardgames")
    .select("*", { count: "exact", head: true }) // head: true gets only the count, not the rows
    .ilike("bg_name", `%${name}%`)
    .gte("price", price[0])
    .lte("price", price[1]);

  if (selectedTypeFilter.length) {
    query.overlaps("types", selectedTypeFilter);
  }

  const { count: count_items, error: countError } = await query;

  let fetch_error = null;
  let fetch_data = null;

  if (countError) {
    console.error(countError);
  } else if (count_items !== null && count_items > 0) {
    // Step 2: Only fetch data if count > 0

    let query = supabaseTest
      .from("boardgames")
      .select("*", { count: "exact" })
      .ilike("bg_name", `%${name}%`)
      .gte("price", price[0])
      .lte("price", price[1])
      .range(from, to);
    // .overlaps("types", selectedTypeFilter);

    // Apply .overlaps() only if selectedTypeFilter is not empty
    query = selectedTypeFilter.length
      ? query.overlaps("types", selectedTypeFilter)
      : query;

    const { data, error } = await query;

    fetch_error = error;
    fetch_data = data;
  } else {
    console.log("No matching rows");
  }

  if (fetch_error) {
    console.log(fetch_error);
    throw new Error("Failed to fetch boardgames.");
  }

  return { fetch_data, count_items };
};

export const fetchProvidersByFilterAction = async (
  name: string,
  page: number,
  itemsPerPage: number,
  maxPage: number
) => {
  let page_to_fetch = page;

  if (page > maxPage) {
    page_to_fetch = 1;
  }

//   const supabase = await createClient();
  const from = (page_to_fetch - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // Step 1: Get total count first

  let count_items;
  let countError;

  const { count: count_itemstmp, error: countErrortmp } = await supabaseTest
    .from("users")
    .select("*", { count: "exact", head: true }) // head: true gets only the count, not the rows
    .ilike("username", `%${name}%`);

  count_items = count_itemstmp;
  countError = countErrortmp;

  let fetch_error = null;
  let fetch_data = null;

  if (countError) {
    console.error(countError);
  } else if (count_items !== null && count_items > 0) {
    // Step 2: Only fetch data if count > 0

    let query = supabaseTest
      .from("users")
      .select("*", { count: "exact" })
      .ilike("username", `%${name}%`)
      .range(from, to);
    // .overlaps("types", selectedTypeFilter);

    const { data, error } = await query;

    fetch_error = error;
    fetch_data = data;
  } else {
    console.log("No matching rows");
  }

  if (fetch_error) {
    console.log(fetch_error);
    throw new Error("Failed to fetch boardgames.");
  }

  return { fetch_data, count_items };
};

export const fetchAllBoardgameType = async () => {
  // const supabase = await createClient();

  const { data, error } = await supabaseTest.from("boardgame_type").select("*");

  if (error) {
    throw new Error("Failed to fetch boardgame types");
    console.log(error);
  }
  console.log(error);

  return data;
};