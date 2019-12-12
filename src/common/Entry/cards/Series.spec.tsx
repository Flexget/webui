import React from 'react';
import { mount } from 'enzyme';
import { Typography } from '@material-ui/core';
import { compose } from 'utils';
import {
  makeRawEntry,
  withSeriesRawEntry,
  withTVMazeSeriesFields,
  withTVDBSeriesFields,
} from '../fixtures';
import { toEntry } from '../utils';
import { SeriesEntry } from '../fields/series';
import SeriesCard from './Series';

describe('common/Entry/cards/Series', () => {
  describe('no additional fields', () => {
    const rawEntry = compose(withSeriesRawEntry)(makeRawEntry());
    const entry = toEntry(rawEntry) as SeriesEntry;
    it('contains header', () => {
      const wrapper = mount(<SeriesCard entry={entry} />);
      const header = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'h5',
      );

      expect(header.text()).toEqual(entry.seriesName);
    });

    it('does not have genres', () => {
      const wrapper = mount(<SeriesCard entry={entry} />);
      const genres = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'overline',
      );

      expect(genres.text()).toEqual('');
    });

    it('does not have description', () => {
      const wrapper = mount(<SeriesCard entry={entry} />);
      const description = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'body2',
      );

      expect(description.text()).toEqual('');
    });

    it('works with className', () => {
      const wrapper = mount(<SeriesCard entry={entry} className="testClassName" />);
      const content = wrapper.childAt(0);
      expect(content.hasClass('testClassName')).toBe(true);
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(
      withTVDBSeriesFields,
      withTVMazeSeriesFields,
      withSeriesRawEntry,
    )(makeRawEntry());
    const entry = toEntry(rawEntry) as SeriesEntry;
    it('contains header', () => {
      const wrapper = mount(<SeriesCard entry={entry} />);
      const header = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'h5',
      );

      expect(header.text()).toEqual(entry.seriesName);
    });

    it('does have genres', () => {
      const wrapper = mount(<SeriesCard entry={entry} />);
      const genres = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'overline',
      );

      expect(genres.text()).toEqual(`${entry.contentRating}•${entry.genres?.join(' ')}`);
    });

    it('does have description', () => {
      const wrapper = mount(<SeriesCard entry={entry} />);
      const description = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'body2',
      );

      expect(description.text()).toEqual(entry.description);
    });

    it('works with className', () => {
      const wrapper = mount(<SeriesCard entry={entry} className="testClassName" />);
      const content = wrapper.childAt(0);
      expect(content.hasClass('testClassName')).toBe(true);
    });
  });
});
