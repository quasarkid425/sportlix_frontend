import React, { useEffect } from "react";
import { SimpleGrid, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { FromLeftVariants, MotionBox } from "../../../animations/animation";

const HealthyLifestyle = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.6,
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <>
      <MotionBox
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={FromLeftVariants}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="40px" py={"3rem"}>
          <VStack align="start" justify="center">
            <Heading color={"gray.600"}>01</Heading>
            <Heading size="lg" color={"#fff"}>
              Enjoy the comfort of this backpack
            </Heading>
            <Text pb={{ base: "40px", md: "0" }} color={"#a1a5b0"}>
              Never again waste time thinking about what to eat! Omnifood AI
              will create a 100% personalized weekly meal plan just for you. It
              makes sure you get all the nutrients and vitamins you need, no
              matter what diet you follow!
            </Text>
          </VStack>
          <Image
            src="https://res.cloudinary.com/dstyhxape/image/upload/v1645211180/mw50djpxuvsi5ifaials.png"
            alt="Person wearing a comfortable baseball or softball backpack"
            height={400}
            objectFit={"cover"}
          />
        </SimpleGrid>
      </MotionBox>
    </>
  );
};

export default HealthyLifestyle;
