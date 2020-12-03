"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleType = exports.OptionAlias = exports.Option = exports.Alias = exports.Command = void 0;
var Command;
(function (Command) {
    Command["new"] = "new [projectName]";
    Command["generate"] = "generate [moduleType] [moduleName]";
})(Command = exports.Command || (exports.Command = {}));
var Alias;
(function (Alias) {
    Alias["new"] = "new [projectName]";
    Alias["generate"] = "g [moduleType] [moduleName]";
})(Alias = exports.Alias || (exports.Alias = {}));
var Option;
(function (Option) {
    Option["npm"] = "npm";
    Option["javascript"] = "javascript";
    Option["asset"] = "asset";
    Option["state"] = "state";
})(Option = exports.Option || (exports.Option = {}));
var OptionAlias;
(function (OptionAlias) {
    OptionAlias["javascript"] = "js";
    OptionAlias["asset"] = "a";
    OptionAlias["state"] = "s";
})(OptionAlias = exports.OptionAlias || (exports.OptionAlias = {}));
var ModuleType;
(function (ModuleType) {
    ModuleType["module"] = "module";
    ModuleType["component"] = "component";
    ModuleType["module-component"] = "module-component";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
