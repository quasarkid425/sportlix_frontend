import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { MotionBox } from "../../animations/animation";
import { BoxVariants } from "../../animations/animation";
import {
  Container,
  Box,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Cta = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const whereRef = useRef();
  const toast = useToast();

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const submitCtaHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const where = whereRef.current.value;

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/cta`, {
        name,
        email,
        where,
      })
      .then(({ data }) => {
        toast({
          description: data,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        nameRef.current.value = "";
        emailRef.current.value = "";
        whereRef.current.value = "";
      })
      .catch((err) => {
        toast({
          description: err.response.data,
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Box bg={"#000"}>
        <Container
          maxW="container.lg"
          px={10}
          pt={"1.5rem"}
          id="cta"
          pb={"8rem"}
        >
          <MotionBox
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={BoxVariants}
          >
            <Box
              style={{ border: "1px", borderRadius: "1.5rem" }}
              padding={"3rem"}
              bg={"green.300"}
            >
              <VStack>
                <Heading size="lg">
                  Get early access to our hitting course
                </Heading>
                <Text>
                  Hitting is the hardest thing to do in all of sports. Through
                  years of research we are confident enough to share what we
                  know about the baseball swing. Sign up now to get early
                  access.
                </Text>
              </VStack>

              <form style={{ paddingTop: "1rem" }} onSubmit={submitCtaHandler}>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacingX="40px"
                  spacingY="15px"
                >
                  <FormControl id="name" isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input
                      type="text"
                      placeholder="John Smith"
                      background={"#fff"}
                      ref={nameRef}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      placeholder="me@example.com"
                      background={"#fff"}
                      ref={emailRef}
                    />
                  </FormControl>
                  <FormControl id="tracking" isRequired>
                    <FormLabel>Where did you hear about us?</FormLabel>
                    <Select
                      placeholder="Please choose one option"
                      background={"#fff"}
                      ref={whereRef}
                    >
                      <option value="Friends and Family">
                        Friends and Family
                      </option>
                      <option value="Youtube video">Youtube video</option>
                      <option value="Podcast">Podcast</option>
                      <option value="Facebook ad">Facebook ad</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>

                  <Box pt={{ base: "3", md: "8" }}>
                    <Button
                      w="full"
                      bg={"green.600"}
                      _hover={{
                        bg: "green.500",
                      }}
                      color={"#fff"}
                      type="submit"
                    >
                      Sign up now
                    </Button>
                  </Box>
                </SimpleGrid>
              </form>
              <div style={{ marginTop: "2rem", fontSize: "1.3rem" }}></div>
            </Box>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
};

export default Cta;
