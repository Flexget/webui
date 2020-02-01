import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { ReadyState } from 'core/api';
import { renderWithWrapper } from 'utils/tests';
import * as hooks from './hooks';
import Execute from './Execute';
import { Status, Phase, Progress, Summary } from './types';

const tasks = [
  {
    id: 1,
    name: 'something',
  },
];

type Row = [string, Progress[], Summary, string];

const testData: Row[] = [
  [
    'empty',
    [],
    {
      accepted: 1,
      rejected: 2,
      failed: 3,
      undecided: 4,
      aborted: false,
    },

    'Phase: Processing -',
  ],
  [
    'running',
    [{ status: Status.Running, phase: Phase.Input, plugin: 'trakt', percent: 25 }],
    {
      aborted: true,
      abortReason: 'A bug',
    },
    'Phase: Gathering Entries - trakt',
  ],
];

describe('plugins/tasks/Execute', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  describe('disconnected', () => {
    it('should render execute button', () => {
      const { getByText } = renderWithWrapper(<Execute tasks={tasks} />);

      expect(getByText('Execute').closest('button')).toBeInTheDocument();
    });

    it('should open the dialog if you click the button', () => {
      const { getByText, queryByRole } = renderWithWrapper(<Execute tasks={tasks} />);
      const button = getByText('Execute').closest('button');

      expect(queryByRole('dialog')).not.toBeInTheDocument();
      if (button) {
        fireEvent.click(button);
      }

      expect(queryByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('connected', () => {
    describe.each(testData)('%s', (_, progress, summary, phaseString) => {
      beforeEach(() => {
        jest.spyOn(hooks, 'useExecuteTaskStream').mockReturnValue([
          {
            state: {
              tasks: {
                1: {
                  id: 1,
                  name: 'something',
                  progress,
                  summary,
                },
              },
              selectedTask: 1,
            },
            readyState: ReadyState.Open,
          },
          {
            execute: jest.fn(),
            setTask: jest.fn(),
          },
        ]);
      });

      it('should render tabs', () => {
        const { queryByRole } = renderWithWrapper(<Execute tasks={tasks} />);

        expect(queryByRole('tablist')).toBeInTheDocument();

        expect(queryByRole('tab')).toHaveTextContent('something');
      });

      it('should  have have the phase', () => {
        const { queryByText } = renderWithWrapper(<Execute tasks={tasks} />);

        expect(queryByText(phaseString)).toBeInTheDocument();
      });

      if (summary.aborted) {
        it('should render aborted text ', () => {
          const { queryByText } = renderWithWrapper(<Execute tasks={tasks} />);

          expect(queryByText('Aborted!!')).toBeInTheDocument();
          expect(queryByText(`Reason: ${summary.abortReason}`)).toBeInTheDocument();
          expect(queryByText(`Accepted: `)).not.toBeInTheDocument();
        });
      } else {
        it('should render summary', () => {
          const { queryByText } = renderWithWrapper(<Execute tasks={tasks} />);

          expect(queryByText('Aborted!!')).not.toBeInTheDocument();
          expect(queryByText(`Accepted: ${summary.accepted}`)).toBeInTheDocument();
          expect(queryByText(`Rejected: ${summary.rejected}`)).toBeInTheDocument();
          expect(queryByText(`Failed: ${summary.failed}`)).toBeInTheDocument();
          expect(queryByText(`Undecided: ${summary.undecided}`)).toBeInTheDocument();
        });
      }
    });
  });
});
