import { createGlobalStyle, keyframes } from 'styled-components'
import { CustomTheme } from "./theme/defaultTheme";

interface GlobalStyleProps {
  theme: CustomTheme;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  @font-face {
    font-family: 'D2Coding';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  body {
    margin: 0;
    background-color: ${({theme}) => theme.backgroundColor};
    animation: ${fadeIn} 0.3s linear forwards;
    transition: background-color 0.3s linear;
  }

  .toggle-container {
    float: right;
    margin-right: 5%;
    height: 100%;
    width: 3rem;
  }

  .toggle-container .toggle-dark-theme {
    margin: 1.55rem auto 0;
    display: block;
  }

  .box-container {
    padding-top: 0.5rem;
    width: 90%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    transition: all 0.5s;
  }

  .box {
    height: 40vh;
    min-height: 15rem;
    max-height: 35rem;
    max-width: 35rem;
    min-width: 18rem;
    background-color: ${({theme}) => theme.boxColor};
    margin: 10px;
    box-shadow: ${({theme}) => theme.boxShadow};
    transition: all 0.3s;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      margin-top: -0.3rem;
      box-shadow: ${({theme}) => theme.boxShadowHover};
      background-color: ${({theme}) => theme.boxHoverBackground};
    }
  }

  .box .image-container {
    width: 100%;
    height: 55%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    & img {
      height: 100%;
      width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  .box .text-container {
    width: 100%;
    height: 45%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    position: relative;
    color: ${({theme}) => theme.fontColor};

    & .title {
      font-family: 'SUIT-Regular';
      font-weight: bold;
      padding-top: 1.5vh;
      width: auto;
      font-size: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      height: 1.7rem;
    }

    & .info {
      font-family: 'Pretendard-Regular';
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 0.8rem;
      line-height: 1.5;
    }

    & .bottom-text {
      font-family: 'Pretendard-Regular';
      border-top: ${({theme}) => theme.bottomBoxBorderColor};
      height: 2rem;
      width: 100%;
      position: absolute;
      bottom: 0;

      & div {
        padding-left: 1rem;
        padding-right: 1rem;
        top: 50%;
        font-size: 0.7rem;
        position: relative;
        transform: translateY(-50%);
        color: #777;
      }

    }

  }

  @media (max-width: 549px) {
    .box {
      width: 100%;
    }
  }

  @media (min-width: 550px) and (max-width: 999px) {
    .box {
      width: calc(50% - 20px);
    }

    .box .text-container {
      & .title {
        font-size: 0.7rem;
        height: 1rem;
      }

      & .info {
        font-size: 0.5rem;
      }

      & .bottom-text div {
        font-size: 0.4rem;
      }
    }
  }

  @media (min-width: 1000px) and (max-width: 1399px) {
    .box {
      width: calc(33.33% - 20px);
    }
  }

  @media (min-width: 1400px) {
    .box {
      width: calc(25% - 20px);
    }
  }
`