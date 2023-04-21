import React from 'react'
import NotFoundImage from "../assets/not-found.png";
import styled, { keyframes } from "styled-components";
import Header from "./Header";

const NotFound = () => {
  return (
    <>
      <Header/>
      <Container>
        <img src={NotFoundImage} alt={'none-value-image'}/>
        <div>404 Not found</div>
        <p>페이지가 존재하지 않습니다.</p>
      </Container>
    </>
  )
}

const floatingAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;


const Container = styled.div`
  width: 20rem;
  height: 12.5rem;
  margin: 24vh auto 0;
  text-align: center;

  & img {
    width: 15rem;
    animation: ${floatingAnimation} 2.5s ease-in-out infinite;
  }

  & div {
    font-size: 2rem;
    font-family: 'SUIT-Regular';
    color: ${({theme}) => theme.secondColor};
    font-weight: bold;
  }

  & p {
    margin-top: 0.6rem;
    font-size: 1.3rem;
    font-family: 'SUIT-Regular';
    color: ${({theme}) => theme.secondColor};
  }

  @media (max-width: 549px) {
    & img {
      width: 8rem;
      animation: ${floatingAnimation} 2.5s ease-in-out infinite;
    }

    & div {
      font-size: 1.5rem;
    }

    & p {
      font-size: 1rem;
    }
  }
`

export default NotFound