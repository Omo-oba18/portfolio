import React from "react";
import { Stack, Box } from "@mui/material";
import coffeeLaptop from "../../../assets/coffee-laptop.png";
import sampleDev from "../../../assets/sample_dev.jpg";
import networkSystem from "../../../assets/data-information-network-system-drawing-concept.jpg";
import designUX from "../../../assets/representations-user-experience-interface-design.jpg";
import analysisImg from "../../../assets/technical_analysis.jpg";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  overflow: "hidden", // Adjust the individual photo height as needed
}));
const Galery = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  height: "80vh",
  position: "relative", // Adjust the container height as needed
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2em",
    paddingBottom: "2em",
    paddingRight: "auto",
    paddingLeft: "auto",
    flexWrap: "nowrap",
    height: "unset",
  },
}));
const TopLeft = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    bottom: 0,
    left: 0,
    transform: "translate(-10%, -20%)",
    position: "absolute",
    width: "300px", // Adjust the individual photo width as needed
    height: "250px",
  },
  width: "90%",
  height: "200px",
}));
const TopRight = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    borderTopLeftRadius: "40%",
    borderTopRightRadius: "40%",
    overflow: "hidden",
    top: "0%",
    right: "50%",
    transform: "translate(-10%, 75%)",
    position: "absolute",
    width: "250px", // Adjust the individual photo width as needed
    height: "250px",
  },
  width: "90%",
  height: "200px",
}));
const Middle = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    transform: "translate(5%, 0%)",
    position: "absolute",
    top: "0%",
    right: "50%",
    overflow: "hidden",
    width: "360px",
    maxHeight: "140px",
  },
  width: "90%",
  height: "200px",
}));
const BottomRight = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    bottom: 0,
    right: "20%",
    position: "absolute",
    overflow: "hidden",
    transform: "translate(-5%, -40%)",
    width: "290px",
    height: "290px",
  },
  width: "90%",
  height: "200px",
}));
const CenterRight = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    top: 0,
    right: 0,
    position: "absolute",
    overflow: "hidden",
    transform: "translate(30%, 10%)",
    width: "290px",
    height: "390px",
  },
  width: "90%",
  height: "200px",
}));
const CustomImage = styled("img")(({ theme }) => ({
  objectFit: "cover",
  width: "100%", // Make sure the image takes 100% width of the container
  height: "100%",
  margin: "8px",
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 100%",
    margin: "0",
  },
}));

export const PostHeading = () => {
  return (
    <CustomBox>
      <Galery spacing={2}>
        <TopLeft>
          <CustomImage src={coffeeLaptop} alt="Coffee laptop" />
        </TopLeft>
        <TopRight>
          <CustomImage src={analysisImg} alt="database analysis" />
        </TopRight>
        <Middle>
          <CustomImage src={networkSystem} alt="network analysis" />
        </Middle>
        <BottomRight>
          <CustomImage src={sampleDev} alt="developer picture" />
        </BottomRight>
        <CenterRight>
          <CustomImage src={designUX} alt="ux design" />
        </CenterRight>
      </Galery>
    </CustomBox>
  );
};
