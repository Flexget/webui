import { random, internet, system } from 'faker';
import { GroupByFields } from 'plugins/history/types';
import { getGroupedHistory } from './utils';

const makeItem = (time: string, task: string) => ({
  time,
  task,
  title: random.words(),
  url: internet.url(),
  filename: system.fileName(),
  details: random.words(),
  id: random.number(),
});

describe('plugins/history/utils', () => {
  describe('getGroupedHistory', () => {
    const items = [
      makeItem('2017-09-10T00:21:33', 'task1'),
      makeItem('2017-09-10T12:21:33', 'task2'),
      makeItem('2017-08-10T00:21:33', 'task1'),
    ];

    it('should group properly based on time', () => {
      expect(getGroupedHistory(items, GroupByFields.Time)).toEqual({
        '2017-09-10': [items[0], items[1]],
        '2017-08-10': [items[2]],
      });
    });

    it('should group properly based on task', () => {
      expect(getGroupedHistory(items, GroupByFields.Task)).toEqual({
        task1: [items[0], items[2]],
        task2: [items[1]],
      });
    });
  });
});
