import React, { useEffect } from "react";
import { SimpleGrid, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { MotionBox, FromLeftVariants } from "../../../animations/animation";

const ReceiveMeals = () => {
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
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="40px" py={8}>
          <VStack align="start" justify="center">
            <Heading color={"gray.600"}>03</Heading>
            <Heading size="lg" color={"#fff"}>
              Do not worry about the durability anymore
            </Heading>
            <Text pb={{ base: "40px", md: "0" }} color={"#a1a5b0"}>
              Best chefs in town will cook your selected meal every day, and we
              will deliver it to your door whenever works best for you. You can
              change delivery schedule and address daily!
            </Text>
          </VStack>
          <Image
            src="https://res.cloudinary.com/dstyhxape/image/upload/v1645222258/backpack_img_5_ccjb6x.png"
            alt="Picture of baseball or softball backpack resting on a bench at a ball field"
            height={400}
            objectFit={"cover"}
          />
        </SimpleGrid>
      </MotionBox>
    </>
  );
};

export default ReceiveMeals;
