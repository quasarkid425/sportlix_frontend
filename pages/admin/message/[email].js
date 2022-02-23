import React, { useRef } from "react";
import axios from "axios";
import {
  Container,
  Box,
  VStack,
  Input,
  Text,
  Textarea,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const email = context.params.email;

  return {
    props: {
      email,
    },
  };
}

const AdminMessge = ({ email }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const router = useRouter();
  if (!isLoggedIn) {
    router.push("/");
  }

  const messageRef = useRef("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const user = useSelector((state) => state.user.user);
  const messageCustomerHandler = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API}/orders/sendCustomerMessage`,
        { email, message: messageRef.current.value },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(({ data }) => {
        toast({
          description: "Message sent successfully",
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    messageRef.current.value = "";
  };

  const closeHandler = (close) => {
    close();
  };

  return (
    <Container maxW="container.lg" py={20} px={10} position={"relative"}>
      <Box
        position={"absolute"}
        top={1}
        left={{ base: 6, md: "-4rem" }}
        pt={"2rem"}
      >
        <Link href="/admin/orders">
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            px={0}
            fontWeight={"normal"}
            _hover={{
              bg: "",
              color: "#51cf66",
              transition: ".3s",
            }}
            _focus={{
              outline: "none",
            }}
            _active={{
              background: "",
            }}
          >
            Back to orders
          </Button>
        </Link>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Does this message look ok?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems={"start"}>
              <Flex gap={".5rem"}>
                <Text>To:</Text>
                <Text>{email}</Text>
              </Flex>
              <Flex gap={".5rem"}>
                <Text>Messasge:</Text>
                <Text>{messageRef.current.value}</Text>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                messageCustomerHandler();
                closeHandler(onClose);
              }}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack py={"2rem"}>
        <Flex width={"100%"} alignItems={"center"} gap={"1rem"}>
          <Text>To:</Text>
          <Input value={email} />
        </Flex>
        <Flex width={"100%"} alignItems={"center"} gap={"1rem"}>
          <Textarea
            placeholder="Write message..."
            height={"300px"}
            ref={messageRef}
          />
        </Flex>
        <Button
          width={"100%"}
          bg={"green.200"}
          _hover={{ bg: "green.100" }}
          onClick={onOpen}
        >
          Send Message
        </Button>
      </VStack>
    </Container>
  );
};

export default AdminMessge;
