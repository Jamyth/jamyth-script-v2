"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewClass = void 0;
const AbstractCommand_1 = require("./AbstractCommand");
const ProjectStarter_1 = require("../actions/ProjectStarter");
const type_1 = require("../type");
const path_1 = __importDefault(require("path"));
class NewClass extends AbstractCommand_1.AbstractCommand {
    static load(yargs) {
        yargs
            .command([type_1.Command.new, type_1.Alias.new], false, () => { }, this.run)
            .option(type_1.Option.npm, { type: "boolean" })
            .option(type_1.Option.javascript, {
            alias: type_1.OptionAlias.javascript,
            type: "boolean",
        }).argv;
    }
    static run(args) {
        const { projectName, npm, js } = args;
        new ProjectStarter_1.ProjectStarter({
            projectName,
            templateDirectory: path_1.default.resolve(__dirname, "..", "..", "template", js ? "project-js" : "project"),
            useNpm: npm,
        }).run();
    }
}
exports.NewClass = NewClass;
