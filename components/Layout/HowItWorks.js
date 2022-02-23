import React, { useEffect } from "react";
import {
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { MotionBox } from "../../animations/animation";
import { BoxVariants } from "../../animations/animation";
import HealthyLifestyle from "./HowItWorks/HealthyLifestyle";
import Approve from "./HowItWorks/Approve";
import ReceiveMeals from "./HowItWorks/ReceiveMeals";

const HowItWorks = () => {
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
      <Container maxW="container.lg" px={10} py={"2rem"} id="how">
        <MotionBox
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={BoxVariants}
        >
          <VStack align="start">
            <Heading textTransform="uppercase" size="sm" color={"green.300"}>
              How it works
            </Heading>

            <Heading size="xl" color={"#fff"}>
              Your daily dose of health in 3 simple steps
            </Heading>
          </VStack>
        </MotionBox>
        <HealthyLifestyle />
        <Approve />
        <ReceiveMeals />
      </Container>
    </Box>
  );
};

export default HowItWorks;
