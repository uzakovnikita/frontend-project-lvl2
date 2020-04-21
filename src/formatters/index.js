import render from './render';
import plain from './plain';
import json from './json';


const renderManager = {
  recursive: render,
  plain,
  json,
};

export default (format, differnce) => {
  if (!Reflect.has(renderManager, format)) {
    throw new Error(`Uknown format ${format}`);
  }
  return renderManager[format](differnce);
};
