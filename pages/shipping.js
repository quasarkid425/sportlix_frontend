import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
  Grid,
  GridItem,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { shippingActions } from "../store/shippingSlice";

const Shipping = () => {
  const shippingDetails = useSelector(
    (state) => state.shipping.shippingDetails
  );
  const cart = useSelector((state) => state.cart.cart);
  const [firstName, setFirstName] = useState(shippingDetails?.firstName || "");
  const [lastName, setLastName] = useState(shippingDetails?.lastName || "");
  const [email, setEmail] = useState(shippingDetails?.email || "");
  const [address, setAddress] = useState(shippingDetails?.address || "");
  const [city, setCity] = useState(shippingDetails?.city || "");
  const [state, setState] = useState(shippingDetails?.state || "");
  const [postalCode, setPostalCode] = useState(
    shippingDetails?.postalCode || ""
  );
  const [deliveryInstructions, setDeliveryInstructions] = useState(
    shippingDetails?.deliveryInstructions || ""
  );

  const [country, setCountry] = useState(shippingDetails?.country || "");

  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/shop");
    }
  }, []);

  const onShippingHandler = (e) => {
    e.preventDefault();

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailResult = emailRegex.test(email);
    if (!emailResult) {
      setError(true);
      return;
    } else {
      setError(false);
      const shippingDetails = {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        postalCode,
        country,
        deliveryInstructions,
      };

      dispatch(shippingActions.addShipping(shippingDetails));
      router.push("/order");
    }
  };

  return (
    <>
      <Head>
        <title>Sportlix || Shipping</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"} color={"#fff"}>
        <Container maxW="container.lg" p={5} pb={20}>
          <CheckoutSteps step1 />
          <Heading size="md" align="center" fontWeight="semibold" mt={2} mb={2}>
            Shipping Details
          </Heading>

          <form
            onSubmit={onShippingHandler}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <Stack w={"75%"} align={"center"} justify={"center"}>
              <Box rounded={"lg"}>
                <Stack spacing={4}>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={"1rem"}
                  >
                    <GridItem>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl id="lastName" isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <FormControl id="emailLabel" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="emailLabel"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    {error && (
                      <Text color="red.500" mt={1}>
                        Please a submit valid email
                      </Text>
                    )}
                  </FormControl>
                  <FormControl id="address" isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </FormControl>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap={"1rem"}
                  >
                    <GridItem colSpan={2}>
                      <FormControl id="city" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                          type="city"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl id="state" isRequired>
                        <FormLabel>State</FormLabel>
                        <Select
                          name="state"
                          id="state"
                          onChange={(e) => setState(e.target.value)}
                        >
                          {shippingDetails?.state ? (
                            shippingDetails.state
                          ) : (
                            <option
                              value=""
                              selected="selected"
                              style={{ background: "#000" }}
                            >
                              Select a State
                            </option>
                          )}

                          <option value="AL" style={{ background: "#000" }}>
                            Alabama
                          </option>
                          <option value="AK" style={{ background: "#000" }}>
                            Alaska
                          </option>
                          <option value="AZ" style={{ background: "#000" }}>
                            Arizona
                          </option>
                          <option value="AR" style={{ background: "#000" }}>
                            Arkansas
                          </option>
                          <option value="CA" style={{ background: "#000" }}>
                            California
                          </option>
                          <option value="CO" style={{ background: "#000" }}>
                            Colorado
                          </option>
                          <option value="CT" style={{ background: "#000" }}>
                            Connecticut
                          </option>
                          <option value="DE" style={{ background: "#000" }}>
                            Delaware
                          </option>
                          <option value="DC" style={{ background: "#000" }}>
                            District Of Columbia
                          </option>
                          <option value="FL" style={{ background: "#000" }}>
                            Florida
                          </option>
                          <option value="GA" style={{ background: "#000" }}>
                            Georgia
                          </option>
                          <option value="HI" style={{ background: "#000" }}>
                            Hawaii
                          </option>
                          <option value="ID" style={{ background: "#000" }}>
                            Idaho
                          </option>
                          <option value="IL" style={{ background: "#000" }}>
                            Illinois
                          </option>
                          <option value="IN" style={{ background: "#000" }}>
                            Indiana
                          </option>
                          <option value="IA" style={{ background: "#000" }}>
                            Iowa
                          </option>
                          <option value="KS" style={{ background: "#000" }}>
                            Kansas
                          </option>
                          <option value="KY" style={{ background: "#000" }}>
                            Kentucky
                          </option>
                          <option value="LA" style={{ background: "#000" }}>
                            Louisiana
                          </option>
                          <option value="ME" style={{ background: "#000" }}>
                            Maine
                          </option>
                          <option value="MD" style={{ background: "#000" }}>
                            Maryland
                          </option>
                          <option value="MA" style={{ background: "#000" }}>
                            Massachusetts
                          </option>
                          <option value="MI" style={{ background: "#000" }}>
                            Michigan
                          </option>
                          <option value="MN" style={{ background: "#000" }}>
                            Minnesota
                          </option>
                          <option value="MS" style={{ background: "#000" }}>
                            Mississippi
                          </option>
                          <option value="MO" style={{ background: "#000" }}>
                            Missouri
                          </option>
                          <option value="MT" style={{ background: "#000" }}>
                            Montana
                          </option>
                          <option value="NE" style={{ background: "#000" }}>
                            Nebraska
                          </option>
                          <option value="NV" style={{ background: "#000" }}>
                            Nevada
                          </option>
                          <option value="NH" style={{ background: "#000" }}>
                            New Hampshire
                          </option>
                          <option value="NJ" style={{ background: "#000" }}>
                            New Jersey
                          </option>
                          <option value="NM" style={{ background: "#000" }}>
                            New Mexico
                          </option>
                          <option value="NY" style={{ background: "#000" }}>
                            New York
                          </option>
                          <option value="NC" style={{ background: "#000" }}>
                            North Carolina
                          </option>
                          <option value="ND" style={{ background: "#000" }}>
                            North Dakota
                          </option>
                          <option value="OH" style={{ background: "#000" }}>
                            Ohio
                          </option>
                          <option value="OK" style={{ background: "#000" }}>
                            Oklahoma
                          </option>
                          <option value="OR" style={{ background: "#000" }}>
                            Oregon
                          </option>
                          <option value="PA" style={{ background: "#000" }}>
                            Pennsylvania
                          </option>
                          <option value="RI" style={{ background: "#000" }}>
                            Rhode Island
                          </option>
                          <option value="SC" style={{ background: "#000" }}>
                            South Carolina
                          </option>
                          <option value="SD" style={{ background: "#000" }}>
                            South Dakota
                          </option>
                          <option value="TN" style={{ background: "#000" }}>
                            Tennessee
                          </option>
                          <option value="TX" style={{ background: "#000" }}>
                            Texas
                          </option>
                          <option value="UT" style={{ background: "#000" }}>
                            Utah
                          </option>
                          <option value="VT" style={{ background: "#000" }}>
                            Vermont
                          </option>
                          <option value="VA" style={{ background: "#000" }}>
                            Virginia
                          </option>
                          <option value="WA" style={{ background: "#000" }}>
                            Washington
                          </option>
                          <option value="WV" style={{ background: "#000" }}>
                            West Virginia
                          </option>
                          <option value="WI" style={{ background: "#000" }}>
                            Wisconsin
                          </option>
                          <option value="WY" style={{ background: "#000" }}>
                            Wyoming
                          </option>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap={"1rem"}
                  >
                    <GridItem colSpan={2}>
                      <FormControl id="country" isRequired>
                        <FormLabel>Country</FormLabel>
                        <Select
                          name="country"
                          id="country"
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          {shippingDetails?.country ? (
                            shippingDetails.country
                          ) : (
                            <option value="" selected="selected">
                              Select a Country
                            </option>
                          )}

                          <option value="USA">United States</option>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl id="postal" isRequired>
                        <FormLabel>Postal Code</FormLabel>
                        <Input
                          type="postal"
                          onChange={(e) => setPostalCode(e.target.value)}
                          value={postalCode}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>
              </Box>
            </Stack>

            <Stack spacing={10} mt={"2rem"} w={"70%"}>
              <Button
                loadingText="Submitting"
                size="lg"
                type="submit"
                width={"100%"}
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
                Continue
              </Button>
            </Stack>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Shipping;
