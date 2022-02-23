import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  Container,
  Image,
  Box,
  Flex,
  Select,
  Heading,
  Text,
  VStack,
  Button,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { addOns } from "../actions/cart";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "../animations/animation";
import { v4 as uuidv4 } from "uuid";

export async function getServerSideProps(context) {
  const data = await addOns();

  return {
    props: {
      addOns: data,
    },
  };
}

const Cart = ({ addOns }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const router = useRouter();

  const removeFromCartHandler = (item) => {
    dispatch(cartActions.removeFromCart(item));
    toast({
      title: `Item removed successfully`,
      status: "error",
      isClosable: true,
      position: "top-right",
      duration: 1000,
      isClosable: true,
    });
  };

  const changeCartQtyHandler = (item, qty, amount) => {
    let giftCardUids = [];
    if (item.includes("Gift Card")) {
      const gcArr = new Array(parseInt(qty));

      for (let i = 0; i < gcArr.length; i++) {
        giftCardUids.push({
          giftCardId: uuidv4().split("-")[0],
          amount: amount,
        });
      }
    }

    dispatch(cartActions.updateQty({ item, qty, giftCardUids }));
  };
  const checkoutHandler = () => {
    // history.push(`${isLoggedIn ? "/shipping" : "/login"}`);
    router.push("/shipping");
  };

  return (
    <>
      <Head>
        <title>Sportlix || Cart</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"} color={"#fff"}>
        <Container
          maxW="container.xl"
          p={{ base: 10, md: 20 }}
          pb={20}
          minH={"70vh"}
        >
          <Heading size="md" mb={3}>
            Shopping Cart
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={{ base: "", md: "3rem" }}
          >
            {cartItems.length === 0 ? (
              <GridItem
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                colSpan={2}
              >
                <Text>Cart is empty</Text>
                <Link href="/shop">
                  <a className="link-hover">Go Shopping</a>
                </Link>
              </GridItem>
            ) : (
              <GridItem colSpan={2}>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <Box key={item._id} style={{ position: "relative" }} mb={3}>
                      <MotionBox
                        borderWidth="1px"
                        borderRadius="lg"
                        bg="black"
                        p={2}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <Flex align={"center"} gap={"1rem"} mb={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            height={55}
                            w={55}
                            objectFit="cover"
                          />
                          <Box>
                            <Link href={`/shop/product/${item.slug}`} passHref>
                              <a className="link-hover">{item.name} </a>
                            </Link>
                          </Box>
                        </Flex>

                        <Flex align="center" gap={"1rem"}>
                          <Select
                            onChange={(e) =>
                              changeCartQtyHandler(
                                item.name,
                                e.target.value,
                                item.price
                              )
                            }
                            value={item.qty}
                            w={"5rem"}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option
                                key={x + 1}
                                value={x + 1}
                                style={{ background: "#000" }}
                              >
                                {x + 1}
                              </option>
                            ))}
                          </Select>
                          <Box className="price">${item.price}</Box>
                          <Box>=</Box>
                          <Box>${(item.qty * item.price).toFixed(2)}</Box>
                        </Flex>

                        <Button
                          type="button"
                          onClick={() => removeFromCartHandler(item)}
                          style={{
                            fontSize: "1rem",
                            background: "transparent",
                            padding: ".5rem",
                            font: "inherit",
                            border: "none",
                            position: "absolute",
                            top: "-.35rem",
                            right: "-.35rem",
                          }}
                        >
                          <IoClose size={20} color={"red"} />
                        </Button>
                      </MotionBox>
                    </Box>
                  ))}
                </AnimatePresence>
              </GridItem>
            )}
            {cartItems.length > 0 ? (
              <GridItem w={"100%"}>
                <VStack
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="black"
                  p={3}
                  h={"10rem"}
                  justify={"center"}
                >
                  <Heading size={"md"} fontWeight={"semibold"} mb={3}>
                    Subtotal ({cartItems.reduce((a, c) => a + +c.qty, 0)} items)
                    : $
                    {cartItems
                      .reduce((a, c) => a + c.price * c.qty, 0)
                      .toFixed(2)}
                  </Heading>
                  <Button
                    w="100%"
                    bgGradient="linear(to-r, #59f9b7, #66feea)"
                    _hover={{
                      bgGradient: "linear(to-r, #59f9b7, #66feea)",
                    }}
                    _active={{
                      bgGradient: "linear(to-r, #59f9b7, #66feea)",
                    }}
                    _focus={{ boxShadow: "none" }}
                    color={"#000"}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </VStack>
              </GridItem>
            ) : (
              ""
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Cart;
