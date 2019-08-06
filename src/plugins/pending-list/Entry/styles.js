import styled from '@emotion/styled';
import { css } from '@emotion/core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import theme from 'theme';

import { Card, Chip } from '@material-ui/core';

export const EntryCard = styled(Card)`
  height: 300px;
  padding: 2rem;
  display: flex;
  flex-direction: row;
`;


export const Poster = styled.div`
  margin-right: 20px;
  height:100%;
  img {
    max-height:100%;
    width: auto;
  }
`;

export const EntryInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Chips = styled.div`
  margin-right: 4;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2;
  div {
    margin: 0.2rem;
    font-weight: bold;
    font-size: 1.3rem;
    height: 2rem;
  }
`;

export const GenreChip = styled(Chip)`
  background-color: ${theme.palette.secondary[100]}
`;

export const QualityChip = styled(Chip)`
  background-color: ${theme.palette.primary[100]}
`;

// thanks to https://codepen.io/martinwolf/pen/qlFdp
export const EntryPlot = styled.p`
    display: block; /* Fallback for non-webkit */
    display: -webkit-box;
    height: 8.4rem;
    font-size: 1.5rem;
    line-height: 1.4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;


export const ActionIcon = styled(FontAwesomeIcon)`
  margin-right: ${theme.typography.pxToRem(theme.spacing(1))};
  font-size: 1.6rem;
`;

export const StarIcon = styled(FontAwesomeIcon)`
  color: gold;
`;


export const header = css`
  display: flex;
  flex-direction: row;
  div:first-child {
    flex-grow: 1;
  }
  h2 {
    word-wrap: break-word;
  }

`;

export const rating = css`
  flex-direction: row;
`;
