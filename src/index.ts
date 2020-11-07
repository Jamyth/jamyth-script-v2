#!/usr/bin/env node
import { CommandLoader } from "./commands";
const commander = CommandLoader.init();
commander.argv;
