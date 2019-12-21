import React from 'react';
import { render } from '@testing-library/react';
import { makeRawEntry } from '../fixtures';
import { toEntry } from '../utils';
import { DefaultEntry } from '../fields';
import DefaultCard from './Default';

describe('common/Entry/cards/Default', () => {
  const entry = toEntry(makeRawEntry()) as DefaultEntry;
  it('contains title', () => {
    const { queryByText } = render(<DefaultCard entry={entry} />);

    expect(queryByText(entry.title)).toBeInTheDocument();
  });

  it('contains originalUrl', () => {
    const { queryByText } = render(<DefaultCard entry={entry} />);

    expect(queryByText(entry.originalUrl)).toBeInTheDocument();
  });

  it('works with className', () => {
    const { container } = render(<DefaultCard entry={entry} className="testClassName" />);
    expect(container.querySelector('.testClassName')).toBeInTheDocument();
  });
});
