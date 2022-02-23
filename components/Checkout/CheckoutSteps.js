import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const CheckoutSteps = (props) => {
  return (
    <Flex className="checkout-steps">
      <Box className={props.step1 ? "active" : ""} align="center">
        <Flex gap={".2rem"} align="center" justify="center">
          {props.step2 ? (
            <FaCheckCircle size={25} />
          ) : (
            <Box borderRadius={"50%"} border="2px solid" w={"25px"}>
              1
            </Box>
          )}

          <Box>Shipping</Box>
        </Flex>
      </Box>
      <Box className={props.step2 ? "active" : ""} align="center">
        <Flex gap={".2rem"} align="center" justify="center">
          {props.step2 ? (
            <Box borderRadius={"50%"} border="2px solid" w={"25px"}>
              2
            </Box>
          ) : (
            ""
          )}

          <Box>Place Order</Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CheckoutSteps;
