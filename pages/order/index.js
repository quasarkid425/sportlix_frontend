import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CheckoutLayout from "../../components/Checkout/CheckoutLayout";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import { IoClose } from "react-icons/io5";
import slugify from "slugify";

import {
  Container,
  Image,
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  UnorderedList,
  ListItem,
  Stack,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { cartActions } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../store/orderSlice";
import {
  offer,
  recordOrder,
  recordGiftCards,
  redeemGiftCard,
} from "../../actions/order";
import { FiArrowLeft } from "react-icons/fi";

export async function getServerSideProps() {
  const data = await offer();

  return {
    props: {
      offer: data,
    },
  };
}

const Order = ({ offer }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [miles, setMiles] = useState(null);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cart);

  const [display, setDisplay] = useState(true);
  const [closeIcon, setCloseIcon] = useState(false);
  const toast = useToast();

  const shippingDetails = useSelector(
    (state) => state.shipping.shippingDetails
  );

  const toPrice = (num) => Number(num.toFixed(2));

  const [discountPrice, setDiscountPrice] = useState(false);
  const discountRef = useRef();
  const originalItems = useSelector((state) => state.orders.originalItems);
  const originalShipping = useSelector(
    (state) => state.orders.originalShipping
  );
  const originalTax = useSelector((state) => state.orders.originalTax);
  const originalTotal = useSelector((state) => state.orders.originalTotal);
  const originalStartingPrice = useSelector(
    (state) => state.orders.originalStartingPrice
  );

  const cocoBalls = cartItems.find(
    (item) => item.name === "Coconut Cashew Chia Seed Energy Bites"
  );

  const removeFromCartHandler = (item) => {
    dispatch(orderActions.removeAddOn(item.price));
    dispatch(cartActions.removeFromCart(item));
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/shop");
    }

    const cartLength = cartItems.length;
    let count = 0;
    for (let i = 0; i < cartLength; i++) {
      if (cartItems[i].name.includes("Gift Card")) {
        count++;
      }
    }
    if (cartLength === count) {
      shippingPrice = 0;
    } else {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API}/users/miles/${shippingDetails.postalCode}`
        )
        .then(({ data }) => {
          setMiles(data.distance);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    dispatch(
      orderActions.setOrignalPrices({
        originalItems: priceOfItems,
        originalShipping: shippingPrice ? shippingPrice : 0,
        orginalTax: taxPrice,
        originalTotal: 1,
      })
    );
  }, [miles, priceOfItems, shippingPrice, taxPrice]);

  const calculateShipping = () => {
    if (miles > 10) {
      return toPrice(10);
    } else {
      return toPrice(0);
    }
  };

  const priceOfItems = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  let shippingPrice = calculateShipping();
  const taxPrice = toPrice(0.0625 * priceOfItems);

  const onSuccessfulCheckout = async () => {
    const cartData = cartItems.map((item) => {
      return {
        product: item._id,
        slug: slugify(item.name).toLowerCase(),
        name: item.name,
        price: item.price,
        qty: item.qty,
        type: item.type,
        category: item.category,
        cloudinaryId: item.cloudinaryId,
        image: item.image,
      };
    });

    console.log(cartData);
    const data = {
      cartItems: cartData,
      shippingDetails,
      priceOfItems: priceOfItems,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: originalTotal,
      user: shippingDetails.email,
      registeredUser: isLoggedIn ? user._id : "",
      isPaid: true,
      paidAt: Date.now(),
      isDelivered: false,
    };
    const order = await recordOrder(data);

    router.push(`/success/${order._id}`);
  };

  return (
    <>
      <Head>
        <title>Sportlix || Order</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"} color={"#fff"}>
        <Container maxW="container.xl" p={5} pb={20} minH={"80vh"}>
          <CheckoutSteps step1 step2 />
          <Box pt={6} pb={8}>
            <Link href="/shipping">
              <Button
                leftIcon={<FiArrowLeft />}
                variant="ghost"
                px={0}
                _hover={{
                  bg: "",
                  color: "#51cf66",
                  transition: ".3s",
                }}
                _focus={{
                  outline: "none",
                }}
                _active={{
                  background: "",
                }}
              >
                Back to shipping
              </Button>
            </Link>
          </Box>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={{ base: "", md: "3rem" }}
          >
            <GridItem colSpan={2}>
              <VStack
                borderWidth="1px"
                borderRadius="lg"
                bg="#000"
                p={3}
                align="start"
              >
                <Heading size="sm">Delivery Details</Heading>
                <Flex gap={"1rem"}>
                  <Text fontWeight={"semibold"}>Name: </Text>
                  <Text>
                    {shippingDetails.firstName} {shippingDetails.lastName}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontWeight={"semibold"}>Address: </Text>

                  <UnorderedList listStyleType={"none"}>
                    <ListItem> {shippingDetails.address}</ListItem>
                    <ListItem>
                      {shippingDetails.city}, {shippingDetails.state},{" "}
                      {shippingDetails.postalCode}
                    </ListItem>
                    <ListItem> {shippingDetails.country}</ListItem>
                  </UnorderedList>
                </Flex>
              </VStack>
              <VStack
                borderWidth="1px"
                borderRadius="lg"
                bg="#000"
                p={3}
                align="start"
                mt={"1rem"}
                pb={"1rem"}
              >
                <Heading size="sm">Order Details</Heading>
                <VStack align={"start"} gap={"1rem"}>
                  {cartItems.map((item) => (
                    <Box key={item._id} position={"relative"}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap="2rem">
                        <Flex align={"center"} gap={"1rem"}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            height={55}
                            w={55}
                            objectFit="cover"
                          />
                          <Box>
                            <Link href={`/shop/product/${item.slug}`} passHref>
                              <a className="link-hover">{item.name}</a>
                            </Link>
                          </Box>
                        </Flex>
                        <Flex align="center">
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Flex>
                      </SimpleGrid>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </GridItem>
            <GridItem>
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                bg="#000"
                p={3}
                justify={"center"}
                mb={3}
              >
                <Heading size="sm">Order Summary</Heading>

                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Items</Text>
                  <Text>${originalItems.toFixed(2)}</Text>
                </Flex>
                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Shipping</Text>
                  <Text>${originalShipping.toFixed(2)}</Text>
                </Flex>
                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Tax</Text>
                  <Text>${originalTax.toFixed(2)}</Text>
                </Flex>

                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Order Total</Text>
                  <Text>${originalTotal.toFixed(2)}</Text>
                </Flex>

                <CheckoutLayout>
                  <CheckoutForm
                    price={originalTotal.toFixed(2)}
                    shippingDetails={shippingDetails}
                    onSuccessfulCheckout={onSuccessfulCheckout}
                    cart={cartItems}
                  />
                </CheckoutLayout>
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Order;
