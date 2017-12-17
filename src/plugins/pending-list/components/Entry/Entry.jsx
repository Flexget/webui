import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { CardHeader, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { EntryShape } from 'plugins/pending-list/data/shapes';
import { ActionIcon, content, subheader, EntryCard } from './styles';

/* eslint-disable camelcase */
const Entry = ({
  entry: { title, original_url, approved },
  openRemoveModal,
  approveEntry,
  rejectEntry,
}) => (
  <EntryCard>
    <CardHeader
      title={title}
      subheader={original_url}
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
  </EntryCard>
);
/* eslint-enable camelcase */

Entry.propTypes = {
  entry: EntryShape.isRequired,
  openRemoveModal: PropTypes.func.isRequired,
  approveEntry: PropTypes.func.isRequired,
  rejectEntry: PropTypes.func.isRequired,
};

export default Entry;
