import yargs from "yargs";
import { AbstractCommand } from "./AbstractCommand";
import { ProjectStarter } from "../actions/ProjectStarter";
import { Command, Alias, Option, OptionAlias } from "../type";
import path from "path";

interface Arguments {
  projectName: string;
  npm?: boolean;
  js?: boolean;
}

export class NewClass extends AbstractCommand {
  static load(yargs: yargs.Argv) {
    yargs
      .command([Command.new, Alias.new], false, () => {}, this.run)
      .option(Option.npm, { type: "boolean" })
      .option(Option.javascript, {
        alias: OptionAlias.javascript,
        type: "boolean",
      }).argv;
  }

  static run(args: yargs.Arguments<Arguments>) {
    const { projectName, npm, js } = args;
    new ProjectStarter({
      projectName,
      templateDirectory: path.resolve(
        __dirname,
        "..",
        "..",
        "template",
        js ? "project-js" : "project"
      ),
      useNpm: npm,
    }).run();
  }
}
