import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FiInstagram, FiFacebook } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/sportlix_backpack/logo/logo.png";

const Footer = () => {
  return (
    <>
      <Box borderTop="1px solid" bg={"#000"}>
        <Container maxW="container.lg" p={10}>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 5 }}
            spacingX="40px"
            spacingY="35px"
          >
            <VStack align="center" spacing={4}>
              <Heading size="md">
                <Link href={`/`} passHref>
                  <Box cursor="pointer">
                    <Image
                      src={Logo}
                      alt={"From My Roots Logo"}
                      cursor={"pointer"}
                      height={"75px"}
                      width={"200px"}
                    />
                  </Box>
                </Link>
              </Heading>
              <VStack align="center" color={"#a1a5b0"}>
                <Flex w="full" justify="center" style={{ gap: ".5rem" }}>
                  <Link href="https://www.instagram.com/from.my.roots/">
                    <a target="_blank" className="link-icon">
                      <FiInstagram size={25} />
                    </a>
                  </Link>
                  <Link href="https://www.facebook.com/frommyroots.life/">
                    <a target="_blank" className="link-icon">
                      <FiFacebook size={25} />
                    </a>
                  </Link>
                </Flex>
                <Text align="center">
                  Copyright &copy;{" "}
                  <span className="year">{new Date().getFullYear()}</span> All
                  rights reserved.
                </Text>
              </VStack>
            </VStack>

            <VStack align="center" spacing={4}>
              <Heading size="md" color={"#fff"}>
                Contact Us
              </Heading>
              <VStack align="center" color={"#a1a5b0"}>
                <Link href="mailto:Melissa@frommyroots.life" target="_blank">
                  <a className="link-hover">Melissa@frommyroots.life</a>
                </Link>
              </VStack>
            </VStack>

            <VStack align="center" spacing={4} color={"#a1a5b0"}>
              <Heading size="md" color={"#fff"}>
                Account
              </Heading>
              <VStack align="center">
                <Link href="/signup">
                  <a className="link-hover">Create an account</a>
                </Link>
                <Link href="/login">
                  <a className="link-hover">Login</a>
                </Link>
              </VStack>
            </VStack>

            <VStack align="center" spacing={4} color={"#a1a5b0"}>
              <Heading size="md" color={"#fff"}>
                Company
              </Heading>
              <VStack align="center">
                <Link href="/maintenance">
                  <a className="link-hover">For Business</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Cooking Partners</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Careers</a>
                </Link>
              </VStack>
            </VStack>

            <VStack align="center" spacing={4} color={"#a1a5b0"}>
              <Heading size="md" color={"#fff"}>
                Resources
              </Heading>
              <VStack align="center">
                <Link href="/shop">
                  <a className="link-hover">Shop</a>
                </Link>
                <Link href="/lookup">
                  <a className="link-hover">Gift Card Lookup</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Help Center</a>
                </Link>
                <Link href="/maintenance">
                  <a className="link-hover">Privacy & Terms</a>
                </Link>
              </VStack>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
