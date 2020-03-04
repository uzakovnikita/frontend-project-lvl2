import { readFileSync } from 'fs';
import { join } from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => join(__dirname, '.', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('diff', () => {
  console.log(__dirname);
  const firstConfig = getFixturePath('before.json');
  const secondConfig = getFixturePath('after.json');
  const equal = readFile('equal.json').replace(/["']/g, '');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(equal);
});
