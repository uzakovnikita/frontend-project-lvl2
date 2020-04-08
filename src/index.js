import { renderManager, parser } from './formatters';
import diff from './diff';

export default (firstConfig, secondConfig, format) => {
  const firstData = parser(firstConfig);
  const secondData = parser(secondConfig);
  const difference = diff(firstData, secondData);
  const result = renderManager[format](difference);
  return result;
};
