import { Flex, Box, Image, Badge, useColorModeValue } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../store/productsSlice";

const BabySmoothieCard = ({ data }) => {
  const dispatch = useDispatch();
  const babySmoothies = useSelector((state) => state.products.babySmoothieArr);
  const [smoothie1, smoothie2] = babySmoothies;
  return (
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
      cursor={"pointer"}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        boxShadow={
          data.name === smoothie1?.name || data.name === smoothie2?.name
            ? "outline"
            : "2xl"
        }
        position="relative"
        onClick={() => {
          dispatch(productActions.addBabySmoothieArr(data));
        }}
      >
        <Image
          src={data.image}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              New
            </Badge>
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="lg" fontWeight="semibold" as="h4" lineHeight="tight">
              {data.name}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default BabySmoothieCard;
