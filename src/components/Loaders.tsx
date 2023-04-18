import styled, { keyframes } from "styled-components";

const Loaders = () => {
  return (
    <LoaderContainer>
      <LoadingIcon/>
      <LoadingText>게시글 불러오는중...</LoadingText>
    </LoaderContainer>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

const LoaderContainer = styled.div`
  height: 5rem;
  width: 10rem;
  margin: 35vh auto 0;
`

const LoadingIcon = styled.div`
  margin: auto;
  border: 4px solid ${({theme}) => theme.fontColor};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  border-left-color: transparent;
  animation: ${spin} 1s linear infinite;
`

const LoadingText = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-family: 'SUIT-Regular';
  color: ${({theme}) => theme.fontColor};
`

export default Loaders