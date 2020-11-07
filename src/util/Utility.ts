import fs from "fs";

import { Print } from "./print";

const print = Print.createConsoleLogger("Utility");
export class Utility {
  static replaceTemplate(filePath: string, replacement: string[]) {
    try {
      let content = fs.readFileSync(filePath, { encoding: "utf8" });
      replacement.forEach((_, i) => {
        content = content.replace(new RegExp("\\{" + (i + 1) + "\\}", "g"), _);
      });
      fs.writeFileSync(filePath, content, { encoding: "utf8" });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  static getModuleNameInFormat(
    name: string,
    format: "pascal" | "camel",
    postfix = ""
  ) {
    const replaceHyphen = (name: string, alwaysPascal: boolean) => {
      return name
        .split("-")
        .map((_, index) =>
          alwaysPascal || index > 0
            ? _.substr(0, 1).toUpperCase() + _.slice(1)
            : _
        )
        .join("");
    };

    const splitModuleName = name.split("/");
    const moduleName = splitModuleName[splitModuleName.length - 1];

    const camelNameWithoutPostfix = replaceHyphen(moduleName, false);

    if (format === "pascal") {
      return (
        camelNameWithoutPostfix.charAt(0).toUpperCase() +
        camelNameWithoutPostfix.slice(1) +
        postfix
      );
    } else {
      return camelNameWithoutPostfix + postfix;
    }
  }

  static generate(directory: string) {
    print.process(`checking existence of ${directory}...`);
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
      print.process(`${directory} is not exist, generating...`);
      fs.mkdirSync(directory);
    }
  }
}
