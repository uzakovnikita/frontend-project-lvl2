import { readFileSync } from 'fs';
import { join } from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => join(__dirname, '.', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// render tests

test('diffJSON', () => {
  const firstConfig = getFixturePath('before.json');
  const secondConfig = getFixturePath('after.json');
  const equal = readFile('equal');
  const result = genDiff(firstConfig, secondConfig, 'recursive');
  expect(result).toBe(equal);
});
test('diffINI', () => {
  const firstConfig = getFixturePath('before.ini');
  const secondConfig = getFixturePath('after.ini');
  const equal = readFile('equal');
  const result = genDiff(firstConfig, secondConfig, 'recursive');
  expect(result).toBe(equal);
});
test('diffYAML', () => {
  const firstConfig = getFixturePath('before.yml');
  const secondConfig = getFixturePath('after.yml');
  const equal = readFile('equal');
  const result = genDiff(firstConfig, secondConfig, 'recursive');
  expect(result).toBe(equal);
});

// plain tests

test('diffJSONPLAIN', () => {
  const firstConfig = getFixturePath('before.json');
  const secondConfig = getFixturePath('after.json');
  const equal = readFile('equalplain');
  const result = genDiff(firstConfig, secondConfig, 'plain');
  expect(result).toBe(equal);
});
test('diffINIPLAIN', () => {
  const firstConfig = getFixturePath('before.ini');
  const secondConfig = getFixturePath('after.ini');
  const equal = readFile('equalplain');
  const result = genDiff(firstConfig, secondConfig, 'plain');
  expect(result).toBe(equal);
});
test('diffYAMLPLAIN', () => {
  const firstConfig = getFixturePath('before.yml');
  const secondConfig = getFixturePath('after.yml');
  const equal = readFile('equalplain');
  const result = genDiff(firstConfig, secondConfig, 'plain');
  expect(result).toBe(equal);
});

// JSON tests
test('diffJSONJSON', () => {
  const firstConfig = getFixturePath('before.json');
  const secondConfig = getFixturePath('after.json');
  const result = genDiff(firstConfig, secondConfig, 'json');
  const equal = readFile('equaljson');
  expect(result).toBe(equal);
});
test('diffINIJSON', () => {
  const firstConfig = getFixturePath('before.ini');
  const secondConfig = getFixturePath('after.ini');
  const result = genDiff(firstConfig, secondConfig, 'json');
  const equal = readFile('equaljson');
  expect(result).toBe(equal);
});
test('diffYAMLJSON', () => {
  const firstConfig = getFixturePath('before.yml');
  const secondConfig = getFixturePath('after.yml');
  const result = genDiff(firstConfig, secondConfig, 'json');
  const equal = readFile('equaljson');
  expect(result).toBe(equal);
});
