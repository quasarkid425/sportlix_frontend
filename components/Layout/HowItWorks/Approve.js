import React, { useEffect } from "react";
import { SimpleGrid, VStack, Heading, Text, Image } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { FromRightVariants, MotionBox } from "../../../animations/animation";

const Approve = () => {
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
        variants={FromRightVariants}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          display={{ base: "flex", md: "grid" }}
          flexDirection={{ base: "column-reverse", md: "none" }}
          spacingX="60px"
          py={4}
        >
          <Image
            src="https://res.cloudinary.com/dstyhxape/image/upload/v1645222258/backpack_img_2_hbgmof.png"
            alt="Phone charging out of baseball backpack"
            height={400}
            objectFit={"cover"}
          />
          <VStack align="start" justify="center">
            <Heading color={"gray.600"}>02</Heading>
            <Heading size="lg" color={"#fff"}>
              Always keep your phone charged
            </Heading>
            <Text pb={{ base: "40px", md: "0" }} color={"#a1a5b0"}>
              Once per week, approve the meal plan generated for you by Omnifood
              AI. You can change ingredients, swap entire meals, or even add
              your own recipes.
            </Text>
          </VStack>
        </SimpleGrid>
      </MotionBox>
    </>
  );
};

export default Approve;
