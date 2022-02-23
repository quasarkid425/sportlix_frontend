import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { MotionBox } from "../../animations/animation";
import { BoxVariants } from "../../animations/animation";
import {
  Container,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { FaInfinity, FaAppleAlt, FaLeaf, FaPauseCircle } from "react-icons/fa";

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <Box bg={"#000"}>
      <Container maxW="container.lg" px={10} py={"3rem"}>
        <MotionBox
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={BoxVariants}
        >
          <VStack align="start">
            <Heading textTransform="uppercase" size="md" color={"green.300"}>
              Features
            </Heading>
            <Heading textTransform="uppercase" size="lg" color={"#fff"}>
              The best food delivery service around
            </Heading>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacingX="40px"
            spacingY="35px"
            py={"2rem"}
          >
            <VStack>
              <Box w="full" align="center">
                <FaInfinity size={30} color={"green"} />
              </Box>

              <Heading size="md" color={"#fff"}>
                Never cook again!
              </Heading>
              <Text align="center" color={"#a1a5b0"}>
                Our subscriptions cover 365 days per year, even including major
                holidays.
              </Text>
            </VStack>
            <VStack>
              <VStack>
                <Box w="full" align="center">
                  <FaAppleAlt size={30} color={"green"} />
                </Box>

                <Heading size="md" w="full" align="center" color={"#fff"}>
                  Local and organic
                </Heading>
                <Text align="center" color={"#a1a5b0"}>
                  Our cooks only use local, fresh, and organic products to
                  prepare your meals.
                </Text>
              </VStack>
            </VStack>
            <VStack>
              <VStack>
                <Box w="full" align="center">
                  <FaLeaf size={30} color={"green"} />
                </Box>

                <Heading size="md" w="full" align="center" color={"#fff"}>
                  No waste
                </Heading>
                <Text align="center" color={"#a1a5b0"}>
                  All our partners only use reusable containers to package all
                  your meals.
                </Text>
              </VStack>
            </VStack>
            <VStack>
              <VStack>
                <Box w="full" align="center">
                  <FaPauseCircle size={30} color={"green"} />
                </Box>

                <Heading size="md" w="full" align="center" color={"#fff"}>
                  Pause anytime
                </Heading>
                <Text align="center" color={"#a1a5b0"}>
                  Going on vacation? Just pause your subscription, and we refund
                  unused days.
                </Text>
              </VStack>
            </VStack>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Features;
