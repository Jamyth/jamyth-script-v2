"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Print {
    static createConsoleLogger(title) {
        return {
            info: this.print("ℹ️ ")("blueBright")(title),
            task: this.print("🛠 ")("greenBright")(title),
            error: this.print("❌")("redBright")(title),
            process: this.processLogger,
        };
    }
    static print(emoji) {
        return (color) => (title) => (text) => {
            const body = chalk_1.default.whiteBright.bgBlack((Array.isArray(text) ? text : [text]).map((_) => _.toString()).join(" "));
            console.info("");
            console.info(chalk_1.default[color].bold(`${emoji} [${title}] `) + body);
        };
    }
    static processLogger(text) {
        const body = (Array.isArray(text) ? text : [text])
            .map((_) => _.toString())
            .join(" ");
        console.info(chalk_1.default.grey(body));
    }
}
exports.Print = Print;
