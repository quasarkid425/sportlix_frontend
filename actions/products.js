export const bestsellerFeatured = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/products/bestsellerFeatured`, {
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

export const relatedProducts = (productName) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API}/products/related/${productName}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
