import React from 'react'
import styled, { keyframes } from "styled-components";
import UnauthorizedImage from "../assets/unauthorized.png";

const Unauthorized = () => {
  return (
    <Container>
      <img src={UnauthorizedImage} alt={'none-value-image'}/>
      <div>401 Unauthorized</div>
      <p>권한이 없습니다.</p>
    </Container>
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

export default Unauthorized