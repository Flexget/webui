import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import blank from 'images/blank-banner.png';
import {
  Media,
  Image,
} from './styles';

const SeriesCard = ({ show }) => (
  <Card>
    <Media
      image={show.lookup.tvdb.banner ? `/api/cached?url=${show.lookup.tvdb.banner}` : ''}
      title={show.lookup.tvdb.series_name}
    >
      <Image src={blank} alt="" />
    </Media>
    <CardContent>
      <Typography variant="h5" component="h2">
        {show.name}
      </Typography>
    </CardContent>
  </Card>
);

SeriesCard.propTypes = {
  show: PropTypes.shape({
    name: PropTypes.string,
    lookup: PropTypes.shape({
      tvdb: PropTypes.shape({
        banner: PropTypes.string,
        series_name: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default SeriesCard;
