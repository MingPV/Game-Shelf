"use client";
import { useEffect, useState } from "react";

import ProviderCard from "./provider-card";
import { Input } from "../ui/input";
import LoadingGameCard from "../search-game/loading-card";

import { useDebouncedCallback } from "use-debounce";
import { UserData } from "@/app/types/user";
import ItemsPerPageFilter from "../search-game/items-per-page-filter";
export function SearchProviders() {
  const [itemsPerPage, setItemPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [providers, setProviders] = useState<UserData[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [count, setCount] = useState(1);
  const [maxPage, setMaxPage] = useState(
    Math.ceil((count || 0) / itemsPerPage)
  );

  const [filtered, setFiltered] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [haveProvider, setHaveProvider] = useState<Boolean>(true);

  const fetchProvidersData = async (
    searchValue: string,
    page: number,
    itemsPerPage: number,
    maxPage: number
  ): Promise<any> => {
    // Build the query string
    const queryString = new URLSearchParams({
      searchValue,
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
      maxPage: maxPage.toString(),
    }).toString();

    // Make the GET request
    const res = await fetch(`/api/users/providers?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`/api/providers?${queryString}`);

    // Parse the JSON response
    return res.json();
  };

  const fetchProviders = useDebouncedCallback(async () => {
    setIsFetching(true);

    if (page > maxPage) {
      setPage(1);
    }

    const { data: fetchData } = await fetchProvidersData(
      searchValue,
      page,
      itemsPerPage,
      maxPage
    );
    const { fetch_data: data, count_items: count_games } = await fetchData;
    setProviders(data || []);
    setCount(count_games || 0);

    if (count_games == 0) {
      setPage(1);
      setMaxPage(1);
      setHaveProvider(false);
    } else {
      setMaxPage(Math.ceil((count_games || 1) / itemsPerPage));
      setHaveProvider(true);
    }

    setIsFetching(false);
  }, 300);

  useEffect(() => {
    fetchProviders();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    setPage(1);
    setMaxPage(1);
    // maxpage will auto change after fetch
    fetchProviders();
  }, [itemsPerPage, searchValue]);

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="w-full place-items-center">
      <div className="flex flex-col min-w-64 items-center w-full space-y-4 mt-4">
        <div className="flex flex-col gap-4 items-start  justify-start">
          <div className="flex gap-4 w-full justify-between items-center">
            <Input
              placeholder="Search Provider by name"
              value={searchValue}
              className="px-4 py-6 rounded-full border border-neutral-200 hover:border-gs_white min-w-[60vw]"
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value);
                setFiltered(true);
              }}
            />
            <ItemsPerPageFilter
              itemPerPage={itemsPerPage}
              handleChange={(value: number) => {
                setItemPerPage(value);
                setFiltered(true);
              }}
            />
          </div>
        </div>

        {isFetching ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-4  items-center justify-center">
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
              <LoadingGameCard />
            </div>
          </>
        ) : (
          <>
            {haveProvider ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4 pt-4  items-stretch justify-center">
                {providers?.map((provider, index) => (
                  <ProviderCard provider={provider} key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4">
                <svg
                  height="200px"
                  width="200px"
                  viewBox="-24.69 -24.69 296.24 296.24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f5f5f5"
                  stroke="#f5f5f5"
                >
                  <g>
                    <path
                      d="M230.614,93.452c-11.592-45.333-25.152-55.611-40.246-38.556 c-7.488-26.783-22.85-47.706-52.236-52.93c-7.469-2.4-15.128-2.611-22.618-0.586C83.402,5.467,67.999,30.957,61.258,62.547 
          c-16.624-9.692-31.675,3.96-44.777,46.57c-4.475,15.728,6.347,27.396,13.787,15.424c11.973-17.309,20.719-25.052,26.626-24.319 
          c-1.079,27.736,1.561,55.662,3.586,75.476c-6.657,26.486,2.196,34.407,26.028,24.361c-13.624,35.946,13.095,51.335,32.337,18.27 
          c13.715,45.913,35.14,30.487,31.547-4.575c18.438,33.299,40.074,22.3,31.3-10.948h0.001c20.937,16.745,33.586,3.085,10.51-26.091 
          c2.592-24.594,6.135-58.033,3.65-89.156c4.32-6.46,12.127-0.389,24.043,20.316C225.678,119.063,234.092,108.15,230.614,93.452z 
          M147.011,56.697c6.185,0,11.202,7.94,11.202,17.739s-5.018,17.74-11.202,17.74c-6.183,0-11.202-7.941-11.202-17.74 
          S140.828,56.697,147.011,56.697z M103.824,56.887c6.183,0,11.203,7.941,11.203,17.739s-5.02,17.74-11.203,17.74 
          c-6.184,0-11.203-7.942-11.203-17.74C92.621,64.828,97.64,56.887,103.824,56.887z M90.461,154.741 
          c24.544-61.591,49.633-56.537,75.08,0.861C140.094,127.492,115.006,124.57,90.461,154.741z"
                    />
                  </g>
                </svg>
                <p>There is no Boardgame matched with your filter.</p>
              </div>
            )}
          </>
        )}

        <p>
          {page} / {maxPage}
        </p>
        <div className="flex justify-between mt-4 gap-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="btn"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === maxPage}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
