import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

export const MotionBox = motion(Box);

export const BoxVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};
export const FromRightVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};
export const FromLeftVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};
