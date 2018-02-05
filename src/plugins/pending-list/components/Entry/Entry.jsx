import React from 'react';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';
import { Textfit } from 'react-textfit';
import Button from 'material-ui/Button';
import { CardHeader, CardActions, CardMedia, CardContent } from 'material-ui/Card';
import Tooltip from 'material-ui/Tooltip';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { EntryShape } from 'plugins/pending-list/data/shapes';
import { removeDupesIgnoreCase } from 'utils';
import { getValues } from 'utils/object';
import { ActionIcon, content, subheader, EntryCard } from './styles';


/* eslint-disable camelcase */
class Entry extends React.PureComponent {
  static propTypes = {
    entry: EntryShape.isRequired,
    openRemoveModal: PropTypes.func.isRequired,
    approveEntry: PropTypes.func.isRequired,
    rejectEntry: PropTypes.func.isRequired,
  };

  static fieldMap = {
    genres: ['imdb_genres', 'tvdb_genres', 'tvmaze_genres', 'trakt_genres', 'tmdb_genres'],
    poster: ['imdb_photo', 'tvdb_posters', 'tvmaze_series_original_image', 'tmdb_posters'],
    description: ['imdb_plot_outline', 'tvdb_overview', 'tmdb_tagline', 'trakt_series_overview', 'tvmaze_series_summary'],
  }

  cleanTitle() {
    const { entry: { title, entry } } = this.props;

    if (entry.series_name) {
      const epId = entry.series_id ? ` ${entry.series_id}` : '';
      return `${entry.series_name}${epId}`;
    }

    if (entry.movie_name) {
      const year = entry.movie_year ? ` (${entry.movie_year})` : '';
      return `${entry.movie_name}${year}`;
    }
    return title;
  }

  qualityChips() {
    const chips = [];
    const { entry: { id, entry: { quality } } } = this.props;
    if (quality) {
      Object.entries(quality.split(' ')).forEach(([idx, q]) => {
        const chipId = `${id}-${idx}-quality`;
        chips.push(<Chip label={q} id={chipId} style={{ marginRight: 4, marginBottom: 2 }} />);
      });
    }
    return chips;
  }

  genreChips() {
    const { entry: { id, entry } } = this.props;

    const genres = getValues(entry, Entry.fieldMap.genres);
    const uniqueGenres = removeDupesIgnoreCase([].concat(...genres));

    const chips = [];
    Object.entries(uniqueGenres).forEach(([idx, genre]) => {
      const chipId = `${id}-${idx}-genre`;
      chips.push(<Chip label={genre} id={chipId} style={{ marginRight: 4, marginBottom: 2 }} />);
    });
    return chips;
  }

  subHeader() {
    const qualityChips = this.qualityChips();
    const genreChips = this.genreChips();

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {qualityChips}
        {genreChips}
      </div>
    );
  }

  posters() {
    const { entry: { entry } } = this.props;
    const posters = [];
    Entry.fieldMap.poster.forEach((field) => {
      let values = entry[field];
      if (values) {
        if (!Array.isArray(values)) values = [values];
        posters.push(...values);
      }
    });
    return posters;
  }

  descriptions() {
    const { entry: { entry } } = this.props;
    const descriptions = [];
    Entry.fieldMap.description.forEach((field) => {
      let values = entry[field];
      if (values) {
        if (!Array.isArray(values)) values = [values];
        descriptions.push(...values);
      }
    });
    return descriptions;
  }

  links() {
    const { entry: { entry } } = this.props;
    const links = [];
    if ('imdb_url' in entry) {
      links.push(<Button variant="fab" color="primary" aria-label="add" href={entry.imdb_url}>IMDB</Button>);
    }
    if ('tvdb_url' in entry) {
      links.push(<Button variant="fab" color="primary" aria-label="add" href={entry.tvdb_url}>TVDB</Button>);
    }
    return links;
  }

  render() {
    const { entry: { title, approved } } = this.props;
    const { openRemoveModal, approveEntry, rejectEntry } = this.props;

    const titleClean = this.cleanTitle();
    const posters = this.posters();
    const descriptions = this.descriptions();
    const links = this.links();

    return (
      <EntryCard>
        {posters.length > 0 &&
        <CardMedia style={{ width: 250, height: 220 }} image={posters[0]} title={titleClean} />
        }
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title={(
              <Textfit max={25} min={20} mode="multi">
                <Tooltip title={title}><span>{titleClean}</span></Tooltip>
              </Textfit>
            )}
            subheader={this.subHeader()}
            action={
              <IconButton onClick={openRemoveModal}>
                <FontAwesomeIcon icon={['far', 'trash-alt']} />
              </IconButton>
            }
            classes={{
              content,
              subheader,
            }}
          />
          {
            descriptions.length > 0 &&
            <CardContent>
              <TextTruncate
                line={3}
                truncateText="…"
                text={descriptions[0]}
              />
            </CardContent>
          }
          {
            links.length > 0 &&
            <CardContent>
              {links}
            </CardContent>
          }
          <CardActions>
            {
              approved ? (
                <Button onClick={rejectEntry}>
                  <ActionIcon icon="times" />
                  Reject
                </Button>
              ) : (
                <Button onClick={approveEntry}>
                  <ActionIcon icon="check" />
                  Approve
                </Button>
              )
            }
          </CardActions>
        </div>
      </EntryCard>
    );
  }
}

export default Entry;
