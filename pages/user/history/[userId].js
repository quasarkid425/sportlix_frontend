import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import axios from "axios";
import MessageBox from "../../../components/Helpers/MessageBox";
import { useRouter } from "next/router";
import { orderActions } from "../../../store/orderSlice";
import { Container, Button, Heading, Box } from "@chakra-ui/react";

const UserOrderHistory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user.isLoggedIn) {
    router.push("/login");
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
        `${process.env.NEXT_PUBLIC_API}/orders/mine/${user.user._id}?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(orderActions.addOrders(data.orders));
        setNumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [pageNumber, dispatch, user.user._id, user.user.token]);

  return (
    <>
      <Head>
        <title>Sportlix || Order History</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"}>
        <Container maxW="container.xl" p={5} py={20} minH={"70vh"}>
          <Heading size={"md"} mb={"1rem"} color={"#fff"}>
            Order History for {user.user.firstName}
          </Heading>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table" style={{ color: "#fff" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ORDER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td data-label="ID">{order._id}</td>
                    <td data-label="ORDER">
                      {order.orderItems.map((order) => {
                        return <p key={order._id}>{order.name}</p>;
                      })}
                    </td>
                    <td data-label="DATE" style={{ padding: "1.3rem" }}>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td data-label="TOTAL">${order.totalPrice.toFixed(2)}</td>
                    <td data-label="PAID">
                      {order.isPaid ? order.createdAt.substring(0, 10) : "No"}
                    </td>
                    <td data-label="DELIVERED">
                      {order.isDelivered ? "Yes" : "No"}
                    </td>
                    <td data-label="ACTIONS">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
                          Details
                        </Button>
                        <Button
                          onClick={() => {
                            router.push(`/order/repeat/${order._id}`);
                          }}
                          bg="green.200"
                          _hover={{
                            bg: "green.100",
                          }}
                          color={"#000"}
                        >
                          Buy Again
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
    </>
  );
};

export default UserOrderHistory;
