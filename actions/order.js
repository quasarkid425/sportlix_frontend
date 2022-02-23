import fetch from "isomorphic-fetch";

export const offer = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/products/offer`, {
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

export const recordOrder = (data) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const recordGiftCards = (data) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/giftcards`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const redeemGiftCard = (data) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/redeem`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchCardBalance = (data) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/searchBalance/${data}`, {
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

export const pay = (amount) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/intents`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const subscription = (email) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/subscription`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const createSubscription = (priceId, customerId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/createSubscription`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId,
      customerId,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const orderSuccess = (orderId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/success/${orderId}`, {
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

export const repeat = (orderId) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/orders/repeat/${orderId}`, {
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
