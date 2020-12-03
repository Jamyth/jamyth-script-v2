"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleGenerator = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const type_1 = require("../type");
const print_1 = require("../util/print");
const Utility_1 = require("../util/Utility");
const print = print_1.Print.createConsoleLogger("Module Generator");
class ModuleGenerator {
    // private readonly prefix: string = "./test/1.2.3/";
    constructor({ moduleName, moduleType, state, asset }) {
        this.isJs = false;
        this.templateDirectory = path_1.default.join(__dirname, "..", "..", "template");
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
        }
        catch (err) {
            print.error(err);
            process.exit(1);
        }
    }
    preProcess() {
        print.info("Checking pre-conditions...");
        print.process("validating module type...");
        const ValidModuleTypes = Object.entries(type_1.ModuleType).map(([_, v]) => v);
        if (!ValidModuleTypes.includes(this.moduleType)) {
            throw new Error(`Invalid Module Type, current:${this.moduleType},  accepts: ${ValidModuleTypes.join(" | ")}`);
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
    getSrcPath() {
        print.info("Detecting src folder");
        let srcPath = `src`;
        let loop = 0;
        while (loop < 5) {
            if (fs_extra_1.default.existsSync(srcPath)) {
                print.process("src folder resolved");
                if (!fs_extra_1.default.existsSync(path_1.default.join(srcPath, "..") + "/tsconfig.json")) {
                    this.isJs = true;
                }
                return (this.src = srcPath);
            }
            srcPath = path_1.default.join("..", srcPath);
            loop++;
        }
        throw new Error(`Src folder is not detected, please cd to root directory and try again`);
    }
    getDir(type) {
        switch (type) {
            case type_1.ModuleType.component:
                return path_1.default.join(this.src, "component");
            case type_1.ModuleType.module:
            case type_1.ModuleType["module-component"]:
                return path_1.default.join(this.src, "module");
        }
    }
    getModulePath() {
        print.info("Detecting module folder");
        const dir = this.getDir(this.moduleType);
        if (!fs_extra_1.default.existsSync(dir) || !fs_extra_1.default.statSync(dir).isDirectory()) {
            throw new Error(`${Utility_1.Utility.getModuleNameInFormat(this.moduleType, "pascal")} is not a valid folder.`);
        }
        print.process(`${this.moduleType} folder resolved`);
        this.moduleDirectory = dir;
    }
    generateFolder() {
        const directory = this.moduleName.split("/").reduce((prev, curr) => {
            const paths = path_1.default.join(prev, curr);
            Utility_1.Utility.generate(path_1.default.join(this.moduleDirectory, paths));
            return paths;
        }, "");
        if (this.asset) {
            Utility_1.Utility.generate(path_1.default.join(this.moduleDirectory, directory, "asset"));
        }
        this.targetDirectory = path_1.default.join(this.moduleDirectory, directory);
    }
    getTemplatePath(moduleType) {
        let directory = "";
        switch (moduleType) {
            case type_1.ModuleType.component:
            case type_1.ModuleType["module-component"]:
                directory = "component";
                break;
            case type_1.ModuleType.module:
                directory = "module";
                break;
        }
        if (this.isJs) {
            return `${directory}-js`;
        }
        return directory;
    }
    copyTemplate() {
        print.task(`Generating ${this.moduleType} for ${this.moduleName}`);
        fs_extra_1.default.copySync(path_1.default.join(this.templateDirectory, this.getTemplatePath(this.moduleType)), this.targetDirectory);
        if (this.state && !this.isJs) {
            fs_extra_1.default.copySync(path_1.default.join(this.templateDirectory, "state"), this.targetDirectory);
        }
    }
    updateTemplateContent() {
        let indexSCSSPath = "";
        switch (this.moduleType) {
            case type_1.ModuleType.module:
                const indexTSPath = this.targetDirectory + `/index.${this.isJs ? "js" : "ts"}`;
                const mainTSXPath = this.targetDirectory + `/component/Main.${this.isJs ? "js" : "ts"}x`;
                indexSCSSPath = this.targetDirectory + `/component/index.scss`;
                print.task([`Updating index.ts`, indexTSPath]);
                Utility_1.Utility.replaceTemplate(indexTSPath, [
                    Utility_1.Utility.getModuleNameInFormat(this.moduleName, "pascal"),
                ]);
                print.task([`Updating Main.tsx`, mainTSXPath]);
                Utility_1.Utility.replaceTemplate(mainTSXPath, [
                    Utility_1.Utility.getModuleNameInFormat(this.moduleName, "pascal"),
                    Utility_1.Utility.getModuleNameInFormat(this.moduleName, "camel"),
                ]);
                print.task([`Updating index.scss`, indexSCSSPath]);
                Utility_1.Utility.replaceTemplate(indexSCSSPath, [
                    Utility_1.Utility.getModuleNameInFormat(this.moduleName, "camel"),
                ]);
                break;
            case type_1.ModuleType.component:
            case type_1.ModuleType["module-component"]:
                const indexTSXPath = this.targetDirectory + `/index.${this.isJs ? "js" : "ts"}x`;
                indexSCSSPath = this.targetDirectory + "/index.scss";
                print.task([`Updating index.tsx`, indexTSXPath]);
                Utility_1.Utility.replaceTemplate(indexTSXPath, [
                    Utility_1.Utility.getModuleNameInFormat(this.moduleName, "pascal"),
                    Utility_1.Utility.getModuleNameInFormat(this.moduleName, "camel"),
                ]);
                print.task([`Updating index.scss`, indexSCSSPath]);
                Utility_1.Utility.replaceTemplate(indexSCSSPath, [
                    Utility_1.Utility.getModuleNameInFormat(this.moduleName, "camel"),
                ]);
                break;
        }
    }
}
exports.ModuleGenerator = ModuleGenerator;
