import { randomUtil } from './random-util';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

describe('randomUtil', () => {
  it('should return a valid UUID', () => {
    const uuid = randomUtil();

    // Validate the UUID
    expect(uuidValidate(uuid)).toBe(true);
    expect(uuidVersion(uuid)).toBe(4);
  });
});
