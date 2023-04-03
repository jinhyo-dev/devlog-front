import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');
  
  body {
    margin: 0;
  }
  
  .header {
    width: 100%;
    height: 5rem;
    background: #000;
    color: #fff;
    font-family: 'Inconsolata', monospace;
    font-size: 1.7rem;
  }
  
  .logo-container {
    height: 5rem;
    width: 10rem;
    text-align: center;
    margin-left: 10%;
  }

  .logo-container .terminal-icon {
    font-size: 1.5rem;
    margin-top: 1.1rem;
  }
  
  .logo-container .font-container {
    font-size: 1rem;
  }

  /* 박스 컨테이너 스타일 지정 */
  .box-container {
    width: 80%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* 박스 스타일 지정 */
  .box {
    width: 10rem;
    height: 10rem;
    background-color: #ddd;
    margin: 10px;
  }

  /* 미디어 쿼리를 사용하여 반응형 스타일 적용 */
  @media (max-width: 767px) {
    /* 모바일 화면에서는 한 줄에 2개의 박스가 보이도록 지정 */
    .box {
      width: calc(50% - 20px);
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    /* 태블릿 화면에서는 한 줄에 3개의 박스가 보이도록 지정 */
    .box {
      width: calc(33.33% - 20px);
    }
  }

  @media (min-width: 992px) {
    /* 데스크탑 화면에서는 한 줄에 4개의 박스가 보이도록 지정 */
    .box {
      width: calc(25% - 20px);
    }
  }
`