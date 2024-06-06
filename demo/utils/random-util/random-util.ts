import { v4 as uuidv4 } from 'uuid';

/**
 * returns 'hello world'
 */
export function randomUtil(): string {
  return uuidv4();
}
