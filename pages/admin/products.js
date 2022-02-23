import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { productActions } from "../../store/productsSlice";
import {
  Container,
  Button,
  Heading,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const totalProducts = useSelector((state) => state.products.totalProducts);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnProdLoading, setBtnProdLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalNumProducts, setTotalNumProducts] = useState("");
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const {
    isOpen: isProductOpen,
    onOpen: onProductOpen,
    onClose: onProductClose,
  } = useDisclosure();
  const {
    isOpen: isCatetoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
  } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const toast = useToast();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("620fee2d206645ef8183e0b1");
  const [type, setType] = useState("Backpack");
  const [qty, setQty] = useState("20");
  const [inStock, setInStock] = useState(true);
  const [bestSeller, setBestSeller] = useState(false);
  const [featured, setFeatured] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryFile, setCategoryFile] = useState(null);

  const [productCategoryInfo, setProductCategoryInfo] = useState([]);

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
        `${process.env.NEXT_PUBLIC_API}/products/totalProducts?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(({ data }) => {
        dispatch(productActions.setTotalProducts(data.products));
        setNumberOfPages(data.totalPages);
        setTotalNumProducts(data.totalProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  }, [pageNumber, dispatch]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/products/getInfo`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => {
        setProductCategoryInfo(data.categoryTypes);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  const markStatusHandler = (id, status) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API}/products/status/${id}`, {
        status: status,
      })
      .then(({ data }) => {
        dispatch(productActions.updateTotalProducts(data));
      })
      .catch((err) => {});
  };

  const createProductHandler = () => {
    setBtnProdLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("qty", qty);
    formData.append("inStock", inStock);
    formData.append("bestseller", bestSeller);
    formData.append("featured", featured);
    formData.append("image", selectedFile);
    formData.append("desc", desc);

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/products`, formData, {
        headers: {
          "content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => {
        setBtnProdLoading(false);
        onProductClose();
        toast({
          description: "Product added successfully",
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setName("");
        setPrice("");
        setDescription("");
        setSelectedFile(null);
        setCategory("");
        setType("");
        setQty("1");
        setInStock(true);
        setBestSeller(false);
        setFeatured(true);

        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createCategoryHandler = () => {
    setBtnLoading(true);
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryFile);

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/category`, formData, {
        headers: {
          "content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => {
        setBtnLoading(false);
        onCategoryClose();
        setCategoryName("");
        setCategoryFile(null);
        toast({
          description: "Category created successfully",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fileSelectedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const fileCategoryHandler = (e) => {
    setCategoryFile(e.target.files[0]);
  };

  return (
    <>
      <Head>
        <title>Sportlix || Admin Products</title>
        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      {loading ? (
        <p>Loading..</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Box bg={"#000"}>
          <Container maxW="container.xl" p={5} py={20} minH={"70vh"}>
            <Flex pb={8} justify={"space-between"}>
              <Box>
                <Heading size={"md"} color={"#fff"}>
                  Total products: {totalNumProducts}
                </Heading>
              </Box>

              <Flex gap={"1rem"}>
                <Button
                  bg={"green.200"}
                  _hover={{
                    bg: "green.100",
                  }}
                  onClick={onProductOpen}
                >
                  Add New Product
                </Button>
                <Button
                  bg={"blue.200"}
                  _hover={{
                    bg: "blue.100",
                  }}
                  onClick={onCategoryOpen}
                >
                  Create Category
                </Button>
              </Flex>
            </Flex>

            <Modal
              isOpen={isProductOpen}
              onClose={onProductClose}
              scrollBehavior={scrollBehavior}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                  <VStack>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productName">Name</FormLabel>
                      <Input
                        id="productName"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productDesc">Description</FormLabel>
                      <Input
                        id="productDesc"
                        type="text"
                        value={desc}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productPrice">Price</FormLabel>
                      <Input
                        id="productPrice"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productStock">In Stock</FormLabel>
                      <Select
                        id="productStock"
                        onChange={(e) => setInStock(e.target.value)}
                      >
                        <option value={true}>true</option>
                        <option value={false}>false</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productQty">Quantity</FormLabel>
                      <Select
                        id="productQty"
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(20).keys()].map((x) => (
                          <option value={20 - x} key={20 - x}>
                            {20 - x}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productType">Type</FormLabel>
                      <Select
                        id="productType"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value={"Backpack"}>Backpack</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productFeatured">Featured</FormLabel>
                      <Select
                        id="productFeatured"
                        onChange={(e) => setFeatured(e.target.value)}
                      >
                        <option value={false}>false</option>
                        <option value={true}>true</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productBestseller">
                        Bestseller
                      </FormLabel>
                      <Select
                        id="productBestseller"
                        onChange={(e) => setBestSeller(e.target.value)}
                      >
                        <option value={false}>false</option>
                        <option value={true}>true</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productImage">Image</FormLabel>
                      <Input
                        id="productImage"
                        type="file"
                        onChange={fileSelectedHandler}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel htmlFor="productCategory">Category</FormLabel>
                      <Select
                        id="productCategory"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value={"620fee2d206645ef8183e0b1"}>
                          Backpacks
                        </option>
                      </Select>
                    </FormControl>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onProductClose}>
                    Close
                  </Button>
                  <Button
                    bg={"green.200"}
                    _hover={{
                      bg: "green.100",
                    }}
                    onClick={createProductHandler}
                    type="Submit"
                    isLoading={btnProdLoading}
                    loadingText="Adding"
                  >
                    Add Product
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal isOpen={isCatetoryOpen} onClose={onCategoryClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack>
                    <FormControl isRequired>
                      <FormLabel htmlFor="categoryName">Name</FormLabel>
                      <Input
                        id="categoryName"
                        type="text"
                        value={categoryName}
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="categoryImage">Image</FormLabel>
                      <Input
                        id="categoryImage"
                        type="file"
                        onChange={fileCategoryHandler}
                      />
                    </FormControl>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onCategoryClose}>
                    Close
                  </Button>
                  <Button
                    bg={"green.200"}
                    _hover={{
                      bg: "green.100",
                    }}
                    onClick={createCategoryHandler}
                    type="Submit"
                    isLoading={btnLoading}
                    loadingText="Adding"
                  >
                    Add Category
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <table className="table" style={{ color: "#fff" }}>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>TYPE</th>
                  <th>INSTOCK</th>
                  <th>BESTSELLER</th>
                  <th>FEATURED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {totalProducts.map((product) => (
                  <tr
                    key={product._id}
                    style={{ background: product.inStock ? "" : "#ffc9c9" }}
                  >
                    <td data-label="IMAGE">
                      <img
                        src={product.image}
                        alt={product.name}
                        width="100%"
                        className="small"
                      ></img>
                    </td>
                    <td data-label="ID">{product._id}</td>
                    <td>
                      <Link href={`/shop/product/${product.slug}`}>
                        <a className="link-hover">{product.name}</a>
                      </Link>
                    </td>
                    <td data-label="PRICE">{product.price}</td>
                    <td data-label="CATEGORY">{product.category}</td>
                    <td data-label="TYPE">{product.type}</td>
                    <td data-label="INSTOCK">
                      {product.inStock ? "Available" : "Unavailable"}
                    </td>
                    <td data-label="BESTSELLER">
                      {product.bestseller ? "Yes" : "No"}
                    </td>
                    <td data-label="FEATURED">
                      {product.featured ? "Yes" : "No"}
                    </td>

                    <td data-label="ACTIONS">
                      <div style={{ display: "flex" }}>
                        <Button
                          onClick={() =>
                            markStatusHandler(product._id, product.inStock)
                          }
                          bg={product.inStock ? "red.300" : "green.300"}
                          _hover={{
                            bg: product.inStock ? "red.200" : "green.200",
                          }}
                          color={"#000"}
                        >
                          {!product.inStock
                            ? "Mark in Stock"
                            : "Mark unavailable"}
                        </Button>
                      </div>
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

export default AdminProductList;
