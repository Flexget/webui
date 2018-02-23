import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import Button from 'material-ui/Button';
import { CardActions, CardContent } from 'material-ui/Card';
import FlexGetEntry from 'common/FlexGetEntry';
import EntryHeader from './EntryHeader';
import Divider from 'material-ui/Divider';
import { ActionIcon, EntryCard, Poster, EntryInfo, EntryPlot } from './styles';

/* eslint-disable camelcase */
class Entry extends React.PureComponent {
  static propTypes = {
    entry: PropTypes.instanceOf(FlexGetEntry).isRequired,
    openRemoveModal: PropTypes.func.isRequired,
    approveEntry: PropTypes.func.isRequired,
    rejectEntry: PropTypes.func.isRequired,
  };

  links() {
    const { entry: { links } } = this.props;
    return Object.entries(links).map(([plugin, link]) => (
      <Button key={`${plugin}-link`} variant="fab" color="primary" aria-label="add" href={link} target="_blank">
        {plugin}
      </Button>
    ));
  }

  render() {
    const { entry, openRemoveModal, approveEntry, rejectEntry } = this.props;
    const { approved, titleFormatted, posters } = entry;

    const { entry: { descriptions = [] } } = this.props;
    const description = descriptions.length > 0 ? descriptions[0] : '';

    return (
      <EntryCard>
        <Poster><Img src={posters.map(p => `api/cached/?url=${p}`)} alt={titleFormatted} /></Poster>
        <EntryInfo>
          <EntryHeader entry={entry} />
          <EntryPlot>{description}</EntryPlot>
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
            {this.links()}
          </CardActions>
        </EntryInfo>
      </EntryCard>
    );
  }
}

export default Entry;
