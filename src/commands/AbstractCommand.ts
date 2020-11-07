import yargs from "yargs";
export abstract class AbstractCommand {
  static load(_: yargs.Argv): void {}
  static run(_: yargs.Arguments<any>): void {}
}
