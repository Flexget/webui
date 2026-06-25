import React, { FC, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import { useHistory, Route, Switch } from 'react-router';
import fetchMock from 'fetch-mock';
import YAML from 'yaml';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import { TaskContainer } from 'plugins/tasks/hooks';
import * as coreApi from 'core/api';
import * as backfillHooks from './hooks';
import Backfill from './Backfill';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface Props {
  path: string;
}

const TestBackfill: FC<Props> = ({ path }) => {
  const { push } = useHistory();
  useEffect(() => { push(path); }, [path, push]);
  return (
    <TaskContainer.Provider>
      <AppBar toggleSidebar={jest.fn()} />
      <Switch>
        <Route path="/backfill"><Backfill /></Route>
      </Switch>
    </TaskContainer.Provider>
  );
};

const getField = (container: HTMLElement, name: string) =>
  container.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement | null;

const taskConfig = {
  config: { rss: { url: 'http://source.example.com/rss?q=base&cat=1' }, series: ['Breaking Bad', 'The Wire'] },
  name: 'test-task',
};

const waitForConfig = (container: HTMLElement) =>
  wait(
    () => {
      const el = getField(container, 'taskConfig');
      expect(el).not.toBeNull();
      expect(el!.value).toBe(YAML.stringify(taskConfig));
    },
    { timeout: 8000 },
  );

// RssBackfillUrlField (Query Param) is rendered before TaskSeriesField in the JSX,
// so the Task Series Select is always at MuiSelect-root index 1.
const QUERY_PARAM_SELECT_INDEX = 0;
const TASK_SERIES_SELECT_INDEX = 1;

// Open a MUI Select by DOM index and click the option matching `text`.
// MUI renders the listbox into a portal so we query document directly.
const pickSelectOption = async (container: HTMLElement, index: number, text: string) => {
  const selectDiv = container.querySelectorAll('.MuiSelect-root')[index] as HTMLElement;
  fireEvent.mouseDown(selectDiv);
  await wait(() => {
    const options = Array.from(document.querySelectorAll('[role="option"]'));
    const option = options.find(el => el.textContent?.trim() === text);
    expect(option).not.toBeNull();
    fireEvent.click(option!);
  });
};

const pickSeriesOption = (container: HTMLElement, text: string) =>
  pickSelectOption(container, TASK_SERIES_SELECT_INDEX, text);

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

describe('plugins/backfill/Backfill', () => {
  beforeAll(() => jest.setTimeout(15000));
  afterAll(() => jest.setTimeout(5000));

  let capturedDoneCallback: (() => void) | undefined;
  let capturedFailCallback: (() => void) | undefined;
  let capturedNodeHandlers: Record<string, (e: any) => void>;
  let mockConnect: jest.Mock;
  let mockStream: any;

  beforeEach(() => {
    capturedDoneCallback = undefined;
    capturedFailCallback = undefined;
    capturedNodeHandlers = {};
    mockConnect = jest.fn();

    mockStream = {
      node: jest.fn().mockImplementation((path: string, cb: (e: any) => void) => {
        capturedNodeHandlers[path] = cb;
        return mockStream;
      }),
      done: jest.fn().mockImplementation((cb: () => void) => {
        capturedDoneCallback = cb;
        return mockStream;
      }),
      fail: jest.fn().mockImplementation((cb: () => void) => {
        capturedFailCallback = cb;
        return mockStream;
      }),
    };

    jest.spyOn(coreApi, 'useFlexgetStream').mockReturnValue([
      { stream: mockStream as any, readyState: coreApi.ReadyState.Closed },
      { connect: mockConnect, disconnect: jest.fn() },
    ]);

    fetchMock
      .get('/api/tasks', [])
      .get('/api/tasks/test-task', taskConfig)
      .post('/api/tasks', 200)
      .delete('/api/tasks/test-task-backfill', 204)
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
    jest.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // Initial state
  // -------------------------------------------------------------------------

  describe('initial state', () => {
    it('derives taskName from the task query param', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);
      expect(getField(container, 'taskName')?.value).toBe('test-task-backfill');
    });

    it('initialises rssBackfillUrl from the loaded task config', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);
      expect(getField(container, 'rssBackfillUrl')?.value).toBe(
        'http://source.example.com/rss?q=base&cat=1',
      );
    });

    it('shows "No task selected" in taskConfig when no task param', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill" />);
      await wait(() => expect(getField(container, 'taskConfig')).not.toBeNull());
      expect(getField(container, 'taskConfig')?.value).toBe('No task selected');
    });

    it('auto-update checkbox is checked after config loads', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);
      const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // Task Series dropdown
  // -------------------------------------------------------------------------

  describe('Task Series dropdown', () => {
    it('appears when the config contains a series key', async () => {
      const { queryByText, container } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);
      expect(queryByText('Task Series')).toBeInTheDocument();
    });

    it('shows a disabled Select with placeholder text when the config has no series key', async () => {
      fetchMock.restore().get('/api/tasks', []).get('/api/tasks/no-series-task', {
        config: { rss: 'http://x.com' },
        name: 'no-series-task',
      }).catch();
      const { queryByText, container } = renderWithWrapper(
        <TestBackfill path="/backfill?task=no-series-task" />,
      );
      await wait(() => {
        const el = getField(container, 'taskConfig');
        expect(el?.value).toContain('no-series-task');
      }, { timeout: 8000 });
      expect(queryByText('No series found in Source Task Config')).toBeInTheDocument();
      // The InputBase wrapping the Task Series Select should carry the Mui-disabled class
      const seriesSelectRoot = container.querySelectorAll('.MuiSelect-root')[TASK_SERIES_SELECT_INDEX];
      expect(seriesSelectRoot.closest('.MuiInputBase-root')).toHaveClass('Mui-disabled');
      expect(getField(container, 'extras')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Auto-update: Backfill Task Name
  // -------------------------------------------------------------------------

  describe('Auto-update: Backfill Task Name', () => {
    it('does NOT update taskName when auto-update is unchecked', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // Uncheck auto-update (starts checked after config loads)
      fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[0] as HTMLElement);
      await pickSeriesOption(container, 'Breaking Bad');

      expect(getField(container, 'taskName')?.value).toBe('test-task-backfill');
    });

    it('updates taskName when auto-update is checked before series selection', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // auto-update checkbox is already checked after config loads
      await pickSeriesOption(container, 'Breaking Bad');

      await wait(() =>
        expect(getField(container, 'taskName')?.value).toBe('test-task-breaking-bad-backfill'),
      );
    });

    it('updates taskName immediately when auto-update is checked after series already selected', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // Uncheck so picking series does not immediately update taskName
      fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[0] as HTMLElement);
      await pickSeriesOption(container, 'The Wire');
      // Recheck — should immediately update taskName with the already-selected series
      fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[0] as HTMLElement);

      await wait(() =>
        expect(getField(container, 'taskName')?.value).toBe('test-task-the-wire-backfill'),
      );
    });

    it('does not update taskName when auto-update is toggled off with no series selected', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // Click to uncheck (starts checked after config loads); no series selected — taskName unchanged
      const checkbox = container.querySelectorAll('input[type="checkbox"]')[0] as HTMLInputElement;
      fireEvent.click(checkbox);

      expect(getField(container, 'taskName')?.value).toBe('test-task-backfill');
    });

    it('updates taskName to extras-only when auto-update is on with no series selected', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // auto-update checkbox is already checked after config loads
      fireEvent.change(getField(container, 'extras')!, { target: { value: 'S01' } });

      await wait(() =>
        expect(getField(container, 'taskName')?.value).toBe('test-task-s01-backfill'),
      );
    });

    it('updates taskName when extras changes while auto-update is on and series is already selected', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // auto-update checkbox is already checked after config loads
      await pickSeriesOption(container, 'Breaking Bad');
      await wait(() =>
        expect(getField(container, 'taskName')?.value).toBe('test-task-breaking-bad-backfill'),
      );

      fireEvent.change(getField(container, 'extras')!, { target: { value: 'S01' } });

      await wait(() =>
        expect(getField(container, 'taskName')?.value).toBe('test-task-breaking-bad-s01-backfill'),
      );
    });

    it('updates taskName immediately when auto-update is toggled on after both series and extras are already set', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // Uncheck auto-update first so picking series/extras does not immediately update taskName
      fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[0] as HTMLElement);

      await pickSeriesOption(container, 'Breaking Bad');
      fireEvent.change(getField(container, 'extras')!, { target: { value: 'S01' } });

      // Auto-update was off during both inputs — task name should still be the default
      expect(getField(container, 'taskName')?.value).toBe('test-task-backfill');

      fireEvent.click(container.querySelectorAll('input[type="checkbox"]')[0] as HTMLElement);

      await wait(() =>
        expect(getField(container, 'taskName')?.value).toBe('test-task-breaking-bad-s01-backfill'),
      );
    });
  });

  // -------------------------------------------------------------------------
  // Auto-update: RSS URL
  // -------------------------------------------------------------------------

  describe('Auto-update: RSS URL', () => {
    it('shows a snackbar when the disabled auto-update area is clicked', async () => {
      const { container, queryByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      // The auto-update Box for RSS is the second checkbox row; click its container
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      const rssCheckboxContainer = checkboxes[1]?.closest('[role]') ?? checkboxes[1]?.parentElement?.parentElement;
      if (rssCheckboxContainer) {
        fireEvent.click(rssCheckboxContainer as HTMLElement);
      }

      await wait(() =>
        expect(queryByText(/Please select the Query Param/)).toBeInTheDocument(),
      );
    });

    it('updates rssBackfillUrl when the selected query param is changed', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      await pickSelectOption(container, QUERY_PARAM_SELECT_INDEX, 'q');
      await pickSeriesOption(container, 'Breaking Bad');
      await wait(() =>
        expect(getField(container, 'rssBackfillUrl')?.value).toContain('q=base+Breaking+Bad'),
      );

      // Switch param from 'q' to 'cat' — series should move to the new param
      await pickSelectOption(container, QUERY_PARAM_SELECT_INDEX, 'cat');
      await wait(() => {
        const url = getField(container, 'rssBackfillUrl')?.value ?? '';
        expect(url).toContain('cat=1+Breaking+Bad');
        expect(url).not.toContain('q=base+Breaking+Bad');
      });
    });

    it('updates rssBackfillUrl immediately when query param is selected after series is already set', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // Pick series first — encodedSeriesName is now populated
      await pickSeriesOption(container, 'Breaking Bad');

      // Now select the query param — auto-update checkbox checks itself and
      // should immediately update rssBackfillUrl using the already-set series
      await pickSelectOption(container, QUERY_PARAM_SELECT_INDEX, 'q');

      await wait(() =>
        expect(getField(container, 'rssBackfillUrl')?.value).toContain('q=base+Breaking+Bad'),
      );
    });

    it('updates rssBackfillUrl to reflect combined series and extras when auto-update is enabled', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      // Pick query param 'q' — auto-update checkbox is checked automatically on first selection
      await pickSelectOption(container, QUERY_PARAM_SELECT_INDEX, 'q');

      // Select a series — encodedSeriesName becomes 'Breaking+Bad'
      await pickSeriesOption(container, 'Breaking Bad');
      await wait(() =>
        expect(getField(container, 'rssBackfillUrl')?.value).toContain('q=base+Breaking+Bad'),
      );

      // Type extras — encodedSeriesName becomes 'Breaking+Bad-S01'
      fireEvent.change(getField(container, 'extras')!, { target: { value: 'S01' } });
      await wait(() =>
        expect(getField(container, 'rssBackfillUrl')?.value).toContain('q=base+Breaking+Bad-S01'),
      );
    });
  });

  // -------------------------------------------------------------------------
  // Backfill Task Config auto-computation
  // -------------------------------------------------------------------------

  describe('Backfill Task Config auto-computation', () => {
    it('reflects updated rssBackfillUrl in backfillTaskConfig', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://new.example.com/rss' },
      });

      await wait(() => {
        const config = getField(container, 'backfillTaskConfig')?.value ?? '';
        expect(config).toContain('http://new.example.com/rss');
      });
    });

    it('reflects updated taskName in backfillTaskConfig', async () => {
      const { container } = renderWithWrapper(<TestBackfill path="/backfill?task=test-task" />);
      await waitForConfig(container);

      fireEvent.change(getField(container, 'taskName')!, {
        target: { value: 'custom-task-name' },
      });

      await wait(() => {
        const config = getField(container, 'backfillTaskConfig')?.value ?? '';
        expect(config).toContain('custom-task-name');
      });
    });
  });

  // -------------------------------------------------------------------------
  // Form validation
  // -------------------------------------------------------------------------

  describe('form validation', () => {
    it('does not call createTask when required fields are missing', async () => {
      fetchMock.restore().get('/api/tasks', []).get('/api/tasks/test-task', taskConfig).catch();
      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill" />,
      );
      await wait(() => expect(getField(container, 'taskConfig')).not.toBeNull());

      const button = getByText('Backfill').closest('button')!;
      fireEvent.click(button);

      await wait(() => {
        expect(fetchMock.called('/api/tasks', { method: 'post' })).toBe(false);
      });
    });
  });

  // -------------------------------------------------------------------------
  // Submit: happy path (order-of-actions)
  // -------------------------------------------------------------------------

  describe('submit: happy path', () => {
    it('calls create, execute, and delete APIs in order and logs each step', async () => {
      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });

      fireEvent.click(getByText('Backfill').closest('button')!);

      await wait(() => {
        const log = getField(container, 'executionLog')?.value ?? '';
        expect(log).toContain("Creating task 'test-task-backfill'...");
        expect(log).toContain("Task 'test-task-backfill' created.");
        expect(log).toContain("Executing task 'test-task-backfill'...");
      });

      expect(mockConnect).toHaveBeenCalledWith(
        expect.objectContaining({ tasks: ['test-task-backfill'] }),
      );

      // Simulate stream completion
      act(() => { capturedDoneCallback?.(); });

      await wait(() => {
        const log = getField(container, 'executionLog')?.value ?? '';
        expect(log).toContain("Deleting task 'test-task-backfill'...");
        expect(log).toContain("Task 'test-task-backfill' deleted.");
      });
    });

    it('passes the correct config body to createTask', async () => {
      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);

      await wait(() => expect(fetchMock.called('/api/tasks', { method: 'post' })).toBe(true));

      const createCalls = fetchMock
        .calls()
        .filter(([url, opts]) => url === '/api/tasks' && (opts as RequestInit)?.method === 'post');
      const body = JSON.parse((createCalls[0][1] as RequestInit).body as string);
      expect(body.name).toBe('test-task-backfill');
      expect(body.config.rss.url).toBe('http://backfill.example.com/rss');
    });

    it('appends progress events to the execution log', async () => {
      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);
      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);
      await wait(() => expect(getField(container, 'executionLog')?.value).toContain("Executing"));

      act(() => {
        capturedNodeHandlers['{progress}']?.({
          progress: { phase: 'input', plugin: 'rss' },
        });
      });

      await wait(() => {
        expect(getField(container, 'executionLog')?.value).toContain('[input] rss');
      });
    });

    it('appends a non-aborted summary to the execution log', async () => {
      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);
      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);
      await wait(() => expect(getField(container, 'executionLog')?.value).toContain("Executing"));

      act(() => {
        capturedNodeHandlers['{summary}']?.({
          summary: { aborted: false, accepted: 3, rejected: 1, failed: 0 },
        });
      });

      await wait(() => {
        expect(getField(container, 'executionLog')?.value).toContain(
          'Summary: 3 accepted, 1 rejected, 0 failed',
        );
      });
    });

    it('appends an aborted summary to the execution log', async () => {
      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);
      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);
      await wait(() => expect(getField(container, 'executionLog')?.value).toContain("Executing"));

      act(() => {
        capturedNodeHandlers['{summary}']?.({
          summary: { aborted: true, abortReason: 'task failed to start' },
        });
      });

      await wait(() => {
        expect(getField(container, 'executionLog')?.value).toContain(
          'Aborted: task failed to start',
        );
      });
    });
  });

  // -------------------------------------------------------------------------
  // Submit: custom task name deletion fix
  // -------------------------------------------------------------------------

  describe('submit: custom task name is used for deletion', () => {
    it('deletes using the edited taskName, not the default', async () => {
      fetchMock
        .restore()
        .get('/api/tasks', [])
        .get('/api/tasks/test-task', taskConfig)
        .post('/api/tasks', 200)
        .delete('/api/tasks/custom-name', 204)
        .catch();

      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      fireEvent.change(getField(container, 'taskName')!, {
        target: { value: 'custom-name' },
      });
      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);

      await wait(() => expect(getField(container, 'executionLog')?.value).toContain("Executing task 'custom-name'..."));

      act(() => { capturedDoneCallback?.(); });

      await wait(() => {
        const log = getField(container, 'executionLog')?.value ?? '';
        expect(log).toContain("Deleting task 'custom-name'...");
        expect(log).toContain("Task 'custom-name' deleted.");
        expect(fetchMock.called('/api/tasks/custom-name', { method: 'delete' })).toBe(true);
        expect(fetchMock.called('/api/tasks/test-task-backfill', { method: 'delete' })).toBe(false);
      });
    });
  });

  // -------------------------------------------------------------------------
  // Submit: error handling
  // -------------------------------------------------------------------------

  describe('submit: error handling', () => {
    it('logs the error and does not connect when createTask fails', async () => {
      fetchMock
        .restore()
        .get('/api/tasks', [])
        .get('/api/tasks/test-task', taskConfig)
        .post('/api/tasks', { status: 409, body: { message: 'Conflict' } })
        .catch();

      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);

      await wait(() => {
        const log = getField(container, 'executionLog')?.value ?? '';
        expect(log).toContain('Error creating task:');
      });

      expect(mockConnect).not.toHaveBeenCalled();
    });

    it('logs "Unknown error" when createTask response carries no message', async () => {
      jest.spyOn(backfillHooks, 'useCreateTask').mockReturnValue([
        { loading: false },
        jest.fn().mockResolvedValue({ ok: false, error: undefined }),
      ] as any);

      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);

      await wait(() => {
        expect(getField(container, 'executionLog')?.value).toContain('Unknown error');
      });
    });

    it('logs "Task execution failed." and still calls deleteTask when stream fails', async () => {
      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);

      await wait(() => expect(getField(container, 'executionLog')?.value).toContain("Executing"));

      act(() => { capturedFailCallback?.(); });

      await wait(() => {
        const log = getField(container, 'executionLog')?.value ?? '';
        expect(log).toContain('Task execution failed.');
        expect(fetchMock.called('/api/tasks/test-task-backfill', { method: 'delete' })).toBe(true);
      });
    });

    it('logs a delete error when deleteTask fails', async () => {
      fetchMock
        .restore()
        .get('/api/tasks', [])
        .get('/api/tasks/test-task', taskConfig)
        .post('/api/tasks', 200)
        .delete('/api/tasks/test-task-backfill', { status: 404, body: { message: 'Not Found' } })
        .catch();

      const { container, getByText } = renderWithWrapper(
        <TestBackfill path="/backfill?task=test-task" />,
      );
      await waitForConfig(container);

      fireEvent.change(getField(container, 'rssBackfillUrl')!, {
        target: { value: 'http://backfill.example.com/rss' },
      });
      fireEvent.click(getByText('Backfill').closest('button')!);

      await wait(() => expect(getField(container, 'executionLog')?.value).toContain("Executing"));

      act(() => { capturedDoneCallback?.(); });

      await wait(() => {
        expect(getField(container, 'executionLog')?.value).toContain('Error deleting task:');
      });
    });
  });
});
