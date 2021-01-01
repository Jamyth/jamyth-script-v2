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

interface GenerateImportStatementForNewModuleStateConfig {
  moduleStateName: string;
  partialModulePath: string;
}

const print = Print.createConsoleLogger("Module Generator");

export class ModuleGenerator {
  private src!: string;
  private moduleDirectory!: string;
  private targetDirectory!: string;
  private statePath!: string;
  private isJs: boolean = false;
  private readonly templateDirectory: string;
  private readonly moduleName: string;
  private readonly moduleType: ModuleType;
  private readonly asset: boolean;
  // private readonly prefix: string = "./test/1.2.3/";

  constructor({ moduleName, moduleType, asset }: ModuleGeneratorOption) {
    this.templateDirectory = path.join(__dirname, "..", "..", "template");
    this.moduleName = moduleName;
    this.moduleType = moduleType;
    this.asset = !!asset;
  }

  run() {
    try {
      this.preProcess();
      this.getSrcPath();
      this.getModulePath();
      this.getStatePath();
      this.generateFolder();
      this.copyTemplate();
      this.updateTemplateContent();
      this.updateStateContent();
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

  private getDir(type: ModuleType): string {
    switch (type) {
      case ModuleType.component:
        return path.join(this.src, "component");
      case ModuleType.module:
      case ModuleType["module-component"]:
        return path.join(this.src, "module");
    }
  }

  private getStatePath() {
    print.info("Detecting util/type.ts");
    const dir = path.join(this.src, "util");
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
      throw new Error(`src/util is not a valid folder.`);
    }
    print.process(`src/util folder resolved`);
    this.statePath = dir + "/type.ts";
  }

  private getModulePath() {
    print.info("Detecting module folder");
    const dir = this.getDir(this.moduleType);
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

  private getTemplatePath(moduleType: ModuleType) {
    let directory = "";
    switch (moduleType) {
      case ModuleType.component:
      case ModuleType["module-component"]:
        directory = "component";
        break;
      case ModuleType.module:
        directory = "module";
        break;
    }
    if (this.isJs) {
      return `${directory}-js`;
    }
    return directory;
  }

  private copyTemplate() {
    print.task(`Generating ${this.moduleType} for ${this.moduleName}`);
    fs.copySync(
      path.join(this.templateDirectory, this.getTemplatePath(this.moduleType)),
      this.targetDirectory
    );
  }

  private updateTemplateContent() {
    let indexSCSSPath = "";
    switch (this.moduleType) {
      case ModuleType.module:
        const indexTSPath =
          this.targetDirectory + `/index.${this.isJs ? "js" : "ts"}`;
        const mainTSXPath =
          this.targetDirectory + `/component/Main.${this.isJs ? "js" : "ts"}x`;
        indexSCSSPath = this.targetDirectory + `/component/index.scss`;
        const hookTSPath =
          this.targetDirectory + `/hook.${this.isJs ? "js" : "ts"}`;

        print.task([`Updating index.${this.isJs ? "js" : "ts"}`, indexTSPath]);
        Utility.replaceTemplate(indexTSPath, [
          Utility.getModuleNameInFormat(this.moduleName, "pascal"),
          Utility.getModuleNameInFormat(this.moduleName, "camel"),
        ]);
        print.task([`Updating hook.${this.isJs ? "js" : "ts"}`, hookTSPath]);
        Utility.replaceTemplate(hookTSPath, [
          Utility.getModuleNameInFormat(this.moduleName, "pascal"),
          Utility.getModuleNameInFormat(this.moduleName, "camel"),
        ]);
        print.task([`Updating Main.${this.isJs ? "js" : "ts"}x`, mainTSXPath]);
        Utility.replaceTemplate(mainTSXPath, [
          Utility.getModuleNameInFormat(this.moduleName, "pascal"),
          Utility.getModuleNameInFormat(this.moduleName, "camel"),
        ]);
        print.task([`Updating index.scss`, indexSCSSPath]);
        Utility.replaceTemplate(indexSCSSPath, [
          Utility.getModuleNameInFormat(this.moduleName, "camel"),
        ]);
        break;
      case ModuleType.component:
      case ModuleType["module-component"]:
        const indexTSXPath =
          this.targetDirectory + `/index.${this.isJs ? "js" : "ts"}x`;
        indexSCSSPath = this.targetDirectory + "/index.scss";
        print.task([`Updating index.tsx`, indexTSXPath]);
        Utility.replaceTemplate(indexTSXPath, [
          Utility.getModuleNameInFormat(this.moduleName, "pascal"),
          Utility.getModuleNameInFormat(this.moduleName, "camel"),
        ]);
        print.task([`Updating index.scss`, indexSCSSPath]);
        Utility.replaceTemplate(indexSCSSPath, [
          Utility.getModuleNameInFormat(this.moduleName, "camel"),
        ]);
        break;
    }
  }

  private updateStateContent() {
    print.task(["Updating redux state definition", this.statePath]);

    if (this.isJs) {
      print.process(["Skipped due to JS Project detected"]);
      return;
    }

    const stateFileContent = fs.readFileSync(this.statePath).toString();
    const lastStateDeclarationIndex = stateFileContent.lastIndexOf("};");
    if (lastStateDeclarationIndex === -1)
      throw new Error("Cannot find state declaration");

    const moduleName = Utility.getModuleNameInFormat(this.moduleName, "camel");
    const moduleStateName =
      Utility.getModuleNameInFormat(this.moduleName, "pascal") + "State";
    const newStateFileContent =
      this.generateImportStatementForNewModuleState({
        moduleStateName,
        partialModulePath: this.moduleName,
      }) +
      "\n" +
      stateFileContent.substr(0, lastStateDeclarationIndex) +
      `${moduleName}: ${moduleStateName};\n` +
      stateFileContent.substr(lastStateDeclarationIndex);

    fs.writeFileSync(this.statePath, newStateFileContent, { encoding: "utf8" });
  }

  private generateImportStatementForNewModuleState({
    moduleStateName,
    partialModulePath,
  }: GenerateImportStatementForNewModuleStateConfig) {
    return `import type {State as ${moduleStateName}} from "module/${partialModulePath}/type";`;
  }
}
