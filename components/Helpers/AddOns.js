import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const AddOns = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const [cartAction, setCartAction] = useState(true);

  const cartItemNames = cartItems.map((cart) => cart.name);

  const cartActionHandler = (item) => {
    if (cartAction) {
      dispatch(
        cartActions.addToCart({ ...product, qty: 1, countInStock: product.qty })
      );
      setCartAction(false);
    } else {
      dispatch(cartActions.removeFromCart(item));
      setCartAction(true);
      const index = cartItemNames.findIndex((obj) => obj === item.name);
      cartItemNames.splice(index, 1);
    }
  };

  return (
    <div style={{ display: "flex", gap: ".5rem" }}>
      <div>
        <input
          type="checkbox"
          name={product.name}
          style={{ transform: "scale(1.2)" }}
          onClick={() => cartActionHandler(product)}
          checked={cartItemNames.includes(product.name)}
        />
      </div>
      <div>
        <Link
          href={`shop/product/${product.slug}`}
          style={{ fontSize: "1.6rem" }}
        >
          <a className="link-hover">{product.name}</a>
        </Link>
      </div>
    </div>
  );
};

export default AddOns;
