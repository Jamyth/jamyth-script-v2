import { Print } from "../util/print";
import fs from "fs-extra";
import chalk from "chalk";
import { Utility } from "../util/Utility";
import { exec } from "child-process-promise";
import ora from "ora";

interface ProjectStarterOptions {
  projectName: string;
  templateDirectory: string;
}

const print = Print.createConsoleLogger("Generate New Project");

export class ProjectStarter {
  private readonly projectName: string;
  private readonly templateDirectory: string;
  private readonly projectPath: string;

  constructor({ projectName, templateDirectory }: ProjectStarterOptions) {
    this.projectName = projectName;
    this.templateDirectory = templateDirectory;
    this.projectPath = `./${projectName}`;
  }

  public run() {
    try {
      this.preProcess();
      this.copyTemplate();
      this.updateTemplateContent();
      this.installDependencies();
    } catch (error) {
      try {
        fs.removeSync(this.projectPath);
      } catch (err) {}
      print.error(error);
      process.exit(1);
    }
  }

  private preProcess() {
    print.info("Checking pre-conditions...");
    print.process("checking project name existence.");
    if (!this.projectName) {
      throw new Error(
        `Project name is required. Usage: jamyth-script new ${chalk.yellowBright(
          "<your_project_name>"
        )}`
      );
    }
    print.process("checking project name length.");
    if (this.projectName.length < 2) {
      throw new Error("Project name's length cannot less then 2 character");
    }
    print.process("checking project naming convention.");
    if (this.projectName !== this.projectName.toLowerCase()) {
      throw new Error(
        `"${chalk.redBright(
          this.projectName
        )}" Project name cannot contain capitalized characters.`
      );
    }
    print.process("checking project naming convention. (special characters)");
    if (this.projectName.includes("/")) {
      throw new Error(
        "Project name too special (e.g. contains / ), please change a normal one"
      );
    }
    print.task("Pre-conditions check complete.");
  }

  private copyTemplate() {
    print.task(["Generating project starter pack to target", this.projectPath]);
    fs.copySync(this.templateDirectory, this.projectPath);
  }

  private updateTemplateContent() {
    const packagePath = this.projectPath + "/package.json";
    print.task(["Updating package.json", packagePath]);
    Utility.replaceTemplate(packagePath, [this.projectName]);
  }

  private async installDependencies() {
    try {
      console.info("");
      const spinner = ora(
        `Installing dependencies using ${chalk.blueBright("Yarn")}`
      ).start();
      const { stdout } = await exec(`cd ${this.projectPath} && yarn`);
      spinner.stop();
      stdout.split("\n").forEach((_) => print.task(_));
    } catch (error) {
      throw error;
    }
  }
}
