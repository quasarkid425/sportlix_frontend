import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { MotionBox } from "../../animations/animation";

const Card = ({ product, bestSeller, featured }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const addToCartHandler = (product) => {
    dispatch(
      cartActions.addToCart({ ...product, qty: 1, countInStock: product.qty })
    );
    toast({
      title: "Product added to cart!",
      position: "top-right",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <>
      <Flex w="full" alignItems="center" justifyContent="center">
        <MotionBox
          bg={useColorModeValue("white", "gray.800")}
          borderWidth="1px"
          shadow="lg"
          position="relative"
          align="center"
          w={300}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <Link href={`/shop/product/${product.slug}`} passHref>
            <Image
              src={product.image}
              alt={`Picture of ${product.name}`}
              roundedTop="lg"
              height={300}
              w="100%"
              cursor={"pointer"}
            />
          </Link>

          <Box p="5" bg={"#000"}>
            <Box d="flex" alignItems="baseline">
              <Badge
                rounded="full"
                px="2"
                fontSize="0.8em"
                colorScheme={bestSeller ? "green" : featured ? "blue" : "red"}
              >
                {bestSeller ? "Best Seller" : featured ? "Featured" : "New"}
              </Badge>
            </Box>
            <Flex mt="1">
              <Box
                fontSize="1rem"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                textAlign={"left"}
              >
                <Link href={`/shop/product/${product.slug}`}>
                  <a className="link-hover">{product.name}</a>
                </Link>
              </Box>
            </Flex>

            <Flex justifyContent="space-between" alignContent="start">
              <Box fontSize="2xl" color={"#fff"}>
                <Box as="span" fontSize="lg" color={"#fff"}>
                  $
                </Box>
                {product.price.toFixed(2)}
              </Box>

              <Tooltip
                label="Add to cart"
                bg="white"
                placement={"top"}
                color={"gray.800"}
                fontSize={"1.2em"}
              >
                <chakra.a href={"#"} display={"flex"}>
                  <Icon
                    as={FiShoppingCart}
                    h={6}
                    w={6}
                    alignSelf={"center"}
                    onClick={() => addToCartHandler(product)}
                  />
                </chakra.a>
              </Tooltip>
            </Flex>
          </Box>
        </MotionBox>
      </Flex>
    </>
  );
};

export default Card;
