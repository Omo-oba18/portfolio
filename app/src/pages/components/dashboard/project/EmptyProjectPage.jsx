import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import alertIcon from "../../../../assets/icons/alert.svg";
import { styled } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  maxWidth: 850,
  margin: "auto",
  textAlign: "center",
  padding: theme.spacing(10),
  border: "2px dashed #bdbdbd",
  borderColor: theme.palette.grey[400],
}));

export function EmptyProjectPage() {
  return (
    <Box initial="false" animate="true">
      <Root>
        <motion.div
          animate={{
            scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
            opacity: [0, 1, 1, 1, 1, 1],
            transition: { duration: 0.72, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          exit={{
            animate: {
              scale: [0.9, 1.1, 0.3],
              opacity: [1, 1, 0],
            },
          }}
        >
          <Typography variant="h3" paragraph>
            You don&apos;t have any project yet
          </Typography>
        </motion.div>
        <Typography className="text-text-secondary">
          Add new project to your Portfolio
        </Typography>

        <motion.div
          animate={{
            scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
            opacity: [0, 1, 1, 1, 1, 1],
            transition: { duration: 0.72, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          exit={{
            animate: {
              scale: [0.9, 1.1, 0.3],
              opacity: [1, 1, 0],
            },
          }}
        >
          <Box
            sx={{ width: 300, height: 300 }}
            component="img"
            src={alertIcon}
          />
        </motion.div>

        <Button
          component={Link}
          to={PATH_DASHBOARD.newProject}
          size="large"
          variant="contained"
        >
          Create new Project
        </Button>
      </Root>
    </Box>
  );
}
