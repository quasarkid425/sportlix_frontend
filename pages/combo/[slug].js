import React, { useState } from "react";
import { combo } from "../../actions/shop";
import {
  Container,
  Stack,
  Heading,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import BabyJuiceCard from "../../components/Layout/BabyJuiceCard";
import BabySmoothieCard from "../../components/Layout/BabySmoothieCard";
import BabyFoodCard from "../../components/Layout/BabyFoodCard";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { productActions } from "../../store/productsSlice";

export async function getServerSideProps() {
  const data = await combo();

  return {
    props: {
      combo: data,
    },
  };
}

const Combo = ({ combo }) => {
  const [qty, setQty] = useState(1);

  const toast = useToast();
  const dispatch = useDispatch();
  const babyJuice = useSelector((state) => state.products.babyJuiceArr);
  const babySmoothies = useSelector((state) => state.products.babySmoothieArr);
  const babyFood = useSelector((state) => state.products.babyFoodArr);

  const addToCartHandler = () => {
    const [babyJuice1, babyJuice2] = babyJuice;
    const [babySmoothie1, babySmoothie2] = babySmoothies;
    const [babyFood1, babyFood2] = babyFood;
    const product = combo.comboProduct[0];
    product.name = `Baby Juices (1. ${babyJuice1.name}, 2.${babyJuice2.name}) - Baby Smoothies (1. ${babySmoothie1.name}, 2.${babySmoothie2.name}) - Baby Food (1. ${babyFood1.name}, 2.${babyFood2.name})`;
    dispatch(
      cartActions.addToCart({
        ...product,
        qty,
        countInStock: product.qty,
      })
    );

    dispatch(productActions.emptyBabyArrs());
    toast({
      title: "Product added to cart!",
      position: "top-right",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.lg" py={20} px={10}>
      <Stack>
        <Heading size={"md"}>Select Only Two Baby Juices</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
          {combo.juiceCombo.map((product) => (
            <BabyJuiceCard key={product._id} data={product} />
          ))}
        </SimpleGrid>
      </Stack>
      {babyJuice.length === 2 && (
        <Stack>
          <Heading size={"md"}>Select Only Two Baby Smoothies</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
            {combo.smoothieCombo.map((product) => (
              <BabySmoothieCard key={product._id} data={product} />
            ))}
          </SimpleGrid>
        </Stack>
      )}

      {babyJuice.length === 2 && babySmoothies.length === 2 ? (
        <Stack>
          <Heading size={"md"}>Select Only Two Baby Jars</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
            {combo.babyFoodCombo.map((product) => (
              <BabyFoodCard key={product._id} data={product} />
            ))}
          </SimpleGrid>
        </Stack>
      ) : (
        ""
      )}

      {babyJuice.length === 2 &&
      babySmoothies.length === 2 &&
      babyFood.length === 2 ? (
        <Stack alignItems={"center"} mt={"1rem"}>
          <Button
            bg={"green.300"}
            color={"white"}
            _hover={{
              bg: "green.200",
            }}
            width={"50%"}
            onClick={addToCartHandler}
          >
            Add to cart $55
          </Button>
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Combo;
