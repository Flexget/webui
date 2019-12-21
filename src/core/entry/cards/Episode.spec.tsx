import React from 'react';
import { mount } from 'enzyme';
import { Typography } from '@material-ui/core';
import { compose } from 'utils';
import {
  makeRawEntry,
  withEpisodeRawEntry,
  withTraktEpisodeFields,
  withTVMazeEpisodeFields,
} from '../fixtures';
import { toEntry } from '../utils';
import { EpisodeEntry } from '../fields/episodes';
import EpisodeCard from './Episode';

describe('common/Entry/cards/Episode', () => {
  describe('no additional fields', () => {
    const rawEntry = compose(
      e => ({ ...e, traktEpName: 'some name' }),
      withEpisodeRawEntry,
    )(makeRawEntry());
    const entry = toEntry(rawEntry) as EpisodeEntry;
    it('contains header', () => {
      const wrapper = mount(<EpisodeCard entry={entry} />);
      const header = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'h5',
      );

      expect(header.text()).toEqual(
        `${entry.seriesName} - ${entry.episodeName} - ${entry.seriesId}`,
      );
    });

    it('does not have genres', () => {
      const wrapper = mount(<EpisodeCard entry={entry} />);
      const genres = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'overline',
      );

      expect(genres.text()).toEqual(`${entry.quality}•`);
    });

    it('does not have description', () => {
      const wrapper = mount(<EpisodeCard entry={entry} />);
      const description = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'body2',
      );

      expect(description.text()).toEqual('');
    });

    it('works with className', () => {
      const wrapper = mount(<EpisodeCard entry={entry} className="testClassName" />);
      const content = wrapper.childAt(0);
      expect(content.hasClass('testClassName')).toBe(true);
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(
      withTraktEpisodeFields,
      withTVMazeEpisodeFields,
      withEpisodeRawEntry,
    )(makeRawEntry());
    const entry = toEntry(rawEntry) as EpisodeEntry;
    it('contains header', () => {
      const wrapper = mount(<EpisodeCard entry={entry} />);
      const header = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'h5',
      );

      expect(header.text()).toEqual(
        `${entry.seriesName} - ${entry.episodeName} - ${entry.seriesId}`,
      );
    });

    it('does have genres', () => {
      const wrapper = mount(<EpisodeCard entry={entry} />);
      const genres = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'overline',
      );

      expect(genres.text()).toEqual(
        `${entry.quality}•${entry.contentRating}•${entry.genres?.join(' ')}`,
      );
    });

    it('does have description', () => {
      const wrapper = mount(<EpisodeCard entry={entry} />);
      const description = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'body2',
      );

      expect(description.text()).toEqual(entry.description);
    });

    it('works with className', () => {
      const wrapper = mount(<EpisodeCard entry={entry} className="testClassName" />);
      const content = wrapper.childAt(0);
      expect(content.hasClass('testClassName')).toBe(true);
    });
  });
});
