import { readFileSync } from 'fs';
import { resolve } from 'path';
import genDiff from '../src';

test('diff', () => {
  const firstConfig = resolve(__dirname, './fixtures/before.json');
  const secondConfig = resolve(__dirname, './fixtures/after.json');
  const equalConfig = resolve(__dirname, './fixtures/equal.json');
  const equal = JSON.stringify(JSON.parse((readFileSync(equalConfig))), null, 2).replace(/["']/g, '');
  const result = genDiff(firstConfig, secondConfig);
  expect(result).toBe(equal);
});
