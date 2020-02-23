#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.option('-V, --version  ', 'output the version number').description('Compares two configuration files and shows a difference.'); // eslint-disable-next-line no-undef


var _default = _commander.default.parse(process.argv);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tYW5kZXIuanMiXSwibmFtZXMiOlsicHJvZ3JhbSIsIm9wdGlvbiIsImRlc2NyaXB0aW9uIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQUEsbUJBQ0tDLE1BREwsQ0FDWSxpQkFEWixFQUMrQiwyQkFEL0IsRUFFS0MsV0FGTCxDQUVpQiwwREFGakIsRSxDQUdBOzs7ZUFDZUYsbUJBQVFHLEtBQVIsQ0FBY0MsT0FBTyxDQUFDQyxJQUF0QixDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcbnByb2dyYW1cbiAgICAub3B0aW9uKCctViwgLS12ZXJzaW9uICAnLCAnb3V0cHV0IHRoZSB2ZXJzaW9uIG51bWJlcicpXG4gICAgLmRlc2NyaXB0aW9uKCdDb21wYXJlcyB0d28gY29uZmlndXJhdGlvbiBmaWxlcyBhbmQgc2hvd3MgYSBkaWZmZXJlbmNlLicpXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmV4cG9ydCBkZWZhdWx0IHByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiJdfQ==