import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { isDarkAtom } from "../atoms";
import { lightTheme, darkTheme } from "../theme";

// createGlobalStyle : 랜더링 시, 이 컴포넌트는 전역 스코프에 스타일을 올려줌
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: 'Karla', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    /* line-height: 1.2; */
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ToggleTheme = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.accentColor};
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  transition: background-color 0.3s;
  cursor: pointer;
`;

export default function Root() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  const onClick = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ToggleTheme onClick={onClick}>
        {isDark ? <MdLightMode /> : <MdDarkMode />}
      </ToggleTheme>
      <GlobalStyle />
      <Outlet />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}
