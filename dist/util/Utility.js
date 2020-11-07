"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
const fs_1 = __importDefault(require("fs"));
class Utility {
    static replaceTemplate(filePath, replacement) {
        try {
            let content = fs_1.default.readFileSync(filePath, { encoding: "utf8" });
            replacement.forEach((_, i) => {
                content = content.replace(new RegExp("\\{" + (i + 1) + "\\}", "g"), _);
            });
            fs_1.default.writeFileSync(filePath, content, { encoding: "utf8" });
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
    static getModuleNameInFormat(name, format, postfix = "") {
        const replaceHyphen = (name, alwaysPascal) => {
            return name
                .split("-")
                .map((_, index) => alwaysPascal || index > 0
                ? _.substr(0, 1).toUpperCase() + _.slice(1)
                : _)
                .join("");
        };
        const splitModuleName = name.split("/");
        const moduleName = splitModuleName[splitModuleName.length - 1];
        const camelNameWithoutPostfix = replaceHyphen(moduleName, false);
        if (format === "pascal") {
            return (camelNameWithoutPostfix.charAt(0).toUpperCase() +
                camelNameWithoutPostfix.slice(1) +
                postfix);
        }
        else {
            return camelNameWithoutPostfix + postfix;
        }
    }
}
exports.Utility = Utility;
