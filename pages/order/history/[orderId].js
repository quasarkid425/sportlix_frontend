import React from "react";
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
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import { orderSuccess } from "../../../actions/order";

export async function getServerSideProps(context) {
  const orderId = context.query.orderId;
  const order = await orderSuccess(orderId);

  return {
    props: {
      order,
    },
  };
}

const CategoryProduct = ({ order }) => {
  return (
    <>
      <Box bg={"#000"}>
        <Container maxW="container.xl" p={5} py={20} minH="70vh">
          <VStack
            align="center"
            borderWidth="1px"
            borderRadius="lg"
            bg="#000"
            color={"#fff"}
            p={3}
          >
            <Heading size="md">Order {order._id}</Heading>
          </VStack>

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
                mt={"1rem"}
                align="start"
              >
                <Heading size="sm">Delivery Details</Heading>
                <Flex gap={"1rem"}>
                  <Text fontWeight={"semibold"}>Name: </Text>
                  <Text>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontWeight={"semibold"}>Address: </Text>

                  <UnorderedList listStyleType={"none"}>
                    <ListItem> {order.shippingAddress.address}</ListItem>
                    <ListItem>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state},{" "}
                      {order.shippingAddress.postalCode}
                    </ListItem>
                    <ListItem> {order.shippingAddress.country}</ListItem>
                  </UnorderedList>
                </Flex>
                <Flex gap={"1rem"}>
                  <Text fontWeight={"semibold"}>Shipped: </Text>
                  <Text>
                    {order.isDelivered ? (
                      <Badge colorScheme={"green"}>
                        Shipped on {order.updatedAt.substring(0, 10)}
                      </Badge>
                    ) : (
                      <Badge colorScheme={"red"}>Not shipped</Badge>
                    )}
                  </Text>
                </Flex>
                <Flex gap={"1rem"}>
                  <Text fontWeight={"semibold"}>Payment: </Text>
                  <Text>
                    {order.isPaid ? (
                      <Badge colorScheme={"green"}>Paid</Badge>
                    ) : (
                      <Badge colorScheme={"red"}>Not paid</Badge>
                    )}
                  </Text>
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
              >
                <Heading size="sm">Order Details</Heading>
                <VStack align={"start"} gap={"1rem"}>
                  {order.orderItems.map((item) => (
                    <Box key={item._id}>
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
                color={"#fff"}
                p={3}
                justify={"center"}
                mt={"1rem"}
              >
                <Heading size="sm">Order Summary</Heading>

                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Items</Text>
                  <Text>${order.itemsPrice.toFixed(2)}</Text>
                </Flex>

                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Shipping</Text>
                  <Text>${order.shippingPrice.toFixed(2)}</Text>
                </Flex>

                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Tax</Text>
                  <Text>${order.taxPrice.toFixed(2)}</Text>
                </Flex>

                <Flex align="center" justify={"space-between"} w="100%">
                  <Text fontWeight={"semibold"}>Order Total</Text>
                  <Text>${order.totalPrice.toFixed(2)}</Text>
                </Flex>
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CategoryProduct;
