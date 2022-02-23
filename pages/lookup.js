import React, { useState, useRef } from "react";
import {
  Container,
  Heading,
  Flex,
  Button,
  Input,
  VStack,
  useToast,
  Text,
  Badge,
} from "@chakra-ui/react";
import { searchCardBalance } from "../actions/order";

const Lookup = () => {
  const discountRef = useRef();
  const toast = useToast();
  const [balance, setBalance] = useState("");

  const searchCardHandler = () => {
    const card = discountRef.current.value;
    searchCardBalance(card)
      .then((data) => {
        if (data.card === "Not found") {
          toast({
            description: "Gift card not found",
            position: "top",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setBalance(data.card);
        }
        discountRef.current.value = "";
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxW="container.xl" p={{ base: 10, md: 20 }} mb={20}>
      <VStack>
        <Heading size={"md"} textAlign={"center"} mb={"1rem"}>
          Search Gift Card Balance
        </Heading>
        <Flex gap={"1rem"} mb={"1rem"}>
          <Input
            type="text"
            placeholder="Search card balance"
            height={"2rem"}
            ref={discountRef}
            onChange={() => setBalance(null)}
          />
          <Button
            bg="green.200"
            _hover={{
              bg: "green.100",
            }}
            type="submit"
            height={"2rem"}
            onClick={searchCardHandler}
          >
            Search
          </Button>
        </Flex>
      </VStack>

      {balance && (
        <>
          <Text textAlign={"center"} mt={4}>
            The remaing card balance is:{" "}
            <Badge colorScheme="yellow" fontSize={"lg"}>
              ${balance}
            </Badge>
          </Text>
        </>
      )}
    </Container>
  );
};

export default Lookup;
