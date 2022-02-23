import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import Logo from "../../assets/sportlix_backpack/logo/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { userActions } from "../../store/userSlice";
import { cartActions } from "../../store/cartSlice";
import { shippingActions } from "../../store/shippingSlice";
import { orderActions } from "../../store/orderSlice";

export default function WithSubnavigation() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");
  const cart = useSelector((state: RootStateOrAny) => state.cart.cart);
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.user.isLoggedIn
  );
  const toast = useToast();
  const user = useSelector((state: RootStateOrAny) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const signOutHandler = () => {
    router.push("/");
    dispatch(userActions.logout());
    dispatch(cartActions.emptyCart({}));
    dispatch(shippingActions.clearShipping());
    dispatch(orderActions.removeOrder({}));
    toast({
      title: "Logged out successfully.",
      description: `See you soon, ${user.firstName}!`,
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    axios
      .put(`${process.env.NEXT_PUBLIC_API}/users/saveCart`, {
        cart,
        user: user._id,
      })
      .then(({ data }) => {})
      .catch((err) => {});
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "gray.800")}
        color={useColorModeValue("#a1a5b0", "white")}
        minH={"60px"}
        py={{ base: 4 }}
        px={{ base: 6 }}
        // borderBottom={1}
        // borderStyle={"solid"}
        // borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", lg: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Link href="/" cursor={"pointer"} _focus={{ boxShadow: "none" }}>
              <Image
                src={Logo}
                alt={"Sportlix Logo"}
                height={"65px"}
                width={"200px"}
              />
            </Link>
          </Text>

          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          align={"center"}
        >
          <Link href="/cart" _focus={{ boxShadow: "none" }}>
            <Box position={"relative"} zIndex={"100"}>
              {cart.length > 0 && (
                <Box
                  position={"absolute"}
                  top={"-.9rem"}
                  right={".1rem"}
                  zIndex={"-1"}
                >
                  <Box
                    bg={"red.400"}
                    py={"-1rem"}
                    px={".5rem"}
                    borderRadius={50}
                    color={"#000"}
                  >
                    {cart.length}
                  </Box>
                </Box>
              )}

              <FiShoppingCart
                size={cart.length > 0 ? 35 : 25}
                style={{ marginLeft: "1.5rem" }}
              />
            </Box>
          </Link>

          {user.isAdmin ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant={"ghost"}
                _hover={{
                  color: "green.200",
                  background: "none",
                }}
                _active={{
                  background: "none",
                }}
                _focus={{ boxShadow: "none" }}
              >
                Admin
              </MenuButton>
              <MenuList>
                <Link
                  href={"/admin/dashboard"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <Link
                  href={"/admin/products"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Products</MenuItem>
                </Link>
                <Link
                  href={"/admin/orders"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Orders</MenuItem>
                </Link>
                <Link
                  href={"/admin/users"}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Users</MenuItem>
                </Link>
                <MenuItem
                  onClick={signOutHandler}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant={"ghost"}
                _hover={{
                  color: "green.200",
                  background: "none",
                }}
                _active={{
                  background: "none",
                }}
                _focus={{ boxShadow: "none" }}
              >
                {user.firstName}
              </MenuButton>
              <MenuList>
                <Link
                  href={`/user/history/${user._id}`}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>Order History</MenuItem>
                </Link>
                <Link
                  href={`/user/profile/${user._id}`}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  <MenuItem>User Profile</MenuItem>
                </Link>

                <MenuItem
                  onClick={signOutHandler}
                  _hover={{
                    color: "green.200",
                  }}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={500}
                // color={"gray.600"}
                color={router.pathname === "/login" ? "green.200" : "#a1a5b0"}
                variant={"link"}
                href={"/login"}
                _focus={{ boxShadow: "none" }}
                _hover={{
                  color: "#51cf66",
                }}
              >
                Login
              </Button>
              <Link
                href="/signup"
                _hover={{
                  textDecoration: "none",
                }}
              >
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"#000"}
                  bgGradient="linear(to-r, #59f9b7, #66feea)"
                  _hover={{
                    bgGradient: "linear(to-r, #59f9b7, #66feea)",
                  }}
                  _focus={{ boxShadow: "none" }}
                  _active={{
                    bgGradient: "linear(to-r, #59f9b7, #66feea)",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("#a1a5b0", "gray.500");
  const linkHoverColor = useColorModeValue("#51cf66", "white");
  const popoverContentBgColor = useColorModeValue("black", "gray.800");
  const router = useRouter();
  const path = router.asPath;

  return (
    <Stack direction={"row"} spacing={2}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                // color={linkColor}
                color={
                  router.asPath.includes(navItem.href) ? "green.200" : linkColor
                }
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                _focus={{ boxShadow: "none" }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      // _hover={{ bg: useColorModeValue("green.300", "gray.900") }}
      _hover={{ textDecoration: "none" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "green.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _focus={{ boxShadow: "none" }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Baseball / Softball",
    children: [
      {
        label: "Backpacks",
        subLabel: "Comfortable, durable, and stylish equipment backpacks",
        href: "/shop/product/baseball-softball-backpack",
      },
    ],
  },

  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
