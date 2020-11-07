import { AbstractCommand } from "./AbstractCommand";
import yargs from "yargs";
import { Command, Alias, Option, OptionAlias, ModuleType } from "../type";
import { ModuleGenerator } from "../actions/ModuleGenerator";

interface Arguments {
  moduleType: ModuleType;
  moduleName: string;
  state?: boolean;
  asset?: boolean;
}

export class ModuleCommand extends AbstractCommand {
  static load(yargs: yargs.Argv) {
    yargs
      .command([Command.generate, Alias.generate], false, () => {}, this.run)
      .options({
        [Option.asset]: {
          type: "boolean",
          alias: OptionAlias.asset,
        },
        [Option.state]: {
          type: "boolean",
          alias: OptionAlias.state,
        },
      }).argv;
  }

  static run(args: yargs.Arguments<Arguments>) {
    const { moduleName, moduleType, state, asset } = args;
    new ModuleGenerator({
      moduleName,
      moduleType,
      state,
      asset,
    }).run();
  }
}
