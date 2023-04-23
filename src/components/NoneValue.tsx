import NoneValueImage from '../assets/none-value.png'
import styled, { keyframes } from "styled-components";

const NoneValue = (props: any) => {
  return (
    <Container>
      <img src={NoneValueImage} alt={'none-value-image'}/>
      <div>{props.search ? '검색하신 값이 존재하지 않습니다.' : '현재 게시물이 존재하지 않습니다.'}</div>
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
  margin: 25vh auto 0;
  text-align: center;
  
  & img {
    width: 20rem;
    animation: ${floatingAnimation} 2.5s ease-in-out infinite; 
  }
  
  & div {
    font-size: 1.5rem;
    font-family: 'SUIT-Regular';
    color: ${({theme}) => theme.secondColor};
    font-weight: bold;
  }

  @media (max-width: 549px) {
    & img {
      width: 10rem;
      animation: ${floatingAnimation} 2.5s ease-in-out infinite;
    }

    & div {
      font-size: 1.2rem;
    }
  }
`

export default NoneValue