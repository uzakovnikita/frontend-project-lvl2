import { dirname } from 'path';
import genDiff from '../src';

test('gendiff', () => {
  const currentDirectory = dirname;
  const firstConfig = currentDirectory.concat('fixtures/before.json');
  const secondConfig = currentDirectory.concat('fixtures/after.json');
  const equal = `{
        host: hexlet.io
      + timeout: 20
      - timeout: 50
      - proxy: 123.234.53.22
      + verbose: true
      - follow: false 
    }`;
  expect(genDiff(firstConfig, secondConfig)).toEqual(equal);
});