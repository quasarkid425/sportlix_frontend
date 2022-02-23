import React from "react";
import { Container, Heading, Text, VStack, Box } from "@chakra-ui/react";
import Link from "next/link";

const Error = () => {
  return (
    <Box bg={"#000"} color={"#fff"}>
      <Container maxW="container.xl" p={5} py={20} minH={"70vh"}>
        <VStack>
          <Heading size={"lg"}>Ooops! This page was not found</Heading>
          <Text>
            Please click on this link to return to the homepage: <br />
            <Box textAlign={"center"}>
              <Link href={process.env.NEXT_PUBLIC_CLIENT_URL}>
                <a className="link-hover">Home</a>
              </Link>
            </Box>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Error;
