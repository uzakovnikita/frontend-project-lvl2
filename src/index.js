import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve, extname } from 'path';
import parse from './parser';
import diff from './diff';
import format from './formatters';

export default (firstPath, secondPath, form) => {
  const currentDirectory = cwd();
  const firstAbsolutePath = resolve(currentDirectory, firstPath);
  const secondAbsolutePath = resolve(currentDirectory, secondPath);
  const firstType = extname(firstAbsolutePath).replace(/[.]/g, '').trim();
  const secondType = extname(secondAbsolutePath).replace(/[.]/g, '').trim();
  const firstDataBeforeParsing = readFileSync(firstAbsolutePath, 'utf-8');
  const secondDataBeforeParsing = readFileSync(secondAbsolutePath, 'utf-8');
  const firstData = parse(firstDataBeforeParsing, firstType);
  const secondData = parse(secondDataBeforeParsing, secondType);
  const difference = diff(firstData, secondData);
  const result = format(form, difference);
  return result;
};
