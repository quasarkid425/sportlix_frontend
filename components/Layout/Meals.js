import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { MotionBox } from "../../animations/animation";
import { BoxVariants } from "../../animations/animation";
import {
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const Meals = () => {
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
      <Container maxW="container.lg" px={10} pb={"4rem"} pt={"1rem"}>
        <MotionBox
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={BoxVariants}
        >
          <VStack>
            <Heading size="md" textTransform="uppercase" color={"green.300"}>
              Space
            </Heading>
            <Heading size="lg" color={"#fff"}>
              Easily hold all your necessary equipment
            </Heading>
          </VStack>

          <Grid
            templateColumns={"repeat(3, 1fr)"}
            spacingX="40px"
            spacingY="35px"
            px={6}
            py={"2rem"}
          >
            <GridItem colSpan={{ base: 3, md: 1 }} mb={"2rem"}>
              <VStack>
                <Heading size="lg" textAlign={{ base: "left" }} color={"#fff"}>
                  Enough room for:
                </Heading>
                <List
                  spacing={3}
                  w="full"
                  textAlign={{ base: "left" }}
                  color={"#a1a5b0"}
                >
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Helmets
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Gloves or mitts
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Cleats
                  </ListItem>

                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Favorite drinks
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Bats
                  </ListItem>

                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Gum
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Seeds
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Snacks
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Hats
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Batting gloves
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} color="green.500" />
                    Balls
                  </ListItem>
                </List>
              </VStack>
            </GridItem>

            <GridItem colSpan={{ base: 3, md: 2 }}>
              <video
                autoPlay
                loop
                muted
                style={{
                  height: "600px",
                  width: "85%",
                  objectFit: "cover",
                  margin: "0 auto",
                }}
              >
                <source src="/space_video.mp4" type="video/mp4" />
              </video>
            </GridItem>
          </Grid>

          <Center>
            <Link href={"/shop/product/baseball-softball-backpack"} passHref>
              <Button
                rightIcon={<FiArrowRight size={20} />}
                bgGradient="linear(to-r, #59f9b7, #66feea)"
                _hover={{
                  bgGradient: "linear(to-r, #59f9b7, #66feea)",
                }}
                _active={{
                  bgGradient: "linear(to-r, #59f9b7, #66feea)",
                }}
                _focus={{ boxShadow: "none" }}
                color={"#000"}
                w={"50%"}
              >
                <a>Buy now</a>
              </Button>
            </Link>
          </Center>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Meals;
