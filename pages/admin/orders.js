import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import axios from "axios";
import { Container, Button, Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { orderActions } from "../../store/orderSlice";

const AdminOrderHistory = () => {
  const adminOrders = useSelector((state) => state.orders.adminOrders);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    router.push("/");
  }

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/orders/adminOrders?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(orderActions.setAdminOrders(data.orders));
        setNumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  }, [pageNumber, dispatch, user.token]);

  const deliverOrderHandler = (orderId) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API}/orders/delivered`,
        {
          orderId: orderId,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(({ data }) => {
        dispatch(orderActions.setAdminOrders(data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <Head>
        <title>Sportlix || Admin Orders</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      {loading ? (
        <p>Loading..</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Box bg={"#000"}>
          <Container maxW="container.xl" p={5} py={20} minH={"70vh"}>
            <table className="table" style={{ color: "#fff" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CUSTOMER</th>
                  <th>EMAIL</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.map((order) => (
                  <tr key={order._id}>
                    <td data-label="ID">{order._id}</td>
                    <td data-label="CUSTOMER">
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </td>
                    <td data-label="EMAIL">{order.shippingAddress.email} </td>
                    <td data-label="DATE">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td data-label="TOTAL">${order.totalPrice.toFixed(2)}</td>
                    <td data-label="PAID">{order.isPaid ? "Yes" : "No"}</td>
                    <td data-label="DELIVERED">
                      {order.isDelivered
                        ? order.updatedAt.substring(0, 10)
                        : "No"}
                    </td>

                    <td data-label="ACTIONS">
                      <Flex>
                        <Button
                          onClick={() => deliverOrderHandler(order._id)}
                          variant={order.isDelivered ? "solid" : "outline"}
                          colorScheme="green"
                          _hover={{ bg: "teal.100" }}
                        >
                          {order.isDelivered ? "Shipped" : "Mark Shipped"}
                        </Button>
                        <Button
                          onClick={() =>
                            router.push(`/order/history/${order._id}`)
                          }
                          bg="blue.200"
                          _hover={{
                            bg: "blue.100",
                          }}
                          color={"#000"}
                        >
                          View
                        </Button>
                        <Link
                          href={`/admin/message/${order.shippingAddress.email}`}
                        >
                          <Button
                            bg="red.300"
                            _hover={{
                              bg: "red.200",
                            }}
                            color={"#000"}
                          >
                            Message
                          </Button>
                        </Link>
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
                gap: ".5rem",
              }}
            >
              <Button
                onClick={gotoPrevious}
                colorScheme="teal"
                variant="outline"
                _hover={{ bg: "teal.100" }}
              >
                Previous
              </Button>
              {pages.map((pageIndex) => (
                <Button
                  key={pageIndex}
                  onClick={() => setPageNumber(pageIndex)}
                  colorScheme="teal"
                  variant="outline"
                  bg={pageNumber === pageIndex ? "teal.100" : ""}
                  _hover={{ bg: "teal.100" }}
                >
                  {pageIndex + 1}
                </Button>
              ))}
              <Button
                onClick={gotoNext}
                colorScheme="teal"
                variant="outline"
                _hover={{ bg: "teal.100" }}
              >
                Next
              </Button>
            </div>
          </Container>
        </Box>
      )}
    </>
  );
};

export default AdminOrderHistory;
