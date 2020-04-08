import { readFileSync } from 'fs';
import { join } from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => join(__dirname, '.', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');


test.each([
  ['before.json', 'after.json', 'recursive', 'equal'],
  ['before.ini', 'after.ini', 'recursive', 'equal'],
  ['before.yml', 'after.yml', 'recursive', 'equal'],
  ['before.json', 'after.json', 'plain', 'equalplain'],
  ['before.ini', 'after.ini', 'plain', 'equalplain'],
  ['before.yml', 'after.yml', 'plain', 'equalplain'],
  ['before.json', 'after.json', 'json', 'equaljson'],
  ['before.ini', 'after.ini', 'json', 'equaljson'],
  ['before.yml', 'after.yml', 'json', 'equaljson'],
])('.add(%s, %s, %s, %s)', (before, after, format, expected) => {
  const firstConfig = getFixturePath(before);
  const secondConfig = getFixturePath(after);
  const equal = readFile(expected);
  const result = genDiff(firstConfig, secondConfig, format);
  expect(result).toBe(equal);
});
