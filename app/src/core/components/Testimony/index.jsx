import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const Testimony = () => {
  return (
    <Box sx={{ padding: "2em", backgroundColor: "#7d4819" }}>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Initial state
        animate={{ opacity: 1, x: 0 }} // Animation state
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          sx={{ textAlign: "center", padding: "2rem 0", color: "#fff" }}
        >
          Client Testimonials
        </Typography>
      </motion.div>
    </Box>
  );
};
