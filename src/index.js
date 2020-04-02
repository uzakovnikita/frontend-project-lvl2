import parse from './parse';
import diff from './diff';
import render from './formatters/render';
import plain from './formatters/plain';
import json from './formatters/json';

const renderManager = {
  recursive: render,
  plain,
  json,
};

export default (firstConfig, secondConfig, format) => {
  const firstData = parse(firstConfig);
  const secondData = parse(secondConfig);
  const difference = diff(firstData, secondData);
  const result = renderManager[format](difference);
  return result;
};
