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
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
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

  const userId = router.query.userId;

  const resetHandler = (e) => {
    e.preventDefault();

    if (password.length < 6 || confirmPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/users/reset`, {
          userId,
          password,
        })
        .then(({ data }) => {
          if (data.error) {
            setError(data.error);
            setIsSubmitting(false);
          } else {
            toast({
              title: `Password updated successfully. Please login`,
              position: "top",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            router.push("/login");
            setIsSubmitting(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Sportlix || Reset Password</title>
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
                Reset Password
              </Heading>
              {error && (
                <Text color={"red.400"} p={0}>
                  {error}
                </Text>
              )}
            </Stack>

            <Stack spacing={4}>
              <form onSubmit={resetHandler}>
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

                <FormControl id="confirmPassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setError(false);
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={(e) =>
                          setshowConfirmPassword(
                            (showConfirmPassword) => !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={4}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                    mt={2}
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
                    Log In
                  </Button>
                </Stack>
              </form>

              <Stack pt={4}>
                <Text align={"center"}></Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default ResetPassword;
