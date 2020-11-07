#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
const yargs_1 = __importDefault(require("yargs"));
const new_1 = require("./new");
const moduleCommand_1 = require("./moduleCommand");
class CommandLoader {
    static init() {
        new_1.NewClass.load(yargs_1.default);
        moduleCommand_1.ModuleCommand.load(yargs_1.default);
        return yargs_1.default;
    }
}
exports.CommandLoader = CommandLoader;
