import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: "2em",
  backgroundColor: "transparent",
  borderRadius: "0",
  boxShadow: "none",
  minHeight: "300px",
}));

export const Testimony = () => {
  return (
    <Box sx={{ padding: "4em", backgroundColor: "#9b4819" }}>
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Initial state
        animate={{ opacity: 1, x: 0 }} // Animation state
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" sx={{ textAlign: "center", color: "#fff" }}>
          What People Say
        </Typography>
      </motion.div>
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 8, md: 12 }}
        >
          {testimony.map((item, index) => (
            <Grid key={index} item xs={12} sm={4} md={4}>
              <CustomPaper>
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="#fff"
                  sx={{ margin: "0 3em" }}
                >
                  "{item.title}"
                </Typography>
                <Divider color="#bd8f53" sx={{ margin: "1em 0" }} />
                <Typography textAlign="center" variant="body2" color="#fff">
                  {item.message} <br />
                  <br /> {item.author}
                </Typography>
              </CustomPaper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

const testimony = [
  {
    title: "From Concept to Reality: Stemir Mobile App Development",
    message:
      "I was very impressed by his works throughout the projects that related us. Beyond their technical prowess as a full-stack developer, their willingness to go the extra mile and problem-solving abilities were remarkable. They brought a refreshing enthusiasm to the team, fostering a collaborative and productive environment. Their adaptability to new challenges and quick grasp of complex concepts showcased their exceptional capabilities. Chablis Mahutin is not just a skilled developer but also a team player who elevates the entire project with their enthusiasm and dedication. ",
    author: "Bilal Houdonougbo, Lead Developer at Gemini & Co",
  },
  {
    title: "Revolutionizing Our Online Presence",
    message:
      "Working with Chablis Mahutin was absolute game-changer for our company, Midea Creative Group. Their expertise in full stack development significantly revamped our website, making it more responsive, visually appealing, and user-friendly. We saw a substantial increase in user engagement and conversion rates after overhaul. Chablis Mahutin was not just a developer; they were a strategic partner, understanding our business needs and translating them into a functional, stunning website. We highly recommend their services!",
    author: "Christian, Contractor Midea Creative Group",
  },
  {
    title: "Examplary Talent and Professionalism",
    message:
      "I've had the pleasure of collaborating with Chablis Mahutin and was thoroughly impressed by their talent, work ethic, and positive attitude. Beyond their technical prowess as a full-stack developer, their willingness to go the extra mile and problem-solving abilities were remarkable. They brought a refreshing enthusiasm to the team, fostering a collaborative and productive environment. Their adaptability to new challenges and quick grasp of complex concepts showcased their exceptional capabilities. It was a pleasure working alongside them!",
    author: "Hugo Ulysse CAPO-CHICHI",
  },
];
