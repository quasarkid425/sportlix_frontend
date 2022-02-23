import React, { useEffect, useRef } from "react";
import { Container } from "@chakra-ui/react";
import {
  Flex,
  VStack,
  Stack,
  Heading,
  Text,
  Button,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

import { FiChevronDown } from "react-icons/fi";
import heroImg1 from "../../assets/sportlix_backpack/product_images/backpack_img_1.png";
import heroImg2 from "../../assets/sportlix_backpack/product_images/backpack_img_2.png";
import heroImg3 from "../../assets/sportlix_backpack/product_images/backpack_img_3.png";
import heroImg4 from "../../assets/sportlix_backpack/product_images/backpack_img_4.png";
import heroImg5 from "../../assets/sportlix_backpack/product_images/backpack_img_5.png";

import gsap from "gsap";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

const Hero = ({ effects }) => {
  const heroHeadingRef = useRef();
  const heroDescriptionRef = useRef();
  const eatBtnRef = useRef();
  const learnBtnRef = useRef();
  const heroImgRef = useRef();

  useEffect(() => {
    if (effects === false) {
      return;
    } else {
      gsap
        .timeline({ defaults: { opacity: 0 } })
        .from(heroHeadingRef.current, {
          x: -40,
          duration: 0.5,
        })

        .from(heroDescriptionRef.current, { y: 20 })
        .from(eatBtnRef.current, { x: 20 }, "-=0.1")
        .from(heroImgRef.current, { x: 20, autoAlpha: 0 }, "=-0.3")
        .from(learnBtnRef.current, { y: -20, rotate: 360 }, "-=.3");
    }
  }, [effects]);

  return (
    <Box bg={"#000"}>
      <Container maxW="container.xl" p={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* <Stack>
            <Heading color={"white"}>Hi there</Heading>
          </Stack>
          <Stack>
            <Heading color={"white"}>Hi there</Heading>
          </Stack> */}
          <VStack justify="center">
            <Heading
              mb={3}
              ref={heroHeadingRef}
              color={"#fff"}
              textAlign={{ base: "center", md: "left" }}
            >
              A healthy meal delivered to your door, every single day
            </Heading>
            <Text
              pb={5}
              textAlign={{ base: "center", md: "left" }}
              ref={heroDescriptionRef}
              color={"#a1a5b0"}
            >
              The smart 365-days-per-year food subscription that will make you
              eat healthy again. Tailored to your personal tastes and
              nutritional needs.
            </Text>
            <Flex w="full" gap="1rem" justify={{ base: "center", md: "start" }}>
              <Box ref={eatBtnRef}>
                <Link href="/shop/product/baseball-softball-backpack">
                  <Button
                    bg="green.300"
                    _hover={{
                      bg: "green.200",
                    }}
                    color={"#000"}
                  >
                    Shop now
                  </Button>
                </Link>
              </Box>

              <Box ref={learnBtnRef}>
                <ScrollLink to="how" smooth={true} duration={1000}>
                  <Button
                    rightIcon={<FiChevronDown size={20} />}
                    bgGradient="linear(to-r, #59f9b7, #66feea)"
                    _hover={{
                      bgGradient: "linear(to-r, #59f9b7, #66feea)",
                    }}
                    _active={{
                      bgGradient: "linear(to-r, #59f9b7, #66feea)",
                    }}
                    _focus={{ boxShadow: "none" }}
                    color={"#000"}
                  >
                    Learn more
                  </Button>
                </ScrollLink>
              </Box>
            </Flex>
          </VStack>
          <Box ref={heroImgRef}>
            <video
              autoPlay
              loop
              muted
              style={{
                height: "700px",
                width: "85%",
                objectFit: "cover",
                margin: "0 auto",
              }}
            >
              <source src="/hero_video.mp4" type="video/mp4" />
            </video>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Hero;
