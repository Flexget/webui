import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Latest from './Latest';
import TaskExecutions from './TaskExecutions';

const Task: FC = () => (
  <Routes>
    <Route index element={<Latest />} />
    <Route path=":taskId" element={<TaskExecutions />} />
  </Routes>
);

export default Task;
