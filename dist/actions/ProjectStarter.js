"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStarter = void 0;
const print_1 = require("../util/print");
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const Utility_1 = require("../util/Utility");
const child_process_promise_1 = require("child-process-promise");
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const print = print_1.Print.createConsoleLogger("Generate New Project");
class ProjectStarter {
    constructor({ projectName, templateDirectory, useNpm, }) {
        this.projectName = projectName;
        this.templateDirectory = templateDirectory;
        this.projectPath = `./${projectName}`;
        this.useNpm = useNpm;
    }
    run() {
        try {
            this.preProcess();
            this.copyTemplate();
            this.mkdir();
            this.updateTemplateContent();
            this.installDependencies();
        }
        catch (error) {
            try {
                fs_extra_1.default.removeSync(this.projectPath);
            }
            catch (err) { }
            print.error(error);
            process.exit(1);
        }
    }
    preProcess() {
        print.info("Checking pre-conditions...");
        print.process("checking project name existence.");
        if (!this.projectName) {
            throw new Error(`Project name is required. Usage: jamyth-script new ${chalk_1.default.yellowBright("<your_project_name>")}`);
        }
        print.process("checking project name length.");
        if (this.projectName.length < 2) {
            throw new Error("Project name's length cannot less then 2 character");
        }
        print.process("checking project naming convention.");
        if (this.projectName !== this.projectName.toLowerCase()) {
            throw new Error(`"${chalk_1.default.redBright(this.projectName)}" Project name cannot contain capitalized characters.`);
        }
        print.process("checking project naming convention. (special characters)");
        if (this.projectName.includes("/")) {
            throw new Error("Project name too special (e.g. contains / ), please change a normal one");
        }
        print.task("Pre-conditions check complete.");
    }
    copyTemplate() {
        print.task(["Generating project starter pack to target", this.projectPath]);
        fs_extra_1.default.copySync(this.templateDirectory, this.projectPath);
    }
    mkdir() {
        Utility_1.Utility.generate(path_1.default.join(this.projectPath, "src", "component"));
        Utility_1.Utility.generate(path_1.default.join(this.projectPath, "src", "asset"));
    }
    updateTemplateContent() {
        const packagePath = this.projectPath + "/package.json";
        print.task(["Updating package.json", packagePath]);
        Utility_1.Utility.replaceTemplate(packagePath, [this.projectName]);
    }
    async installDependencies() {
        try {
            console.info("");
            const spinner = ora_1.default(`Installing dependencies using ${chalk_1.default.blueBright(this.useNpm ? "Npm" : "Yarn")}`).start();
            const { stdout } = await child_process_promise_1.exec(`cd ${this.projectPath} && ${this.useNpm ? "npm i" : "yarn"}`);
            spinner.stop();
            stdout.split("\n").forEach((_) => print.task(_));
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProjectStarter = ProjectStarter;
