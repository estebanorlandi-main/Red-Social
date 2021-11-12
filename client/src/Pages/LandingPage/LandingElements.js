import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fadeInDown, pulse } from "react-animations";

const toDown = keyframes`${fadeInDown}`;
const pulseBtn = keyframes`${pulse}`;

export const Section = styled.section`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  gap: 10vh;
  width: 100%;
  height: 100vh;
`;

export const Headline = styled.h1`
  display: flex;
  align-items: flex-end;
  font-size: 2.5em;
  font-weight: 500;
  text-align: center;

  span {
    font-size: 1.25em;
    color: var(--c-blue);
    font-weight: 600;
  }

  animation: 1s ${toDown};
`;

export const JoinNow = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 1em auto 0 auto;
  border-radius: 5em;
  padding: 0.75em 1.5em;
  background-color: var(--c-blue);
  box-shadow: 0 0.25em 1em var(--c-blue);
  width: max-content;
  color: #fff;
  text-decoration: none;
  font-size: 1.25rem !important;
  font-weight: 500;
  transform: translateY(0);
  transition: all 0.25s;

  &:hover {
    animation: 0.75s ${pulseBtn} ease;
  }
`;

export const BackWords = styled.p`
  text-align: center;
  color: #f0f0f0;
  font-size: 10rem;
  font-weight: 600;
  position: absolute;
  z-index: 1;
  top: 45%;
  left: 0;
  transform: translateY(-50%);
`;
