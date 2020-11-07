export enum Command {
  new = "new [projectName]",
  generate = "generate [moduleType] [moduleName]",
}

export enum Alias {
  new = "new [projectName]",
  generate = "g [moduleType] [moduleName]",
}

export enum Option {
  asset = "asset",
  state = "state",
}

export enum OptionAlias {
  asset = "a",
  state = "s",
}

export enum ModuleType {
  module = "module",
  component = "component",
}
