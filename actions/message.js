import fetch from "isomorphic-fetch";

export const sendMessage = (msg) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/cta/message`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
