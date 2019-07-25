import { createSerializer as createEnzymeSerializer } from 'enzyme-to-json';
import { createSerializer } from 'jest-emotion';

expect.addSnapshotSerializer(createEnzymeSerializer());
expect.addSnapshotSerializer(createSerializer());
