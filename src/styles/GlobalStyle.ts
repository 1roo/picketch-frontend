import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 기본적인 Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: "Galmuri11", sans-serif;
    font-weight: bold;
    src: url("/fonts/Galmuri11.ttf") format("truetype");
    line-height: 1.5;
    background-color: #101010;
    color: #d8ff91; 
  }

  /* 링크 스타일 초기화 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 리스트 스타일 초기화 */
  ul, ol {
    list-style: none;
  }

  /* 버튼 초기화 */
  button {
    all: unset;
    cursor: pointer;
    font: inherit;
  }

  /* 이미지 초기화 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* 테이블 초기화 */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  /* 입력 요소 초기화 */
  input, textarea, button, select {
    font: inherit;
    border: none;
    outline: none;
    background: none;
  }
`;

export default GlobalStyle;
