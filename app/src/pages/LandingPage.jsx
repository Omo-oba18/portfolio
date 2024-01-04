import React from "react";
import {
  About,
  // Education,
  Experience,
  Heading,
  PostHeading,
  Skill,
  Testimony,
} from "../core/components";

const LandingPage = () => {
  return (
    <>
      <Heading />
      <PostHeading />
      <About />
      <Skill />
      {/* <Education /> */}
      <Experience />
      <Testimony />
    </>
  );
};

export default LandingPage;
