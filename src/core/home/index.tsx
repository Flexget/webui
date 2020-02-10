import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Grid } from '@material-ui/core';
import LoadingSpinner from 'common/LoadingSpinner';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { useGetHomeCards } from './hooks';
import PluginCard from './PluginCard';

const Home = () => {
  useInjectPageTitle('Flexget Manager');
  const { cards } = useGetHomeCards();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Grid container>
        {cards.map(card => (
          <Grid item key={card.path} xs={12} md={6} lg={4}>
            <PluginCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Suspense>
  );
};

export default hot(Home);
