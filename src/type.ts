export enum Command {
  new = "new [projectName]",
  generate = "generate [moduleType] [moduleName]",
}

export enum Alias {
  new = "new [projectName]",
  generate = "g [moduleType] [moduleName]",
}

export enum Option {
  npm = "npm",
  javascript = "javascript",
  asset = "asset",
  state = "state",
}

export enum OptionAlias {
  javascript = "js",
  asset = "a",
  state = "s",
}

export enum ModuleType {
  module = "module",
  component = "component",
  "module-component" = "module-component",
}
