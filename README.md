# Datastar Plugin Starter

This is a starter template to help you easily create new [Datastar](https://data-star.dev) plugins, or [Rocket components](https://data-star.dev/reference/rocket), with [Typescript](https://www.typescriptlang.org/).

> [!IMPORTANT]
> In order to use this template, you should not fork this repo, but rather **utilise the [`Use this template`](https://github.com/regaez/datastar-plugin-starter/generate) feature** in Github.

## Getting started

- Install the latest version of [NodeJS](https://nodejs.org/) and [pnpm](https://pnpm.io/).
- Run `pnpm i` to install dependencies.

> [!TIP]
> Since the [Datastar repo](https://github.com/starfederation/datastar) does not contain a `package.json` file, you will encounter issues installing its Github repo as a dependency via `npm`. Therefore it is advised to use `pnpm` instead.

### Scripts

The template provides 2 scripts for you:

- `pnpm build`: Compiles the plugin source code to Javascript
- `pnpm watch`: Watches the `src` directory for changes and recompiles the plugin code while running a web server that serves the root directory

## Developing your plugin

The project directory structure is as follows:

```
dist/           # Directory for compiled, minified plugin Javascript code
src/            # Directory for Typescript source files
  index.ts      # The main plugin file
index.html      # An HTML file with markup examples of your plugin in use
```

To begin, start by editing the `src/index.ts` file. A basic `action` plugin example is provided for you by default; you should replace this with your desired plugin code.

Datastar supports 3 types of plugins: `action`, `attribute`, and `watcher`. Simply adjust the import statement at the top of the file to import the relevant plugin type registration function:

```js
import { action, attribute, watcher } from "datastar";
```

You may also want to create [Rocket components](https://data-star.dev/reference/rocket). If so, please refer to the [Using Datastar Pro](#using-datastar-pro) section below for additional setup requirements.

### Prefer to use Javascript?

No problem, the builds scripts are configured to compile any `.js` files in the `src` directory, as well. You can simply rename the `src/index.ts` file extension, remove any Typescript-specific code, and proceed as you wish.

### Public API vs internal API

Datastar has a Public API, available via import from the `datastar` module. It is recommended to use all Public API functions where possible.

However, sometimes you may find yourself wanting to use some of Datastar's internal utility functions, or its type definitions, in order for your plugin to behave in a consistent consistently with the core Datastar library.

> [!WARNING]
> Using any code that is **NOT part of the Public API** should be done with careful consideration, as it **is not officially supported** by Datastar and could result in breaking changes at any point.

Since the `datastar` module is marked as an _external dependency_ when compiling your plugin, any code imported from that module **will not be included in your final plugin bundle**. Any code imported from the following import paths will be included in your final plugin bundle:

- `@types`: useful to import common [Datastar type definitions](https://github.com/starfederation/datastar/blob/v1.0.0/library/src/engine/types.ts)
- `@utils/*`: useful to import [internal helper functions](https://github.com/starfederation/datastar/tree/v1.0.0/library/src/utils) 
- `@engine/*`
- `@plugins/*`

> Realistically, one would likely only ever use `@types` or `@utils`, as the useful code within `@engine` is already exported via the Public API, and `@plugins` usually don't export anything re-usable. The main reason these paths are included is so that the Typescript LSP will discover the relevant source code in order to provide functionality such as autocomplete, documentation, jump to definition, etc.

### Updating the Datastar version

Rather than tracking the latest state of the Datastar repo (which may be unstable), it is advised to track specific releases. **The template currently tracks `v1.0.0`** (the latest version at the time of writing).

You can update the version by adjusting the `#` tag value for the `datastar` dependency in your `package.json` file and re-running the `pnpm i` command.

#### Using Datastar Pro

You may want to change your project to instead use [Datastar Pro](https://data-star.dev/pro); for example, if you are creating [Rocket components](https://data-star.dev/reference/rocket). In order to do this, you will need to update both the `package.json` and `tsconfig.json` files, and **you must have access to the Datastar Pro Github repository** (which should be granted to you once you have purchased Datastar Pro).

1. Change the `datastar` module within your `devDependencies` to reference the `starfederation/datastar-pro` repository:

```diff
"devDependencies": {
- "datastar": "github:starfederation/datastar#v1.0.0",
+ "datastar": "github:starfederation/datastar-pro#v1.0.0",
}
```

2. Adjust the `datastar` path in `tsconfig.json` to point to the `datastar-pro.ts` bundle, instead of `datastar.ts`.

```diff
"paths": {
  "datastar": [
-    "./node_modules/datastar/library/src/bundles/datastar.ts"
+    "./node_modules/datastar/library/src/bundles/datastar-pro.ts"
  ],
}
```

3. Finally, run `pnpm i` to update your local `node_modules` dependencies (**this requires read permission for the `datastar-pro` repository!**). You should now be able to import Datastar Pro features, such as `rocket`, and benefit from Typescript LSP features:

```ts
import { rocket } from "datastar";
```

> [!CAUTION]
> Be careful not to breach the [Datastar Pro license terms](https://data-star.dev/pro#license): avoid importing any internal code from the Pro bundle into your plugin and do not redistribute the Pro bundle publicly in your plugin repo!

## Demo page

The demo page is set up to automatically include your compiled plugin JS module, Datastar, and uses [PicoCSS (classless version)](https://picocss.com/docs/classless) to apply some basic styling.

1. Edit the `index.html` file to add some HTML examples of your plugin in use.
2. Run `pnpm dev` to start a local server. This will watches for any changes to the `src` directory and automatically recompile any changes to those files.
3. Open http://localhost:8000 in your browser to view the demo page.

You may also wish to use the `index.html` file as the entrypoint for a [Github Pages project site](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites), in order to easily share a live demo of your plugin. To set up, simply go to your repo's "Settings > Pages" tab, select "Deploy from a branch" for the source, and "main" branch with "/ (root)" directory, then save. 

You can view this template's live Github Pages demo here: https://regaez.github.io/datastar-plugin-starter/

## Using your finished plugin

Run `pnpm build` to compile your plugin's Typescript code into a minified Javascript bundle, output to the `dist` directory. It is recommended to commit these files to the repo, so that others may use a CDN, such as [JDDelivr](https://www.jsdelivr.com/), to easily try out/use the plugin.

The plugin expects you to provide an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) that specifies the location of the `datastar` module and a `<script type="module">` that references the plugin itself.

> [!IMPORTANT]
> If you are creating a [Rocket component](https://data-star.dev/reference/rocket), then you should ensure you are referencing a [Datastar Pro](https://data-star.dev/pro) bundle within your import map.

For example, the following should be included in the `<head>`:

```html
<script type="importmap">
  {
    "imports": {
      "datastar": "https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.0/bundles/datastar.js"
    }
  }
</script>
<script type="module" src="https://cdn.jsdelivr.net/gh/regaez/datastar-plugin-starter@1.0.0/dist/index.js"></script>
```
> [!NOTE]
>  Adjust the `src` to match your plugin's repository.
