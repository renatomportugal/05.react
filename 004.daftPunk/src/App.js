import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { darkTheme } from './theme/theme';
import GlobalStyles from './theme/global';
import Badge from './components/Badge';
import DaftPunk from './components/DaftPunk';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const Canvas = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 460px;
  height: 260px;
`;

const Particle = styled.div`
  @keyframes bubbles {
    0% {
      opacity: 0.4;
      transform: translate(0, -80%);
    }
    50% {
      opacity: 0.8;
      transform: translate(0, -140%);
    }
    100% {
      opacity: 0.4;
      transform: translate(0, -80%);
    }
  }

  z-index: 1000;
  position: absolute;
  top: ${({ topPosition }) => topPosition && `${topPosition}%`};
  left: ${({ leftPosition }) => leftPosition && `${leftPosition}%`};
  width: ${({ size }) => size && `${size}px`};
  height: ${({ size }) => size && `${size}px`};
  background: #a029ab;
  border-radius: 100%;
  mix-blend-mode: color-dodge;
  filter: blur(${({ blur }) => blur && `${blur}px`});
  opacity: 0.4;
  transform: translate(0, -80%);
  animation: bubbles 10s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay && `${delay}s`};

  &:nth-child(odd) {
    background: #1d40f8;
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Normalize />
      <GlobalStyles />
      <Page>
        <Badge fixed>Goodbye Daft Punk</Badge>
        <Canvas>
          {Object.keys([...Array(20)]).map((particle, index) => (
            <Particle
              key={particle}
              index={index + 1}
              blur={Math.floor(Math.random() * 4) + 1}
              size={Math.floor(Math.random() * 45) + 10}
              topPosition={Math.floor(Math.random() * 60) + 10}
              leftPosition={Math.floor(Math.random() * 80) + 0}
              delay={Math.floor(Math.random() * 4) + 1}
            />
          ))}
          <DaftPunk />
        </Canvas>
      </Page>
    </ThemeProvider>
  );
}
