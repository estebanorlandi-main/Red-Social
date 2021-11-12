import React from "react";

import { HiArrowNarrowRight } from "react-icons/hi";

import { BackWords, Section, Headline, JoinNow } from "./LandingElements";

export default function LandingPage() {
  return (
    <main style={{ background: "#fff" }}>
      <BackWords>CONNECT LEARN TALK</BackWords>
      <Section>
        <div>
          <Headline>Stay connected && Keep learning</Headline>
        </div>

        <JoinNow to="/signup">
          Join now! <HiArrowNarrowRight style={{ color: "#fff" }} />
        </JoinNow>
      </Section>
    </main>
  );
}
