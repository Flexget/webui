import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Shows from './Shows';
import Episodes from './Episodes';

const Series: FC = () => (
  <Routes>
    <Route index element={<Shows />} />
    <Route path=":showId/*" element={<Episodes />} />
  </Routes>
);

export default Series;
