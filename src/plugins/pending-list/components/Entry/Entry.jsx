import React from 'react';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';
import { Textfit } from 'react-textfit';
import Button from 'material-ui/Button';
import { CardHeader, CardActions, CardMedia, CardContent } from 'material-ui/Card';
import Tooltip from 'material-ui/Tooltip';
import Chip from 'material-ui/Chip';
import FlexGetEntry from 'common/FlexGetEntry';
import { ActionIcon, content, subheader, EntryCard } from './styles';

/* eslint-disable camelcase */
class Entry extends React.PureComponent {
  static propTypes = {
    entry: PropTypes.instanceOf(FlexGetEntry).isRequired,
    openRemoveModal: PropTypes.func.isRequired,
    approveEntry: PropTypes.func.isRequired,
    rejectEntry: PropTypes.func.isRequired,
  };

  qualityChips() {
    const { entry: { id, quality } } = this.props;
    return quality.map((q, idx) => {
      const chipId = `${id}-${idx}-quality`;
      return <Chip label={q} id={chipId} style={{ marginRight: 4, marginBottom: 2 }} />;
    });
  }

  genreChips() {
    const { entry: { id, genres } } = this.props;
    return genres.map((g, idx) => {
      const chipId = `${id}-${idx}-genre`;
      return <Chip label={g} id={chipId} style={{ marginRight: 4, marginBottom: 2 }} />;
    });
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

  links() {
    const { entry: { links } } = this.props;

    return Object.entries(links).map(([plugin, link]) => { // eslint-disable-line arrow-body-style
      return <Button variant="fab" color="primary" aria-label="add" href={link} target="_blank">{plugin}</Button>;
    });
  }

  render() {
    const { entry: { title, approved, titleFormatted, posters, descriptions } } = this.props;
    const { openRemoveModal, approveEntry, rejectEntry } = this.props;

    const links = this.links();

    return (
      <EntryCard>
        {posters.length > 0 &&
        <CardMedia style={{ width: 250, height: 220 }} image={posters[0]} title={titleFormatted} />
        }
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title={(
              <Textfit max={25} min={20} mode="multi">
                <Tooltip title={title}><span>{titleFormatted}</span></Tooltip>
              </Textfit>
            )}
            subheader={this.subHeader()}
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
            <Button onClick={openRemoveModal}>
              <ActionIcon icon="trash-alt" />
              Delete
            </Button>
          </CardActions>
        </div>
      </EntryCard>
    );
  }
}

export default Entry;
