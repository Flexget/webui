import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Grid } from '@material-ui/core';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { useGetHomeCards } from './hooks';
import PluginCard from './PluginCard';
import InfoCard from './InfoCard';

const Home = () => {
  useInjectPageTitle('Flexget Manager');
  const { cards } = useGetHomeCards();
  return cards.length ? (
    <Grid container>
      {cards.map(card => (
        <Grid item key={card.path} xs={12} md={6} lg={4}>
          <PluginCard card={card} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <InfoCard />
  );
};

export default hot(Home);
