import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Flex,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Head from "next/head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/userSlice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export async function getServerSideProps(context) {
  const userId = context.query.userId;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/users/info/${userId}`
  );

  return {
    props: {
      user: data,
    },
  };
}

const Profile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const loggedInUser = useSelector((state) => state.user.user);

  const toast = useToast();
  const dispatch = useDispatch();

  const updateFirstNameHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API}/users/update/${user._id}`,
        {
          firstName,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(userActions.userDetails(data.user));
        toast({
          description: `First name updated successfully!`,
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateLastNameHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API}/users/update/${user._id}`,
        {
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(userActions.userDetails(data.user));
        toast({
          description: `Last name updated successfully!`,
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateEmailHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API}/users/update/${user._id}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(userActions.userDetails(data.user));
        toast({
          description: `Email updated successfully!`,
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setEmailError(err.response.data.error);
      });
  };
  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API}/users/update/${user._id}`,
          {
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${loggedInUser.token}`,
            },
          }
        )
        .then(({ data }) => {
          dispatch(userActions.userDetails(data.user));
          toast({
            description: `Password updated successfully!`,
            position: "top",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Sportlix || User Profile</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"} color={"#fff"}>
        <Container maxW="container.xl" px={"2rem"} py={"7rem"}>
          <Stack margin={"0 auto"} maxW={{ base: "95%", md: "50%" }}>
            <Heading size="md" textAlign={"center"} mb={5}>
              Update User Credentials
            </Heading>

            <form onSubmit={updateFirstNameHandler}>
              <FormControl isRequired>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Flex gap={"1rem"}>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Button
                    bg="green.200"
                    _hover={{
                      bg: "green.100",
                    }}
                    type="submit"
                    color={"#000"}
                  >
                    Update
                  </Button>
                </Flex>
              </FormControl>
            </form>

            <form onSubmit={updateLastNameHandler}>
              <FormControl isRequired>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Flex gap={"1rem"}>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Button
                    bg="green.200"
                    _hover={{
                      bg: "green.100",
                    }}
                    type="submit"
                    color={"#000"}
                  >
                    Update
                  </Button>
                </Flex>
              </FormControl>
            </form>

            <form onSubmit={updateEmailHandler}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Flex gap={"1rem"}>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }}
                  />
                  <Button
                    bg="green.200"
                    _hover={{
                      bg: "green.100",
                    }}
                    type="submit"
                    color={"#000"}
                  >
                    Update
                  </Button>
                </Flex>
              </FormControl>
            </form>
            {emailError && <Text color={"red.400"}>{emailError}</Text>}

            <form onSubmit={updatePasswordHandler}>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Flex gap={"1rem"}>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
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
                  <Button
                    bg="green.200"
                    _hover={{
                      bg: "green.100",
                    }}
                    type="submit"
                    color={"#000"}
                  >
                    Update
                  </Button>
                </Flex>
              </FormControl>
            </form>
            {passwordError && <Text color={"red.400"}>{passwordError}</Text>}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
