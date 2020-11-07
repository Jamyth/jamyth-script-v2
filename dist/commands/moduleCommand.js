"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleCommand = void 0;
const AbstractCommand_1 = require("./AbstractCommand");
const type_1 = require("../type");
const ModuleGenerator_1 = require("../actions/ModuleGenerator");
class ModuleCommand extends AbstractCommand_1.AbstractCommand {
    static load(yargs) {
        yargs
            .command([type_1.Command.generate, type_1.Alias.generate], false, () => { }, this.run)
            .options({
            [type_1.Option.asset]: {
                type: "boolean",
                alias: type_1.OptionAlias.asset,
            },
            [type_1.Option.state]: {
                type: "boolean",
                alias: type_1.OptionAlias.state,
            },
        }).argv;
    }
    static run(args) {
        const { moduleName, moduleType, state, asset } = args;
        new ModuleGenerator_1.ModuleGenerator({
            moduleName,
            moduleType,
            state,
            asset,
        }).run();
    }
}
exports.ModuleCommand = ModuleCommand;
