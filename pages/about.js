import React from "react";
import {
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Melissa from "../assets/about/melissa_about.png";
import Dave from "../assets/about/dave_about.jpg";

const About = () => {
  return (
    <>
      <Head>
        <title>Sportlix || About</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"} color={"#fff"}>
        <Container
          maxW="container.xl"
          p={{ base: 10, md: 20 }}
          pb={20}
          minH={"70vh"}
        >
          <Heading size={"lg"}>About Us</Heading>
        </Container>
      </Box>
    </>
  );
};

export default About;
