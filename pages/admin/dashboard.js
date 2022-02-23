import React, { useState, useEffect } from "react";
import MessageBox from "../../components/Helpers/MessageBox";
import Chart from "react-google-charts";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Container, Heading, Box } from "@chakra-ui/react";
import { FaUser, FaShoppingCart, FaRegMoneyBillAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [summary, setSummary] = useState({});
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/");
  }
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/orders/summary`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        // setError(err.response.data);
      });
  }, [user.token]);

  return (
    <>
      <Head>
        <title>Sportlix || Admin Dashboard</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Box bg={"#000"}>
        <Container maxW="container.xl" p={5} py={20} minH={"70vh"}>
          <div className="row">
            <Heading size={"md"} color={"#fff"}>
              Dashboard
            </Heading>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <ul className="row summary" style={{ color: "#fff" }}>
                <li>
                  <div className="summary-title color1">
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <div>
                        <FaUser color="#000" />
                      </div>
                      <div style={{ color: "#000" }}> Users</div>
                    </span>
                  </div>
                  <div className="summary-body">
                    {summary.users[0].numUsers}
                  </div>
                </li>
                <li>
                  <div className="summary-title color2">
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <div>
                        <FaShoppingCart color="#000" />
                      </div>
                      <div style={{ color: "#000" }}>Orders</div>
                    </span>
                  </div>
                  <div className="summary-body">
                    {summary.orders[0] ? summary.orders[0].numOrders : 0}
                  </div>
                </li>
                <li>
                  <div className="summary-title color3">
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <div>
                        <FaRegMoneyBillAlt color="#000" />
                      </div>
                      <div style={{ color: "#000" }}>Sales</div>
                    </span>
                  </div>
                  <div className="summary-body">
                    $
                    {summary.orders[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                  </div>
                </li>
              </ul>
              <div>
                <div>
                  <Heading size={"md"} color={"#fff"}>
                    Sales
                  </Heading>
                  {summary.dailyOrders.length === 0 ? (
                    <Box color={"#fff"}>No sales...</Box>
                  ) : (
                    <Chart
                      width="100%"
                      height="400px"
                      chartType="AreaChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ["Date", "Sales"],
                        ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                      ]}
                    ></Chart>
                  )}
                </div>
              </div>
              <div>
                <Heading size={"md"} color={"#fff"}>
                  Categories
                </Heading>
                {summary.productCategories.length === 0 ? (
                  <MessageBox>No Category</MessageBox>
                ) : (
                  <Chart
                    width="100%"
                    height="400px"
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Category", "Products"],
                      ...summary.productCategories.map((x) => [x._id, x.count]),
                    ]}
                  />
                )}
              </div>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default AdminDashboard;
