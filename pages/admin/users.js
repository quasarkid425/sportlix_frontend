import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Head from "next/head";
import MessageBox from "../../components/Helpers/MessageBox";
import { useRouter } from "next/router";
import { Container, Button, Heading, Box } from "@chakra-ui/react";
import { userActions } from "../../store/userSlice";

const UserListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const user = useSelector((state) => state.user);

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
        `${process.env.NEXT_PUBLIC_API}/users/usersList/?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${user.user.token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(userActions.totalUsers(data.users));

        setNumberOfPages(data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [pageNumber, dispatch, user.user.token]);

  return (
    <>
      <Head>
        <title>Sportlix || Admin Users</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"}>
        <Container maxW="container.xl" p={5} py={20} minH={"70vh"}>
          <div>
            <Heading
              style={{ marginBottom: "2rem" }}
              size={"md"}
              color={"#fff"}
            >
              Total users: {user.totalUsers.length - 1}
            </Heading>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table" style={{ color: "#fff" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                </tr>
              </thead>
              <tbody>
                {user.totalUsers.map(
                  (user) =>
                    !user.isAdmin && (
                      <tr key={user._id}>
                        <td data-label="ID">{user._id}</td>

                        <td data-label="NAME" style={{ padding: "1.3rem" }}>
                          {user.firstName} {user.lastName}
                        </td>
                        <td data-label="EMAIL">{user.email}</td>
                      </tr>
                    )
                )}
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

export default UserListScreen;
