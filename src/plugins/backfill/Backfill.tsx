import React, { FC, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, useFormikContext } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Theme,
  TextField as MuiTextField,
  Snackbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { DragHandle, ExpandLess, ExpandMore } from '@material-ui/icons';
import { css } from '@emotion/core';
import YAML from 'yaml';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { useFlexgetStream } from 'core/api';
import { Method, camelize } from 'utils/fetch';
import TextField from 'common/inputs/formik/TextField';
import { useGetTaskConfig, useCreateTask, useDeleteTask } from './hooks';
import { FormValues } from './types';
import {
  replaceRssUrl,
  replaceTaskName,
  extractRssUrl,
  extractTaskName,
  extractSeriesNames,
  appendToQueryParam,
  extractQueryParamNames,
  buildEncodedSeriesName,
  buildAutoTaskName,
  validate,
} from './utils';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const wrapper = (theme: Theme) => css`
  margin: ${theme.typography.pxToRem(theme.spacing(2))};
  padding: ${theme.typography.pxToRem(theme.spacing(3))};
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: ${theme.typography.pxToRem(theme.spacing(3))};
  row-gap: ${theme.typography.pxToRem(theme.spacing(3))};
  align-items: start;

  .MuiOutlinedInput-multiline {
    padding: 12px 14px;
  }
  .MuiOutlinedInput-input:not(.MuiOutlinedInput-inputMultiline) {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const formLabel = (theme: Theme) => css`
  white-space: nowrap;
  color: ${theme.palette.text.secondary};
  font-size: ${theme.typography.body1.fontSize};
  line-height: 1.5;
  padding-top: ${theme.typography.pxToRem(11)};
`;

const inputRow = (theme: Theme) => css`
  display: flex;
  align-items: flex-start;
  gap: ${theme.typography.pxToRem(theme.spacing(2))};
