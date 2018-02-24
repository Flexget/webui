import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import FlexGetEntry from 'common/FlexGetEntry';
import Divider from 'material-ui/Divider';

import { Chips, GenreChip, QualityChip, StarIcon, header } from './styles';

class EntryHeader extends React.PureComponent {
  static propTypes = {
    entry: PropTypes.instanceOf(FlexGetEntry).isRequired,
  };

  state = { anchorEl: null };

  handlePopoverOpen = (event) => {
    //this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    // this.setState({ anchorEl: null });
  };

  ratings() {
    const { anchorEl } = this.state;
    const { entry: { ratings = [] } } = this.props;
    const open = !!anchorEl;

    return (
      <div>
        <div onMouseOver={this.handlePopoverOpen} onMouseOut={this.handlePopoverClose}>
          <Typography variant="title">
            {
              ratings.length > 0 && (
                <span>
                  <StarIcon icon="star" alt={ratings[0].site} />{ratings[0].rating}
                  {
                    ratings[0].votes > 0 &&
                    <span> ({ratings[0].votes})</span>
                  }
                </span>
              )
            }
          </Typography>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
        >
          <Typography>I use Popover. test</Typography>
        </Popover>
      </div>
    );
  }

  chips() {
    const { entry: { genres = [], quality = [] } } = this.props;

    return (
      <Chips>
        {
          genres.map(g => <GenreChip label={g} key={`${g}-genre`} />)
        }
        {
          quality.map(q => <QualityChip label={q} key={`${q}-quality`} />)
        }
      </Chips>
    );
  }

  render() {
    const { entry: { title, titleFormatted = [] } } = this.props;

    return (
      <div>
        <div className={header}>
          <Tooltip enterDelay={200} title={title}>
            <Typography variant="title">{titleFormatted}</Typography>
          </Tooltip>
          {this.ratings()}
        </div>
        {this.chips()}
        <Divider />
      </div>
    );
  }
}

export default EntryHeader;
