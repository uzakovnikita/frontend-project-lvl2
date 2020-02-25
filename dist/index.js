"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (firstConfig, secondConfig) => {
  const firstData = (0, _fs.readFileSync)(firstConfig, {
    encoding: 'utf-8'
  }, function (err, data) {
    if (err) {
      return err;
    } else {
      return JSON.parse(data);
    }
  });
  const secondData = (0, _fs.readFileSync)(secondConfig, {
    encoding: 'utf-8'
  }, function (err, data) {
    if (err) {
      return err;
    } else {
      return JSON.parse(data);
    }
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJmaXJzdENvbmZpZyIsInNlY29uZENvbmZpZyIsImZpcnN0RGF0YSIsImVuY29kaW5nIiwiZXJyIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInNlY29uZERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztlQUNlLENBQUNBLFdBQUQsRUFBY0MsWUFBZCxLQUErQjtBQUMxQyxRQUFNQyxTQUFTLEdBQUcsc0JBQWFGLFdBQWIsRUFBMEI7QUFBQ0csSUFBQUEsUUFBUSxFQUFFO0FBQVgsR0FBMUIsRUFBK0MsVUFBU0MsR0FBVCxFQUFjQyxJQUFkLEVBQW9CO0FBQ2pGLFFBQUlELEdBQUosRUFBUztBQUNMLGFBQU9BLEdBQVA7QUFDSCxLQUZELE1BRU87QUFDSixhQUFPRSxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsSUFBWCxDQUFQO0FBQ0Y7QUFDSixHQU5pQixDQUFsQjtBQU9BLFFBQU1HLFVBQVUsR0FBRyxzQkFBYVAsWUFBYixFQUEyQjtBQUFDRSxJQUFBQSxRQUFRLEVBQUU7QUFBWCxHQUEzQixFQUFnRCxVQUFTQyxHQUFULEVBQWNDLElBQWQsRUFBb0I7QUFDbkYsUUFBSUQsR0FBSixFQUFTO0FBQ0wsYUFBT0EsR0FBUDtBQUNILEtBRkQsTUFFTztBQUNKLGFBQU9FLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixJQUFYLENBQVA7QUFDRjtBQUNKLEdBTmtCLENBQW5CO0FBUUgsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2Rhc2ggZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9ICBmcm9tICdmcyc7XG5leHBvcnQgZGVmYXVsdCAoZmlyc3RDb25maWcsIHNlY29uZENvbmZpZykgPT4ge1xuICAgIGNvbnN0IGZpcnN0RGF0YSA9IHJlYWRGaWxlU3luYyhmaXJzdENvbmZpZywge2VuY29kaW5nOiAndXRmLTgnfSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBjb25zdCBzZWNvbmREYXRhID0gcmVhZEZpbGVTeW5jKHNlY29uZENvbmZpZywge2VuY29kaW5nOiAndXRmLTgnfSwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgfSlcblxufSJdfQ==