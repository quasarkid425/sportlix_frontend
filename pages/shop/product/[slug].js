import React, { useState } from "react";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Image,
  VStack,
  Flex,
  Heading,
  Text,
  Select,
  Button,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import { product } from "../../../actions/shop";
import { FiArrowLeft } from "react-icons/fi";
import { relatedProducts } from "../../../actions/products";

export async function getServerSideProps(context) {
  const slug = context.query.slug;

  const data = await product(slug);

  return {
    props: {
      product: data,
    },
  };
}

const Product = ({ product }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [featuredImg, setFeaturedImg] = useState(product.image);

  const { image: mainImg } = product;
  const { listingImages: listImgs } = product;

  console.log(mainImg);

  const addToCartHandler = (type) => {
    dispatch(
      cartActions.addToCart({
        ...product,
        qty,
        countInStock: product.qty,
      })
    );
    toast({
      title: "Product added to cart!",
      position: "top-right",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const changeImgHandler = (img) => {
    setFeaturedImg(img);
  };

  return (
    <>
      <Head>
        <title>Sportlix || {product.name}</title>
        <meta name="description" content={product.desc} />
      </Head>

      <Box bg={"#000"} color={"#fff"}>
        <Container
          maxW="container.xl"
          p={{ base: 10, md: 0 }}
          pb={"5rem"}
          minH={"85vh"}
        >
          <Grid
            minH={"80vh"}
            gap={".5rem"}
            gridTemplateColumns={{
              base: "100px 1fr",
              md: "100px 1fr 1fr 1fr",
            }}
          >
            <GridItem h={"100%"}>
              <Flex
                flexDirection={"column"}
                gap="1rem"
                h={"100%"}
                justify="center"
              >
                {product.listingImages.map((img) => (
                  <Image
                    src={img}
                    alt={"A main product image"}
                    borderRadius={".5rem"}
                    w={"200px"}
                    cursor={"pointer"}
                    onMouseOver={() => changeImgHandler(img)}
                  />
                ))}
              </Flex>
            </GridItem>
            <GridItem margin={{ base: "4rem auto", md: "10rem auto" }}>
              <Image
                src={featuredImg}
                alt={"Featured product image"}
                borderRadius={".5rem"}
                h={"400px"}
                objectFit={"cover"}
              />
            </GridItem>
            <GridItem
              margin={{ base: "0 auto", md: "10rem auto" }}
              colSpan={{ base: 2, md: 1 }}
              m={0}
              mb={{ base: "4rem", md: 0 }}
            >
              <VStack pt={{ base: "0", md: "2rem" }} ml={"2.7rem"}>
                <Heading size={"md"} mb={"1rem"} textAlign="center">
                  {product.name}
                </Heading>

                <Text textAlign={"center"}>{product.desc}</Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }} m={0}>
              <VStack
                borderWidth="1px"
                borderRadius="lg"
                bg="#000"
                color={"#fff"}
                p={3}
                w={"15rem"}
                h={"13rem"}
                margin={{ base: "0 auto", md: "10rem auto" }}
                justifyContent={"center"}
              >
                <Flex justify={"space-between"} w={"100%"}>
                  {product.inStock > 0 ? (
                    <>
                      <Text fontWeight={"semibold"}>Price:</Text>
                      <Text>${product.price}</Text>
                    </>
                  ) : (
                    ""
                  )}
                </Flex>
                <Flex justify={"space-between"} w={"100%"}>
                  <Text fontWeight={"semibold"}>Status:</Text>

                  {product.inStock > 0 ? (
                    <Text color="green.300">In Stock</Text>
                  ) : (
                    <Text color="red.500">Unavailable</Text>
                  )}
                </Flex>

                {product.inStock > 0 && (
                  <>
                    <Flex justify={"space-between"} align={"center"} w={"100%"}>
                      <Text fontWeight={"semibold"}>Qty:</Text>
                      <Box>
                        <Select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.qty).keys()].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                              style={{ background: "#000" }}
                            >
                              {x + 1}
                            </option>
                          ))}
                        </Select>
                      </Box>
                    </Flex>
                    <Box align={"end"} pt={2} w={"100%"}>
                      <Button
                        onClick={addToCartHandler}
                        bgGradient="linear(to-r, #59f9b7, #66feea)"
                        _hover={{
                          bgGradient: "linear(to-r, #59f9b7, #66feea)",
                        }}
                        _active={{
                          bgGradient: "linear(to-r, #59f9b7, #66feea)",
                        }}
                        _focus={{ boxShadow: "none" }}
                        color={"#000"}
                        w={"100%"}
                      >
                        Add to Cart
                      </Button>{" "}
                    </Box>
                  </>
                )}
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Product;