`;

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

// Returns true on exactly the one render where `value` first becomes non-empty.
const useFirstPopulation = (value: string): boolean => {
  const prevRef = useRef('');
  const isFirst = !prevRef.current && !!value;
  prevRef.current = value;
  return isFirst;
};

// Floating label above an input control, used in the horizontal input rows.
interface LabeledBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'css'> {
  label: string;
}
const LabeledBox: FC<LabeledBoxProps> = ({ label, style, children, ...rest }) => (
  <Box position="relative" style={{ flexShrink: 0, ...style }} {...rest}>
    <Typography
      variant="caption"
      color="textSecondary"
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Typography>
    {children}
  </Box>
);

// One row of the two-column label/content grid.
const FormRow: FC<{ label: React.ReactNode; spacing?: boolean }> = ({ label, children, spacing }) => (
  <>
    <div css={formLabel} style={spacing ? { marginTop: 16 } : undefined}>{label}</div>
    <div style={spacing ? { marginTop: 16 } : undefined}>{children}</div>
  </>
);

// ---------------------------------------------------------------------------
// Resize hook + handle
// ---------------------------------------------------------------------------

const useTextareaResize = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [dragHeight, setDragHeight] = useState<number | undefined>(undefined);

  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = inputRef.current?.clientHeight ?? 80;
    const onMove = (ev: MouseEvent) => {
      setDragHeight(Math.max(startH + ev.clientY - startY, 36));
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  const resetDragHeight = useCallback(() => setDragHeight(undefined), []);

  return { inputRef, dragHeight, onResizeMouseDown, resetDragHeight };
};

const ResizeHandle: FC<{ onMouseDown: (e: React.MouseEvent) => void }> = ({ onMouseDown }) => (
  <Box
    onMouseDown={onMouseDown}
    style={{
      position: 'absolute',
      bottom: 4,
      right: 4,
      cursor: 'ns-resize',
      color: 'rgba(0,0,0,0.3)',
      display: 'flex',
      userSelect: 'none',
      lineHeight: 0,
    }}
  >
    <DragHandle fontSize="small" />
  </Box>
);

// ---------------------------------------------------------------------------
// ExpandableTextarea — shared by Source Task Config and Backfill Task Config
// ---------------------------------------------------------------------------

interface ExpandableTextareaProps {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExpandableTextarea: FC<ExpandableTextareaProps> = ({ label, name, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const { inputRef, dragHeight, onResizeMouseDown, resetDragHeight } = useTextareaResize();

  return (
    <FormRow
      label={
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {label}
          <IconButton size="small" onClick={() => { setExpanded(v => !v); resetDragHeight(); }}>
            {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </IconButton>
        </span>
      }
    >
      <Box position="relative">
        <TextField
          name={name}
          variant="outlined"
          fullWidth
          multiline
          rows={expanded ? 6 : 1}
          inputRef={inputRef}
          InputProps={dragHeight !== undefined ? { style: { height: dragHeight } } : undefined}
          inputProps={dragHeight !== undefined ? { style: { height: '100%', overflow: 'auto' } } : undefined}
          onChange={onChange}
        />
        {expanded && <ResizeHandle onMouseDown={onResizeMouseDown} />}
      </Box>
    </FormRow>
  );
};

// ---------------------------------------------------------------------------
// Form field components
// ---------------------------------------------------------------------------

const SourceTaskConfigField: FC = () => {
  const { handleChange, setFieldValue } = useFormikContext<FormValues>();
  return (
    <ExpandableTextarea
      label="Source Task Config"
      name="taskConfig"
      onChange={e => {
        handleChange(e);
        setFieldValue('sourceBackfillUrl', extractRssUrl(e.target.value));
        setFieldValue('sourceTaskName', extractTaskName(e.target.value));
      }}
    />
  );
};

const BackfillTaskConfigField: FC = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  useEffect(() => {
    const withRss = replaceRssUrl(values.taskConfig, values.rssBackfillUrl);
    setFieldValue('backfillTaskConfig', replaceTaskName(withRss, values.taskName));
  }, [values.taskConfig, values.rssBackfillUrl, values.taskName, setFieldValue]);
  return <ExpandableTextarea label="Backfill Task Config" name="backfillTaskConfig" />;
};

const TaskSeriesField: FC = () => {
  const { values, setFieldValue, handleChange } = useFormikContext<FormValues>();
  const seriesNames = extractSeriesNames(values.taskConfig).sort((a, b) => a.localeCompare(b));
  const isFirstSourceTaskName = useFirstPopulation(values.sourceTaskName);

  useEffect(() => {
    if (!values.sourceTaskName) return;
    setFieldValue(
      'taskName',
      buildAutoTaskName(
        values.sourceTaskName,
        values.autoUpdateTaskName ? values.selectedSeries : '',
        values.autoUpdateTaskName ? values.extras : '',
      ),
    );
    if (isFirstSourceTaskName) {
      setFieldValue('autoUpdateTaskName', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.sourceTaskName]);

  const handleSeriesChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    setFieldValue('selectedSeries', value);
    if (values.autoUpdateTaskName) {
      setFieldValue('taskName', buildAutoTaskName(values.sourceTaskName, value, values.extras));
    }
  };

  return (
    <FormRow label="Task Series">
      <div css={inputRow}>
        <Box flex={1}>
          <FormControl variant="outlined" fullWidth>
            <Select
              value={values.selectedSeries}
              displayEmpty
              disabled={seriesNames.length === 0}
              renderValue={v =>
                (v as string) ||
                (seriesNames.length === 0
                  ? 'No series found in Source Task Config'
                  : 'Optional: Select Task Series to Backfill')
              }
              onChange={handleSeriesChange}
            >
              {seriesNames.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <LabeledBox label="Extra Query Params" style={{ flexBasis: '40%' }}>
          <TextField
            name="extras"
            variant="outlined"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              if (values.autoUpdateTaskName) {
                setFieldValue('taskName', buildAutoTaskName(values.sourceTaskName, values.selectedSeries, e.target.value));
              }
            }}
          />
        </LabeledBox>
      </div>
    </FormRow>
  );
};

const BackfillTaskNameRow: FC = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const handleAutoUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFieldValue('autoUpdateTaskName', checked);
    if (checked && (values.selectedSeries || values.extras)) {
      setFieldValue('taskName', buildAutoTaskName(values.sourceTaskName, values.selectedSeries, values.extras));
    }
  };

  return (
    <FormRow label="Backfill Task Name" spacing>
      <div css={inputRow}>
        <Box flex={1}>
          <TextField name="taskName" variant="outlined" fullWidth />
        </Box>
        <Tooltip title="Automatically update the 'Backfill Task Name' with the chosen 'Task Series' value">
          <LabeledBox label="Auto update">
            <Checkbox
              checked={values.autoUpdateTaskName}
              disabled={!values.sourceTaskName}
              onChange={handleAutoUpdateChange}
            />
          </LabeledBox>
        </Tooltip>
      </div>
    </FormRow>
  );
};

const RssBackfillUrlField: FC = () => {
  const { handleChange, setFieldValue, values } = useFormikContext<FormValues>();
  const [selectedParam, setSelectedParam] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [disabledSnackOpen, setDisabledSnackOpen] = useState(false);
  const paramNames = extractQueryParamNames(values.rssBackfillUrl);
  const encodedSeriesName = buildEncodedSeriesName(values.selectedSeries, values.extras);
  const isFirstParamSelection = useFirstPopulation(selectedParam);

  useEffect(() => {
    if (!autoUpdate || !selectedParam || !encodedSeriesName) return;
    setFieldValue('rssBackfillUrl', appendToQueryParam(values.sourceBackfillUrl, selectedParam, encodedSeriesName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.selectedSeries, values.extras]);

  useEffect(() => {
    if (autoUpdate && selectedParam && encodedSeriesName) {
      setFieldValue('rssBackfillUrl', appendToQueryParam(values.sourceBackfillUrl, selectedParam, encodedSeriesName));
    } else {
      setFieldValue('rssBackfillUrl', values.sourceBackfillUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.sourceBackfillUrl]);

  useEffect(() => {
    if (isFirstParamSelection) {
      setAutoUpdate(true);
    }
    if ((isFirstParamSelection || autoUpdate) && selectedParam && encodedSeriesName) {
      setFieldValue('rssBackfillUrl', appendToQueryParam(values.sourceBackfillUrl, selectedParam, encodedSeriesName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedParam]);

  const handleAutoUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAutoUpdate(checked);
    if (checked && selectedParam && encodedSeriesName) {
      setFieldValue('rssBackfillUrl', appendToQueryParam(values.sourceBackfillUrl, selectedParam, encodedSeriesName));
    }
  };

  return (
    <FormRow label="Backfill RSS URL" spacing>
      <>
        <div css={inputRow}>
          <Box flex={1}>
            <TextField
              name="rssBackfillUrl"
              variant="outlined"
              fullWidth
              helperText="The RSS feed URL containing the episodes to backfill"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
          </Box>
          <LabeledBox label="Query Param" style={{ minWidth: 150 }}>
            <FormControl variant="outlined" fullWidth>
              <Select
                value={selectedParam}
                displayEmpty
                disabled={paramNames.length === 0}
                renderValue={v => paramNames.length === 0 ? 'No Params' : (v as string) || 'Not set'}
                onChange={e => setSelectedParam(e.target.value as string)}
              >
                {paramNames.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </LabeledBox>
          <Tooltip title="Automatically update the 'Backfill RSS URL's 'Query Param' with the chosen 'Task Series' value">
            <LabeledBox
              label="Auto update"
              onClick={!selectedParam ? () => setDisabledSnackOpen(true) : undefined}
            >
              <Checkbox
                checked={autoUpdate}
                disabled={!selectedParam}
                onChange={handleAutoUpdateChange}
              />
            </LabeledBox>
          </Tooltip>
        </div>
        <Snackbar
          open={disabledSnackOpen}
          autoHideDuration={4000}
          onClose={() => setDisabledSnackOpen(false)}
          message="Please select the Query Param that will be updated, to enable automatic updating"
        />
      </>
    </FormRow>
  );
};

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

const Backfill: FC = () => {
  const taskParam = new URLSearchParams(useLocation().search).get('task');
  useInjectPageTitle(`Backfill Task: ${taskParam ?? 'Unknown'}`);

  const taskName = taskParam ? `${taskParam}-backfill` : '';
  const { config: taskConfig } = useGetTaskConfig(taskParam ?? '');
  const [executionLog, setExecutionLog] = useState(' ');
  const pendingDelete = useRef(false);
  const logRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [executionLog]);

  const [deleteTaskName, setDeleteTaskName] = useState(taskName);
  const [, createTask] = useCreateTask();
  const [, deleteTask] = useDeleteTask(deleteTaskName);
  const [{ stream }, { connect }] = useFlexgetStream('/tasks/execute', Method.Post);

  const appendLog = useCallback((line: string) => {
    setExecutionLog(prev => `${prev}${line}\n`);
  }, []);

  const runDelete = useCallback(() => {
    appendLog(`Deleting task '${deleteTaskName}'...`);
    deleteTask().then(resp => {
      appendLog(
        resp.ok
          ? `Task '${deleteTaskName}' deleted.`
          : `Error deleting task: ${resp.error?.message ?? 'Unknown error'}`,
      );
    });
  }, [appendLog, deleteTask, deleteTaskName]);

  const runDeleteRef = useRef(runDelete);
  useEffect(() => {
    runDeleteRef.current = runDelete;
  }, [runDelete]);

  useEffect(() => {
    if (!stream) return;
    stream
      .node('{progress}', (e: any) => {
        const ev = camelize<any>(e) as any;
        appendLog(`[${ev.progress.phase}] ${ev.progress.plugin}`);
      })
      .node('{summary}', (e: any) => {
        const ev = camelize<any>(e) as any;
        if (ev.summary.aborted) {
          appendLog(`Aborted: ${ev.summary.abortReason ?? 'unknown reason'}`);
        } else {
          appendLog(
            `Summary: ${ev.summary.accepted} accepted, ${ev.summary.rejected} rejected, ${ev.summary.failed} failed`,
          );
        }
      })
      .done(() => {
        if (!pendingDelete.current) return;
        pendingDelete.current = false;
        runDeleteRef.current();
      })
      .fail(() => {
        if (!pendingDelete.current) return;
        pendingDelete.current = false;
        appendLog('Task execution failed.');
        runDeleteRef.current();
      });
  }, [stream, appendLog]);

  const initialValues: FormValues = {
    taskName,
    autoUpdateTaskName: false,
    rssBackfillUrl: taskParam ? extractRssUrl(taskConfig) : '',
    sourceBackfillUrl: taskParam ? extractRssUrl(taskConfig) : '',
    taskConfig: taskParam ? taskConfig : 'No task selected',
    selectedSeries: '',
    backfillTaskConfig: '',
    extras: '',
    sourceTaskName: taskParam ? extractTaskName(taskConfig) : '',
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={validate}
      onSubmit={async values => {
        setExecutionLog('');
        setDeleteTaskName(values.taskName);
        const updatedParsed = YAML.parse(values.backfillTaskConfig);

        appendLog(`Creating task '${values.taskName}'...`);
        const createResp = await createTask(
          values.taskName,
          updatedParsed.config ?? updatedParsed,
        );
        if (!createResp.ok) {
          appendLog(`Error creating task: ${createResp.error?.message ?? 'Unknown error'}`);
          return;
        }
        appendLog(`Task '${values.taskName}' created.`);
        appendLog(`Executing task '${values.taskName}'...`);
        pendingDelete.current = true;
        connect({ tasks: [values.taskName], progress: true, summary: true });
      }}
    >
      <Form>
        <Paper css={wrapper}>
          <SourceTaskConfigField />
          <Field type="hidden" name="sourceTaskName" />
          <BackfillTaskNameRow />
          <Field type="hidden" name="sourceBackfillUrl" />
          <RssBackfillUrlField />
          <TaskSeriesField />
          <BackfillTaskConfigField />
          <FormRow label="">
            <Button type="submit" variant="contained" color="primary">
              Backfill
            </Button>
          </FormRow>
          <FormRow label="Execution log">
            <MuiTextField
              value={executionLog}
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              inputProps={{ readOnly: true, name: 'executionLog' }}
              inputRef={logRef}
            />
          </FormRow>
        </Paper>
      </Form>
    </Formik>
  );
};

export default Backfill;
