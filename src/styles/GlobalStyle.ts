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
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

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
    justify-content: flex-start;
    transition: all 0.5s;
  }

  .box {
    height: 24rem;
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
      object-fit: cover;
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
      cursor: default;
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

      & .edit-icon {
        cursor: pointer;
        margin-bottom: -0.05rem;
        font-size: 0.9rem;
        transition: all 0.3s;

        &:hover {
          color: #139ff2;
        }
      }

      & .delete-icon {
        cursor: pointer;
        margin-bottom: -0.05rem;
        margin-left: 0.3rem;
        transition: all 0.3s;
        font-size: 0.9rem;

        &:hover {
          color: #ee5f5f;
        }
      }
    }
  }

  .editor-container {
    width: 90%;
    height: 80vh;
    margin: 1.5vh auto 0;
  }

  .wmde-markdown-var {
    margin-top: 0.5rem;
    height: 100%;
  }

  .custom-alert-ui {
    background-color: ${({theme}) => theme.backgroundColor};
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    position: relative;
    width: 400px;
    color: ${({theme}) => theme.fontColor};
    font-family: 'D2Coding';

    & .logo-container {
      color: ${({theme}) => theme.fontColor};
      width: 10rem;
      text-align: center;
      margin: auto;

      & .terminal-icon {
        font-size: 1.2rem;
      }

      & .font {
        font-size: 0.8rem;
        text-align: center;
      }
    }

    & p {
      text-align: center;
      font-size: 1.4rem;
      font-weight: bold;
    }

    & .button-container {
      width: 8rem;
      margin: auto;

      & button {
        cursor: pointer;
        width: 3.7rem;
        height: 1.8rem;
        border: none;
        border-radius: 3px;
        transition: all 0.2s;

        &:hover {
          height: 2rem;
          width: 3.9rem;
        }
      }

      & .close-btn {
        background-color: ${({theme}) => theme.boxColor};
        color: ${({theme}) => theme.fontColor};
      }

      & .logout-btn {
        float: right;
        background-color: ${({theme}) => theme.hashtagColor};
        color: ${({theme}) => theme.backgroundColor};
      }
    }
  }

  .react-confirm-alert-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
  }

  .react-confirm-alert-body {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    z-index: 100000;
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
        font-size: 0.9rem;
        height: 1.4rem;
      }

      & .info {
        font-size: 0.7rem;
      }

      & .bottom-text div {
        font-size: 0.6rem;
      }
    }
  }

  @media (min-width: 1000px) and (max-width: 1399px) {
    .box {
      width: calc(33.33% - 20px);
    }

    .box .text-container {
      & .title {
        font-size: 0.9rem;
        height: 1.4rem;
      }

      & .info {
        font-size: 0.75rem;
      }

      & .bottom-text div {
        font-size: 0.6rem;
      }
    }
  }

  @media (min-width: 1400px) {
    .box {
      width: calc(25% - 20px);
    }
  }
`