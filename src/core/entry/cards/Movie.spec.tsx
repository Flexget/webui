import React from 'react';
import { mount } from 'enzyme';
import { Typography } from '@material-ui/core';
import { compose } from 'utils';
import { normalizeMinutes } from 'utils/time';
import { makeRawEntry, withMovieRawEntry, withTMDBFields, withTraktFields } from '../fixtures';
import { toEntry } from '../utils';
import { MovieEntry } from '../fields/movies';
import MovieCard from './Movie';

describe('common/Entry/cards/Movie', () => {
  describe('no additional fields', () => {
    const rawEntry = compose(withMovieRawEntry)(makeRawEntry());
    const entry = toEntry(rawEntry) as MovieEntry;
    it('contains header', () => {
      const wrapper = mount(<MovieCard entry={entry} />);
      const header = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'h5',
      );

      expect(header.text()).toEqual(`${entry.movieName} (${entry.movieYear})`);
    });

    it('does not have genres', () => {
      const wrapper = mount(<MovieCard entry={entry} />);
      const genres = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'overline',
      );

      expect(genres.text()).toEqual('');
    });

    it('does not have description', () => {
      const wrapper = mount(<MovieCard entry={entry} />);
      const description = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'body2',
      );

      expect(description.text()).toEqual('');
    });

    it('works with className', () => {
      const wrapper = mount(<MovieCard entry={entry} className="testClassName" />);
      const content = wrapper.childAt(0);
      expect(content.hasClass('testClassName')).toBe(true);
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(withTraktFields, withTMDBFields, withMovieRawEntry)(makeRawEntry());
    const entry = toEntry(rawEntry) as MovieEntry;
    it('contains header', () => {
      const wrapper = mount(<MovieCard entry={entry} />);
      const header = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'h5',
      );

      expect(header.text()).toEqual(`${entry.movieName} (${entry.movieYear})`);
    });

    it('does have genres', () => {
      const wrapper = mount(<MovieCard entry={entry} />);
      const genres = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'overline',
      );

      expect(genres.text()).toEqual(
        `${normalizeMinutes(entry.runtime ?? 0)}•${entry.genres?.join(' ')}`,
      );
    });

    it('does have description', () => {
      const wrapper = mount(<MovieCard entry={entry} />);
      const description = wrapper.findWhere(
        el => el.type() === Typography && el.props().variant === 'body2',
      );

      expect(description.text()).toEqual(entry.description);
    });

    it('works with className', () => {
      const wrapper = mount(<MovieCard entry={entry} className="testClassName" />);
      const content = wrapper.childAt(0);
      expect(content.hasClass('testClassName')).toBe(true);
    });
  });
});
