import recursive from './recursive';
import plain from './plain';


const renderManager = {
  recursive,
  plain,
  json: JSON.stringify,
};

export default (format, differnce) => {
  if (!Reflect.has(renderManager, format)) {
    throw new Error(`Uknown format ${format}`);
  }
  return renderManager[format](differnce);
};
