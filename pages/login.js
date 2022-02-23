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
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { login } from "../actions/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { cartActions } from "../store/cartSlice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const loginHandler = (e) => {
    e.preventDefault();
    const loginDetails = {
      email,
      password,
    };

    login(loginDetails).then((data) => {
      if (data.error) {
        setError(data.error);
        setIsSubmitting(false);
      } else {
        dispatch(userActions.userDetails(data.user));

        dispatch(cartActions.setCart(data.user.cart));

        toast({
          title: `We've missed you, ${data.user.firstName}!`,
          description: `Welcome back`,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/");
        setIsSubmitting(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Sportlix || Login</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("#000", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w={"30rem"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"} mb={"3rem"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Log In
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool features ✌️
              </Text>
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
                      setEmail(false);
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setError(false);
                        setPassword(e.target.value);
                      }}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={(e) =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={4}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                    mt={4}
                  >
                    <Box></Box>
                    <Link href={"forgot"}>
                      <Text as="a" color={"blue.400"} cursor={"pointer"}>
                        Forgot password?
                      </Text>
                    </Link>
                  </Stack>
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
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Logging in.."
                  >
                    Log In
                  </Button>
                </Stack>
              </form>

              <Stack pt={4}>
                <Text align={"center"}>
                  Need an account?{" "}
                  <Link href={"/signup"}>
                    <Text as="a" color={"blue.400"} cursor={"pointer"}>
                      Sign Up
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

export default Login;
