import { readFileSync } from 'fs';
import { join } from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => join(__dirname, '.', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('diffJSON', () => {
  const firstConfig = getFixturePath('before.json');
  const secondConfig = getFixturePath('after.json');
  const equal = readFile('equal');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(equal);
});
test('diffYAML', () => {
  const firstConfig = getFixturePath('before.yml');
  const secondConfig = getFixturePath('after.yml');
  const equal = readFile('equal');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(equal);
});
test('diffINI', () => {
  const firstConfig = getFixturePath('before.ini');
  const secondConfig = getFixturePath('after.yml');
  const equal = readFile('equal');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(equal);
});
test('diffJSONREC', () => {
  const firstConfig = getFixturePath('beforerec.json');
  const secondConfig = getFixturePath('afterrec.json');
  const equal = readFile('equalrec');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(equal);
});
