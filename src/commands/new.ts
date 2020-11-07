import yargs from "yargs";
import { AbstractCommand } from "./AbstractCommand";
import { ProjectStarter } from "../actions/ProjectStarter";
import { Command, Alias } from "../type";
import path from "path";

interface Arguments {
  projectName: string;
}

export class NewClass extends AbstractCommand {
  static load(yargs: yargs.Argv) {
    yargs.command([Command.new, Alias.new], false, () => {}, this.run).argv;
  }

  static run(args: yargs.Arguments<Arguments>) {
    const { projectName } = args;
    new ProjectStarter({
      projectName,
      templateDirectory: path.resolve(
        __dirname,
        "..",
        "..",
        "template",
        "project"
      ),
    }).run();
  }
}
