import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { forgot } from "../actions/auth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const loginHandler = (e) => {
    e.preventDefault();
    const resetDetails = {
      email,
    };

    forgot(resetDetails).then((data) => {
      if (data.error) {
        setError(data.error);
        setIsSubmitting(false);
      } else {
        toast({
          title: `Reset password link has been sent to your email`,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setEmail("");
        setIsSubmitting(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Sportlix || Forgot Password</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w={"30rem"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"} mb={"3rem"}>
              <Heading fontSize={"xl"} textAlign={"center"}>
                Forgot Password
              </Heading>

              {error && (
                <Text color={"red.400"} p={0}>
                  {error}
                </Text>
              )}
            </Stack>

            <Stack spacing={4}>
              <form onSubmit={loginHandler}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setError(false);
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>

                <Stack spacing={4}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                    mt={4}
                  ></Stack>
                  <Button
                    bg="green.300"
                    _hover={{
                      bg: "green.200",
                    }}
                    color={"#fff"}
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Logging in.."
                  >
                    Reset Password
                  </Button>
                </Stack>
              </form>

              <Stack pt={4}>
                <Text align={"center"}>
                  Have an account?{" "}
                  <Link href={"/login"}>
                    <Text as="a" color={"blue.400"} cursor={"pointer"}>
                      Sign In
                    </Text>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default ForgotPassword;
