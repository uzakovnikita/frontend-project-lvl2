import { readFileSync } from 'fs';
import { diff, convertObjectTostring } from '../src';
import { resolve } from 'path';

test('diff', () => {
  const currentDirectory = __dirname;
  const firstConfig = resolve(currentDirectory, './fixtures/before.json');
  const secondConfig = resolve(currentDirectory, './fixtures/after.json');
  const equalConfig = resolve(currentDirectory, './fixtures/equal.json');
  const equal = JSON.parse((readFileSync(equalConfig)));
  expect(diff(firstConfig, secondConfig)).toEqual(equal);
});
test('convertTostring', () => {

})
