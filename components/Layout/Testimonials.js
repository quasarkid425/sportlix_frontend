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

const Testimonials = () => {
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
      <MotionBox
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={BoxVariants}
      >
        <Container maxW="container.lg" px={10} py={"3rem"}>
          <VStack align="start">
            <Heading textTransform="uppercase" size="md" color={"green.300"}>
              Testimonials
            </Heading>
            <Heading textTransform="uppercase" size="lg" color={"#fff"}>
              Once you try it, you can not go back
            </Heading>
          </VStack>

          <Container maxW="container.lg" pt={6}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacingX="40px"
              spacingY="35px"
              py={"2rem"}
            >
              <VStack color={"#a1a5b0"}>
                <Text position="relative">
                  <Box
                    position={"absolute"}
                    top="-1.5rem"
                    left={"-1.5rem"}
                    color={"green.200"}
                    fontSize={"3rem"}
                  >
                    &ldquo;
                  </Box>
                  Awesome softball bag I grabbed for my spouse. Fits all of her
                  best perfectly with a separate compartment for dirty smelly
                  shoes. USB port for keeping phone charged during long
                  tournament weekends. &rdquo;
                </Text>
                <Text>-Emily Reeb</Text>
              </VStack>
              <VStack color={"#a1a5b0"}>
                <Text align="center" position={"relative"}>
                  <Box
                    position={"absolute"}
                    top="-1.5rem"
                    left={"-1.5rem"}
                    color={"green.200"}
                    fontSize={"3rem"}
                  >
                    &ldquo;
                  </Box>
                  Loved this product! Bought it for my fianc?? for his coaching
                  bag and it???s still going strong after a year! &rdquo;
                </Text>
                <Text>-Marissa Burns</Text>
              </VStack>
              <VStack color={"#a1a5b0"}>
                <Text align="center" position={"relative"}>
                  <Box
                    position={"absolute"}
                    top="-1.5rem"
                    left={"-1.5rem"}
                    color={"green.200"}
                    fontSize={"3rem"}
                  >
                    &ldquo;
                  </Box>
                  Second one we&apos;ve bought...just keeps getting better!!
                  Wish I had a need for a third. Wonderful to do business with!!
                  &rdquo;
                </Text>
                <Text>-Darryl Stoddard</Text>
              </VStack>
              <VStack color={"#a1a5b0"}>
                <Text align="center" position={"relative"}>
                  <Box
                    position={"absolute"}
                    top="-1.5rem"
                    left={"-1.5rem"}
                    color={"green.200"}
                    fontSize={"3rem"}
                  >
                    &ldquo;
                  </Box>
                  Bought this bag as a gift for my son and he absolutely loves
                  it. It has plenty of space to hold all of his gear and the
                  charger on the wide of the bag is really awesome. Very durable
                  and nice looking bag. Highly recommend! &rdquo;
                </Text>
                <Text align="start">-RedSox5918</Text>
              </VStack>
            </SimpleGrid>
          </Container>
        </Container>
      </MotionBox>
    </Box>
  );
};

export default Testimonials;
