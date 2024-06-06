import { dbAccess } from './db-access';

it('renders with the correct text', () => {
  expect(dbAccess()).toEqual('hello world');
});
