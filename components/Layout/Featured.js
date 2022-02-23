import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { MotionBox } from "../../animations/animation";
import { BoxVariants } from "../../animations/animation";
import { Container, VStack, Heading, Flex } from "@chakra-ui/react";
import TechCrunch from "../../assets/logos/business-insider.png";
import BusinessInsider from "../../assets/logos/business-insider.png";
import NewYorkTimes from "../../assets/logos/the-new-york-times.png";
import Forbes from "../../assets/logos/forbes.png";
import UsaToday from "../../assets/logos/usa-today.png";
import Image from "next/image";

const Featured = () => {
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
    <Container maxW="container.md" p={10}>
      <MotionBox
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={BoxVariants}
      >
        <VStack>
          <Heading
            size="xs"
            textTransform="uppercase"
            mb={3}
            color={"gray.500"}
          >
            As Featured In
          </Heading>
          <Flex w="full" gap={{ base: "1rem", md: "2rem" }} className="logos ">
            <Image src={TechCrunch} alt="Tech Crunch Logo" />
            <Image src={BusinessInsider} alt="Business Insider Crunch Logo" />
            <Image src={NewYorkTimes} alt="New York Times Logo" />
            <Image src={Forbes} alt="Forbes Logo" />
            <Image src={UsaToday} alt="Usa Today Logo" />
          </Flex>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Featured;
