import parse from './parse';
import diff from './diff';
import render from './render';

export default (firstConfig, secondConfig) => {
  const firstData = parse(firstConfig);
  const secondData = parse(secondConfig);
  const difference = diff(firstData, secondData);
  const result = render(difference);
  console.log(result);
  return result;
};
