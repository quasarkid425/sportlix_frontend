import fetch from "isomorphic-fetch";

export const addOns = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/products/addons`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
