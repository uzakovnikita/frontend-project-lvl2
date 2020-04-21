import render from './render';
import plain from './plain';


const renderManager = {
  recursive: render,
  plain,
  json: JSON.stringify,
};

export default (format, differnce) => {
  if (!Reflect.has(renderManager, format)) {
    throw new Error(`Uknown format ${format}`);
  }
  return renderManager[format](differnce);
};
