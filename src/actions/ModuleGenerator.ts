import fs from "fs-extra";
import path from "path";
import { ModuleType } from "../type";
import { Print } from "../util/print";
import { Utility } from "../util/Utility";

interface ModuleGeneratorOption {
  moduleType: ModuleType;
  moduleName: string;
  state?: boolean;
  asset?: boolean;
}

const print = Print.createConsoleLogger("Module Generator");

export class ModuleGenerator {
  private src!: string;
  private moduleDirectory!: string;
  private targetDirectory!: string;
  private isJs: boolean = false;
  private readonly templateDirectory: string;
  private readonly moduleName: string;
  private readonly moduleType: ModuleType;
  private readonly state: boolean;
  private readonly asset: boolean;
  // private readonly prefix: string = "./test/1.2.3/";

  constructor({ moduleName, moduleType, state, asset }: ModuleGeneratorOption) {
    this.templateDirectory = path.join(__dirname, "..", "..", "template");
    this.moduleName = moduleName;
    this.moduleType = moduleType;
    this.state = !!state;
    this.asset = !!asset;
  }

  run() {
    try {
      this.preProcess();
      this.getSrcPath();
      this.getModulePath();
      this.generateFolder();
      this.copyTemplate();
      this.updateTemplateContent();
    } catch (err) {
      print.error(err);
      process.exit(1);
    }
  }

  private preProcess() {
    print.info("Checking pre-conditions...");
    print.process("validating module type...");
    const ValidModuleTypes = Object.entries(ModuleType).map(([_, v]) => v);
    if (!ValidModuleTypes.includes(this.moduleType)) {
      throw new Error(
        `Invalid Module Type, current:${
          this.moduleType
        },  accepts: ${ValidModuleTypes.join(" | ")}`
      );
    }
    print.process("checking module name...");
    if (!this.moduleName) {
      throw new Error("Please provider a name for module / component");
    }
    print.process("checking module name structure");
    if (!isNaN(parseInt(this.moduleName))) {
      throw new Error("Module name should contain letter");
    }
    print.task("Pre-conditions check complete.");
  }

  private getSrcPath() {
    print.info("Detecting src folder");
    let srcPath = `src`;
    let loop = 0;
    while (loop < 5) {
      if (fs.existsSync(srcPath)) {
        print.process("src folder resolved");
        if (!fs.existsSync(path.join(srcPath, "..") + "/tsconfig.json")) {
          this.isJs = true;
        }
        return (this.src = srcPath);
      }
      srcPath = path.join("..", srcPath);
      loop++;
    }
    throw new Error(
      `Src folder is not detected, please cd to root directory and try again`
    );
  }

  private getModulePath() {
    print.info("Detecting module folder");
    const dir = path.join(
      this.src,
      this.moduleType === ModuleType.module ? "module" : "component"
    );
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
      throw new Error(
        `${Utility.getModuleNameInFormat(
          this.moduleType,
          "pascal"
        )} is not a valid folder.`
      );
    }
    print.process(`${this.moduleType} folder resolved`);
    this.moduleDirectory = dir;
  }

  private generateFolder() {
    const directory = this.moduleName.split("/").reduce((prev, curr) => {
      const paths = path.join(prev, curr);
      Utility.generate(path.join(this.moduleDirectory, paths));
      return paths;
    }, "");

    if (this.asset) {
      Utility.generate(path.join(this.moduleDirectory, directory, "asset"));
    }

    this.targetDirectory = path.join(this.moduleDirectory, directory);
  }

  private copyTemplate() {
    print.task(`Generating ${this.moduleType} for ${this.moduleName}`);
    fs.copySync(
      path.join(
        this.templateDirectory,
        this.isJs
          ? this.moduleType === ModuleType.component
            ? "component-js"
            : "module-js"
          : this.moduleType === ModuleType.component
          ? "component"
          : "module"
      ),
      this.targetDirectory
    );

    if (this.state && !this.isJs) {
      fs.copySync(
        path.join(this.templateDirectory, "state"),
        this.targetDirectory
      );
    }
  }

  private updateTemplateContent() {
    if (this.moduleType === ModuleType.module) {
      const indexTSPath =
        this.targetDirectory + `/index.${this.isJs ? "js" : "ts"}`;
      const mainTSXPath =
        this.targetDirectory + `/component/Main.${this.isJs ? "js" : "ts"}x`;
      const indexSCSSPath = this.targetDirectory + `/component/index.scss`;

      print.task([`Updating index.ts`, indexTSPath]);
      Utility.replaceTemplate(indexTSPath, [
        Utility.getModuleNameInFormat(this.moduleName, "pascal"),
      ]);
      print.task([`Updating Main.tsx`, mainTSXPath]);
      Utility.replaceTemplate(mainTSXPath, [
        Utility.getModuleNameInFormat(this.moduleName, "pascal"),
        Utility.getModuleNameInFormat(this.moduleName, "camel"),
      ]);
      print.task([`Updating index.scss`, indexSCSSPath]);
      Utility.replaceTemplate(indexSCSSPath, [
        Utility.getModuleNameInFormat(this.moduleName, "camel"),
      ]);
    } else if (this.moduleType === ModuleType.component) {
      const indexTSXPath =
        this.targetDirectory + `/index.${this.isJs ? "js" : "ts"}x`;
      const indexSCSSPath = this.targetDirectory + "/index.scss";
      print.task([`Updating index.tsx`, indexTSXPath]);
      Utility.replaceTemplate(indexTSXPath, [
        Utility.getModuleNameInFormat(this.moduleName, "pascal"),
        Utility.getModuleNameInFormat(this.moduleName, "camel"),
      ]);
      print.task([`Updating index.scss`, indexSCSSPath]);
      Utility.replaceTemplate(indexSCSSPath, [
        Utility.getModuleNameInFormat(this.moduleName, "camel"),
      ]);
    }
  }
}
