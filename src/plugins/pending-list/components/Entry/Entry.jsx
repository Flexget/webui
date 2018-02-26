import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import Button from 'material-ui/Button';
import { CardActions } from 'material-ui/Card';
import FlexGetEntry from 'common/FlexGetEntry';
import TaskSelector from 'common/TaskSelector';
import EntryHeader from './EntryHeader';
import { ActionIcon, EntryCard, Poster, EntryInfo, EntryPlot } from './styles';

/* eslint-disable camelcase */
class Entry extends React.PureComponent {
  static propTypes = {
    entry: PropTypes.instanceOf(FlexGetEntry).isRequired,
    approveEntry: PropTypes.func.isRequired,
    rejectEntry: PropTypes.func.isRequired,
    removeEntry: PropTypes.func.isRequired,
    injectEntry: PropTypes.func.isRequired,
  };

  state = {
    taskMenuEl: null
  }

  links() {
    const { entry: { links } } = this.props;
    return Object.entries(links).map(([plugin, link]) => (
      <Button key={`${plugin}-link`} color="primary" aria-label="add" href={link} target="_blank">
        {plugin}
      </Button>
    ));
  }

  handleInjectOpen = (event) =>  this.setState({ taskMenuEl: event.currentTarget });
  handleInjectClose = () => this.setState({ taskMenuEl: null });

  handleInjectClick = (task) => {
    const { injectEntry } = this.props;
    injectEntry(task);
    this.handleInjectClose();
  }


  render() {
    const {
      entry,
      approveEntry,
      rejectEntry,
      removeEntry,
    } = this.props;
    const { approved, titleFormatted, posters } = entry;
    const { taskMenuEl } = this.state;

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
            <Button onClick={removeEntry}>
              <ActionIcon icon="trash-alt" />
              Remove
            </Button>
            <Button onClick={this.handleInjectOpen}>
              <ActionIcon icon="arrows-alt" />
              Inject
            </Button>
            <TaskSelector
              anchorEl={taskMenuEl}
              handleClick={this.handleInjectClick}
              handleClose={this.handleInjectClose}
            />
            {this.links()}
          </CardActions>
        </EntryInfo>
      </EntryCard>
    );
  }
}

export default Entry;
