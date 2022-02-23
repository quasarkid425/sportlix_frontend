import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { orderActions } from "../../store/orderSlice";

const Offer = ({ item, onRemoveFromCart }) => {
  const dispatch = useDispatch();
  const [cartAction, setCartAction] = useState(true);

  const cocoBallsImage = item.image;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div className="one-time">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Link href={`/shop/product/${item.slug}`}>
            <img
              src={cocoBallsImage}
              alt="balls image"
              height={"200rem"}
              width={"150rem"}
            />
          </Link>

          <Box>
            Want to enjoy a healthy and nutritious snack on the go? Click YES to
            add the new product to your order now!
          </Box>
        </div>
      </div>
      <div className="one-border">
        <input
          type="checkbox"
          name={item.name}
          onClick={() => {
            if (cartAction) {
              onRemoveFromCart();
              dispatch(
                cartActions.addToCart({
                  ...item,
                  qty: 1,
                  countInStock: item.qty,
                })
              );
              dispatch(orderActions.addAddOn(item.price));
              setCartAction(false);
            } else {
              dispatch(cartActions.removeFromCart(item));

              setCartAction(true);
            }
          }}
        />{" "}
        Yes, I Want the Coconut Cashew Chia Seed Energy Bites for Only $12!
      </div>
    </div>
  );
};

export default Offer;
