import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CheckoutLayout from "../../../components/Checkout/CheckoutLayout";
import CheckoutForm from "../../../components/Checkout/CheckoutForm";
import CheckoutSteps from "../../../components/Checkout/CheckoutSteps";
import axios from "axios";
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
} from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { repeat, recordOrder } from "../../../actions/order";
import { FiArrowLeft } from "react-icons/fi";

export async function getServerSideProps(context) {
  const data = await repeat(context.query.orderId);

  return {
    props: {
      order: data,
    },
  };
}

const Order = ({ order }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [miles, setMiles] = useState(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const { shippingAddress: shippingDetails } = order;
  const { orderItems: cartItems } = order;

  useEffect(() => {
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
  }, []);

  const calculateShipping = () => {
    if (miles > 10) {
      return toPrice(10);
    } else {
      return toPrice(0);
    }
  };

  const toPrice = (num) => Number(num.toFixed(2));
  const priceOfItems = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  let shippingPrice = calculateShipping();
  const taxPrice = toPrice(0.0625 * priceOfItems);
  const totalPrice = priceOfItems + shippingPrice + taxPrice;

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
    const data = {
      cartItems: cartData,
      shippingDetails,
      priceOfItems: priceOfItems,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
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
      <Box bg={"#000"}>
        <Container maxW="container.xl" p={5} pb={20}>
          {order.error ? (
            <>
              <Text color={"red.400"} fontSize="1.5rem">
                {order.error}
              </Text>
              <Link href={`/shop`}>
                <a className="link-hover">Go shopping again</a>
              </Link>
            </>
          ) : (
            <>
              <CheckoutSteps step1 step2 />
              <Box pt={6} pb={8}>
                <Link href={`/user/history/${user._id}`}>
                  <Button
                    leftIcon={<FiArrowLeft />}
                    variant="ghost"
                    color={"#fff"}
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
                    Back
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
                    color={"#fff"}
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
                    color={"#fff"}
                    p={3}
                    align="start"
                    mt={"1rem"}
                    mb={"1rem"}
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
                                <Link
                                  href={`/shop/product/${item.slug}`}
                                  passHref
                                >
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
                    color={"#fff"}
                    p={3}
                    justify={"center"}
                    mb={3}
                  >
                    <Heading size="sm">Order Summary</Heading>

                    <Flex align="center" justify={"space-between"} w="100%">
                      <Text fontWeight={"semibold"}>Items</Text>
                      <Text>${priceOfItems.toFixed(2)}</Text>
                    </Flex>

                    <Flex align="center" justify={"space-between"} w="100%">
                      <Text fontWeight={"semibold"}>Shipping</Text>
                      <Text>${shippingPrice.toFixed(2)}</Text>
                    </Flex>

                    <Flex align="center" justify={"space-between"} w="100%">
                      <Text fontWeight={"semibold"}>Tax</Text>
                      <Text>${taxPrice.toFixed(2)}</Text>
                    </Flex>

                    <Flex align="center" justify={"space-between"} w="100%">
                      <Text fontWeight={"semibold"}>Order Total</Text>
                      <Text>${order.totalPrice.toFixed(2)}</Text>
                    </Flex>
                    <CheckoutLayout>
                      <CheckoutForm
                        price={order.totalPrice.toFixed(2)}
                        shippingDetails={shippingDetails}
                        onSuccessfulCheckout={onSuccessfulCheckout}
                      />
                    </CheckoutLayout>
                  </Stack>
                </GridItem>
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Order;
