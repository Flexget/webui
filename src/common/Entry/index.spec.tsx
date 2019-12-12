import React from 'react';
import { mount } from 'enzyme';
import {
  makeRawEntry,
  withEpisodeRawEntry,
  withSeriesRawEntry,
  withMovieRawEntry,
} from './fixtures';
import Card from './index';
import DefaultCard from './cards/Default';
import MovieCard from './cards/Movie';
import EpisodeCard from './cards/Episode';
import SeriesCard from './cards/Series';

describe('common/Entry/cards', () => {
  const rawEntry = makeRawEntry();

  it('should render default', () => {
    const wrapper = mount(<Card entry={rawEntry} />);
    const actualCard = wrapper.childAt(0);

    expect(actualCard.type()).toBe(DefaultCard);
  });

  it('should render episode', () => {
    const entry = withEpisodeRawEntry(rawEntry);
    const wrapper = mount(<Card entry={entry} />);
    const actualCard = wrapper.childAt(0);

    expect(actualCard.type()).toBe(EpisodeCard);
  });

  it('should render series', () => {
    const entry = withSeriesRawEntry(rawEntry);
    const wrapper = mount(<Card entry={entry} />);
    const actualCard = wrapper.childAt(0);

    expect(actualCard.type()).toBe(SeriesCard);
  });

  it('should render movie', () => {
    const entry = withMovieRawEntry(rawEntry);
    const wrapper = mount(<Card entry={entry} />);
    const actualCard = wrapper.childAt(0);

    expect(actualCard.type()).toBe(MovieCard);
  });
});
