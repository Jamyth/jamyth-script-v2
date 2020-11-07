import chalk from "chalk";

type textColor = "blueBright" | "greenBright" | "redBright";

export class Print {
  static createConsoleLogger(title: string) {
    return {
      info: this.print("ℹ️ ")("blueBright")(title),
      task: this.print("🛠 ")("greenBright")(title),
      error: this.print("❌")("redBright")(title),
      process: this.processLogger,
    };
  }

  private static print(emoji: string) {
    return (color: textColor) => (title: string) => (
      text: string | Error | Array<string | Error>
    ) => {
      const body = chalk.whiteBright.bgBlack(
        (Array.isArray(text) ? text : [text]).map((_) => _.toString()).join(" ")
      );
      console.info("");
      console.info(chalk[color].bold(`${emoji} [${title}] `) + body);
    };
  }

  private static processLogger(text: string | Error | Array<string | Error>) {
    const body = (Array.isArray(text) ? text : [text])
      .map((_) => _.toString())
      .join(" ");
    console.info(chalk.grey(body));
  }
}
