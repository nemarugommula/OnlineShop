import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Router, { useRouter } from "next/router";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/react/solid";
import Card from "../components/Card";
import useFetch, { requestBuilder, getAuthHeaders } from "../hooks/useFetch";

function findBySearchKeyWords(searchKey, products) {
  return products.filter((product) => {
    const name = product.name;
    //additional logic based on extra fields or new fields according to requiremnt
    //take them as reference and further increase search power
    const searchPool = [...name.split(" ").map((item) => item.toLowerCase())];
    const allSearchKeys = searchKey.split(" ") || [];

    const found = allSearchKeys.reduce((result, key) => {
      if (!key || key.length == 0) return result;
      if (result) return true;

      return searchPool.indexOf(key) != -1;
    }, false);
    return found;
  });
}

function Filter() {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState();
  const [filterCondition, setFilterCondition] = useState();
  const request = requestBuilder(getAuthHeaders(), "GET", null, null);

  useEffect(() => {
    let url = "https://shopfortyfive.herokuapp.com/api/products";

    let searchKey = "";
    if (router.query.searchTerm) searchKey = router.query.searchTerm;
    fetch(url, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" response : " + JSON.stringify(response));
        const c = findBySearchKeyWords(searchKey, response);
        console.log(" filtered data : " + JSON.stringify(c));
        setFilteredData(c);
      })
      .catch((err) => {
        console.log("error " + err);
      });
  }, [router.query.searchTerm]);

  return (
    <div className="bg-slate-50 flex h-screen w-screen flex-col">
      <Navbar />
      <main className="mt-2 flex-1 w-full shadow-sm flex gap-2 bg-white max-w-screen-2xl mx-auto">
        <div className=" border-r-2  min-w-[20%] p-5">
          <h1 className="text-2xl pb-3 font-light tracking-widest shadow-sm ">
            Filters
          </h1>

          <div className="my-3">
            <h1>Based on stars</h1>
          </div>
          <div className="my-3">
            <h1>Price range selector</h1>
          </div>
          <div className="my-3">
            <h1>Based on purchase count</h1>
          </div>
          <div className="my-3">
            <h1>Based on date</h1>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-4  flex-wrap p-2">
            {filteredData && filteredData.length > 0 ? (
              <div clasName="w-full">
                {filteredData.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-black font-light  text-2xl ">
                <div className="w-full aspect-video">
                  <img src="/noproducts.svg " />
                </div>
                <h1 className="text-center mt-4">
                  No Products found for the query!!
                </h1>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Filter;
