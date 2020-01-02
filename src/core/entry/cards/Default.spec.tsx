import React from 'react';
import { render } from '@testing-library/react';
import { makeRawEntry } from '../fixtures';
import { toDefaultEntry } from '../utils';
import Card from './index';

describe('core/entry/cards/Default', () => {
  const entry = toDefaultEntry(makeRawEntry());
  it('contains title', () => {
    const { queryByText } = render(<Card entry={entry} />);

    expect(queryByText(entry.title)).toBeInTheDocument();
  });

  it('contains originalUrl', () => {
    const { queryByText } = render(<Card entry={entry} />);

    expect(queryByText(entry.originalUrl)).toBeInTheDocument();
  });

  it('works with className', () => {
    const { container } = render(<Card entry={entry} className="testClassName" />);
    expect(container.querySelector('.testClassName')).toBeInTheDocument();
  });
});
