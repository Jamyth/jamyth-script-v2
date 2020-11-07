#!/usr/bin/env node
import yargs from "yargs";
import { NewClass } from "./new";
import { ModuleCommand } from "./moduleCommand";

export class CommandLoader {
  static init() {
    NewClass.load(yargs);
    ModuleCommand.load(yargs);
    return yargs;
  }
}
