/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../hooks/useFetch";

function getDataEquivalentInteger(date) {
  const [year, month, day] = date.split("T")[0].split("/");
  return new Date(year, month, day).getMilliseconds();
}

function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

const dataFormat = {
  categories: [],
  products: [],
  campaigns: [],
  user: {},
};

function makeRequest(query) {
  const request = requestBuilder(getAuthHeaders(), "GET", null, null);
  return fetch("https://shopfortyfive.herokuapp.com/api" + query, request).then(
    (data) => data.json()
  );
}

async function getAllCategories() {
  const query = "/categories";
  const data = await makeRequest(query);
  return data;
}

async function getAllProducts() {
  const query = "/products";
  const productsIncludeQuery = {
    include: {
      discount: "true",
    },
  };
  const data = await makeRequest(
    query + "?" + encodeQuery(productsIncludeQuery)
  );
  return data;
}

function getDealsOfTheDay(products) {
  return products.filter((product) => {
    return product.discount.id;
  });
}
function getTrending(products) {
  const trends = [...products];
  trends.sort((a, b) => b.sell_count - a.sell_count);
  return trends;
}
function getNew(products) {
  const newprods = [...products];
  newprods.sort(
    (a, b) =>
      getDataEquivalentInteger(b.created_at) -
      getDataEquivalentInteger(a.created_at)
  );
  return newprods;
}
function getMoreToExplore(products) {
  return [];
}
async function getAllCampaigns() {
  const query = "/campaigns";
  const data = await makeRequest(query);
  return data;
}

function rewriteResponse(obj) {
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].length;
    }
  }
}

async function getRequireUserDetails(user_id) {
  const userIncludeQuery = {
    include: {
      wishlist: "true",
      order: "true",
      ticket: "true",
    },
  };
  let user = await makeRequest(
    "/users?id=" + user_id + "&" + encodeQuery(userIncludeQuery)
  );
  if (user.length > 0) user = user[0];
  else user = {};
  rewriteResponse(user);
  const sessionIncludeQuery = {
    include: {
      cart: "true",
    },
  };
  const session = await makeRequest(
    "/sessions?user_id=" + user_id + "&" + encodeQuery(sessionIncludeQuery)
  );
  let cartCount = 0;
  if (session.length != 0) {
    rewriteResponse(session[0]);
    cartCount = session[0].cart;
  }

  return { ...user, cart: cartCount };
}

function useHomepageData() {
  let user_id;
  if (typeof window != "undefined") {
    user_id = localStorage.getItem("userId");
  }
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(async () => {
    dataFormat.categories = await getAllCategories();
    if (dataFormat.categories.length > 5) {
      dataFormat.categories = dataFormat.categories.slice(0, 5);
    }
    const products = await getAllProducts();
    const dealsOfTheDay = getDealsOfTheDay(products);
    const trending = getTrending(products);
    const newLaunched = getNew(products);
    const moreToExplore = getMoreToExplore(products);
    dataFormat.products = products;
    dataFormat.campaigns = await getAllCampaigns();
    if (user_id) dataFormat.user = await getRequireUserDetails(user_id);
    if (user_id && moreToExplore.length > 0)
      dataFormat.products["More to Explore"] = moreToExplore;
    setData(dataFormat);
    setLoading(false);
  }, []);
  return [loading, data];
}

export function useUserData() {
  let userId;
  if (typeof window != "undefined") {
    userId = localStorage.getItem("userId");
  }
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  useEffect(async () => {
    if (userId) setUser(await getRequireUserDetails(userId));
    setLoading(false);
  }, []);
  return [loading, user];
}

export function getUserid() {
  let userId;
  if (typeof window != "undefined") {
    userId = localStorage.getItem("userId");
  }
  return userId;
}

export default useHomepageData;
