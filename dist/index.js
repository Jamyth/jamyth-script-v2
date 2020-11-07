#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const commander = commands_1.CommandLoader.init();
commander.argv;
