import React from 'react';
import { mount } from 'enzyme';
import { Typography } from '@material-ui/core';
import { makeRawEntry } from '../fixtures';
import { toEntry } from '../utils';
import { DefaultEntry } from '../fields';
import DefaultCard from './Default';

describe('common/Entry/cards/Default', () => {
  const entry = toEntry(makeRawEntry()) as DefaultEntry;
  it('contains title', () => {
    const wrapper = mount(<DefaultCard entry={entry} />);
    const title = wrapper.findWhere(el => el.type() === Typography && el.props().variant === 'h5');

    expect(title.text()).toEqual(entry.title);
  });

  it('contains originalUrl', () => {
    const wrapper = mount(<DefaultCard entry={entry} />);
    const originalUrl = wrapper.findWhere(
      el => el.type() === Typography && el.props().variant === 'body2',
    );

    expect(originalUrl.text()).toEqual(entry.originalUrl);
  });

  it('works with className', () => {
    const wrapper = mount(<DefaultCard entry={entry} className="testClassName" />);
    const content = wrapper.childAt(0);
    expect(content.hasClass('testClassName')).toBe(true);
  });
});
