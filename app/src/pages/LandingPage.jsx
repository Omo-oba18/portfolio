import React from "react";
import { About, Education, Experience, Heading, PostHeading, Skill } from "../core/components";

const LandingPage = () => {
  return (
    <>
      <Heading />
      <PostHeading />
      <About />
      <Skill />
      {/* <Education /> */}
      <Experience />
    </>
  );
};

export default LandingPage;
