import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    height: -webkit-fill-available;
  }

  #root,
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: -webkit-fill-available; /* mobile viewport bug fix */
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 100%;
    line-height: 1.5;
    color: ${({ theme }) => theme.main.text};
    background-color: ${({ theme }) => theme.main.background};
    overflow-y: auto;
    overflow-x: auto;
    scroll-behavior: smooth;
    transition: all 0.45s ease;

    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  ::selection {
    background-color: ${({ theme }) => theme.main.selection};
  }

  button {
    padding: 0;
    border: 0;
    outline: none;
    background: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`;
