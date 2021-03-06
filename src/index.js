import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve, extname } from 'path';
import parse from './parser';
import buildDiff from './buildDiff';
import toFormat from './formatters';

const readFileAndType = (filePath) => {
  const currentDirectory = cwd();
  const absolutePathe = resolve(currentDirectory, filePath);
  const type = extname(absolutePathe).slice(1);
  const data = readFileSync(absolutePathe, 'utf-8');
  return { data, type };
};

export default (firstPath, secondPath, format) => {
  const { data: firstDataBeforeParsing, type: firstType } = readFileAndType(firstPath);
  const { data: secondDataBeforeParsing, type: secondType } = readFileAndType(secondPath);
  const firstData = parse(firstDataBeforeParsing, firstType);
  const secondData = parse(secondDataBeforeParsing, secondType);
  const difference = buildDiff(firstData, secondData);
  const result = toFormat(format, difference);
  return result;
};
