import React from 'react';
import sty, { CreateStyled } from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { Theme } from '@material-ui/core';

const styled = sty as CreateStyled<Theme>;

const stretchDelay = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1.0);
  }
`;

const Spinner = styled.div`
  margin: 10rem auto;
  width: 5rem;
  height: 4rem;
  text-align: center;
  font-size: 1rem;
`;

const Rect1 = styled.div`
  background-color: ${({ theme }) => theme.palette.primary[500]};
  height: 100%;
  width: 0.6rem;
  display: inline-block;
  margin: 0.1rem;
  animation: ${stretchDelay} 1.2s infinite ease-in-out;
`;

const Rect2 = styled(Rect1)`
  animation-delay: -1.1s;
`;

const Rect3 = styled(Rect1)`
  animation-delay: -1s;
`;

const Rect4 = styled(Rect1)`
  animation-delay: -0.9s;
`;

const Rect5 = styled(Rect1)`
  animation-delay: -0.8s;
`;

const WaveSpinner = () => (
  <Spinner>
    <Rect1 />
    <Rect2 />
    <Rect3 />
    <Rect4 />
    <Rect5 />
  </Spinner>
);

export default WaveSpinner;
