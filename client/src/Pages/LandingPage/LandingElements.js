import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fadeInDown, fadeInLeft, fadeInRight, pulse } from "react-animations";

const toDown = keyframes`${fadeInDown}`;
const toLeft = keyframes`${fadeInLeft}`;
const toRight = keyframes`${fadeInRight}`;

export const Section = styled.section`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: column wrap;
  gap: 10vh;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding: 0 0 0 10vw;

  & > img {
    animation: 1s ${toRight};
    display: block;
    width: 30em;
    position: absolute;
    z-index: 1;
    right: -5em;
    bottom: -5em;
  }
`;

export const Headline = styled.h1`
  z-index: 2;
  font-size: 3em;
  font-weight: 600;
  animation: 1s ${toDown};
`;

export const JoinNow = styled(Link)`
  position: relative;
  gap: 0.5em;
  z-index: 2;
  align-items: center;
  border-radius: 5em;
  padding: 0.75em 1.5em;
  background-color: var(--c-blue);
  box-shadow: 0 0.25em 0.75em #6588ff;
  width: max-content;
  color: #fff;
  text-decoration: none;
  font-size: 1.25rem !important;
  font-weight: 500;
  animation: 1s ${toLeft};
  transform: translateY(0);
  transition: all 0.25s;

  & svg {
    margin: 0 0 0 0.25em;
    transition: all 0.5s;
  }
  &:hover svg {
    transform: translate(50%, 0);
  }
`;
