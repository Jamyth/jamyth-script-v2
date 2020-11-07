# jamyth-script (v2)

A CLI tool for one-key setup [TypeScript](https://www.typescriptlang.org/), [React](https://reactjs.org/tutorial/tutorial.html), [Webpack](https://webpack.js.org/).

Feature Includes:

- Create a complete customizable [React](https://reactjs.org/tutorial/tutorial.html) Project with just a key.
- Easy to switch between Npm and Yarn
- Support Javascript and Typescript.
- Support Scss
- Save time configuring webpack settings.
- Easy to change `webpack.config.js` when needed.
- Currently freezed to webpack 4
- Path Alias support
- Easy Command to generate component and module

# Installation and Usage

The easiest way to use jamyth-script

```
yarn global add jamyth-script
```

After that, type the following to the console.

```
jamyth-script new my_awesome_project
```

Then the cli will automatically generate all the files needed.

File Structure will look like this

```
* my_awesome_project
|
+-- node_modules
+-- src
|   +-- asset
|   +-- component
|   +-- module
|   |   +-- main
|   |       +-- component
|   |       |   +-- Main.tsx
|   |       |   +-- index.scss
|   |       +-- index.ts
|   +-- util
|   |   +-- async.tsx
|   +-- index.tsx
|
+-- static
|   +-- index.html
|
+-- package.json
+-- tsconfig.json
+-- webpack.config.js
+-- yarn.lock
```

## Generating Module / Component

In src folder, there will be two folder called component and module.
To keep the structure organized. we do not suggest directly added folder and file.

> P.S. jamyth-script will automatically detect the language of the project (js | ts) and generate a suitable module / component, so don't worry

Instead, we suggest you to do the following

```
// First cd to your project directory, or the follow commands cannot
// execute properly.

jamyth-script g module home --state|-s --asset|-a

// --asset -> will generate an asset folder in the module
// --state -> will generate a type.ts for the interface and more

================================================

jamyth-script g component logo --asset|-a

// --asset -> will generate an asset folder in the component
```

when the installation complete, simply cd the project folder and

```
yarn start
```

## Code Splitting

To keep your webapp optimized, we provided a dynamic import solution for code splitting.
You can apply this feature in two ways.

> This functionality is inspired by `React.lazy`. But we also support `Named Export` as well as `Default Export`.

1. Route Component -> Split by Page
2. Module / Component -> Split whenever calling another module or component

```
// Logo.tsx
export const MyLogo = React.memo(() => <img src={mylogo}/>)

// Module.tsx
import { async } from 'util/async'

const myLogo = async(() => import('component/logo'), 'MyLogo')

export const Module = React.memo(() => {
    return (
        <main>
            <myLogo />
        </main>
    )
})
```

## Start new project with flags

| Flags             | Description                             |
| ----------------- | --------------------------------------- |
| --npm             | use npm as package manager              |
| --js --javascript | create new project that uses javascript |

## Commands
| Command | Description| Param Required |
|--- |--- |--- |
| new <project_name> <flags> | Generate a React Project | Yes |
| g <module\|component> < name > | Create module or component | Yes |

## Todos

- ~~npm support~~ -> v2.2.5
- react-router
- redux
- ~~path alias~~ -> v1.2.23
- ~~React.memo~~ -> v1.2.23
- ~~Code Splitting~~ -> v1.3.0
- ~~non-typescript~~ -> v2.2.5
- and more ...

## Known issues

- path alias not working for js project

#Licenses
MIT licensed. Copyright (c) Jamyth Luk 2020.
