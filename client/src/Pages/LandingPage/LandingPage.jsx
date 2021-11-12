import React from "react";

import { HiArrowNarrowRight } from "react-icons/hi";

import { Section, Headline, JoinNow } from "./LandingElements";

import image from "./PostExample.png";

export default function LandingPage() {
  return (
    <main style={{ background: "#fff" }}>
      <Section>
        <Headline>
          Join the best <br /> developer social <br /> network!
        </Headline>

        <JoinNow to="/signup">
          Join now! <HiArrowNarrowRight style={{ color: "#fff" }} />
        </JoinNow>

        <img src={image} alt="" />
      </Section>
    </main>
  );
}
