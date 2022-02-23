import React, { useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Text,
  Input,
  Textarea,
  Stack,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { sendMessage } from "../actions/message";

const Contact = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandler = async () => {
    const validEmail = email.includes("@");

    if (!validEmail) {
      toast({
        description: "Email invalid",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      return;
    } else {
      const submittedMessage = {
        name,
        email,
        message,
      };
      await sendMessage(submittedMessage);
      setName("");
      setEmail("");
      setMessage("");
      toast({
        description: "Message sent successfully",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Sportlix || Contact</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"} color={"#fff"}>
        <Container
          maxW="container.xl"
          p={20}
          position={"relative"}
          minH={"70vh"}
          w={{ base: "100%", md: "75%" }}
        >
          <Text
            textAlign={"center"}
            fontSize={{ md: "1.5rem" }}
            fontWeight={"bold"}
          >
            Have a question? Send us a message and we'll get back to you ASAP
          </Text>

          <Stack align={"center"} mt={"2rem"} justify="center" minH={"25vh"}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Textarea
              placeholder="Write message here..."
              w={"100%"}
              h={"30vh"}
              mb={"1rem"}
              focusBorderColor={"green.100"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              bgGradient="linear(to-r, #59f9b7, #66feea)"
              _hover={{
                bgGradient: "linear(to-r, #59f9b7, #66feea)",
              }}
              _active={{
                bgGradient: "linear(to-r, #59f9b7, #66feea)",
              }}
              _focus={{ boxShadow: "none" }}
              color={"#000"}
              w={"100%"}
              onClick={onSubmitHandler}
              disabled={
                name === "" || email === "" || message === "" ? true : false
              }
            >
              Send
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
