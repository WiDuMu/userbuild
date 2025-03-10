# userbuild
2nd attempt to build a simple bundler for userscript development. It now uses the bun bundler, and injects the metadata comments back into the built JavaScript. Write your `.user.ts` or `.user.js` files in the `src` directory, and it will create a useable script in the `out` directory.

This allows you to use typescript, npm packages, and newer syntax, and get a viable Greasemonkey/Tampermonkey/Violentmonkey compatible userscript out of it.

### To download
You can either use this template to create a github repository, to modify it, or download the zip locally to get the template.

### To install dependencies:
Older versions supported nodejs, with the transition to bun bundler, bun is the only supported runtime. As Bun is the bundler, it doesn't make sense to use other runtimes.

#### bun
```bash
bun install
```

### To run:
#### bun
```bash
bun run build
```

### Developing userscripts
Userbuild has two modes. Legacy mode, prior to 0.3, accepted every `src/*user.{ts,js}` as an entrypoint, and built the script, injecting a commend defined inside the build script. Since 0.3, you can define a `src/*manifest.user.json` file that determine's the script's entry point, name, description, match, metadata, etc. The build script will then build scripts according to each manifest.

### Philosophy
This project aims to be a relatively simple scaffold to build a project around for your own userscripts. It aims to have a minimal set of dependencies, and be unopinionated about any tools you might use outside of it.

Currently our dependencies are:
* Bun (Package manager, runtime, bundler)
* @types/bun (Providing typing information for bun)
* @types/greasemonkey (Providing typing information about greasemonkey)
* json5 for processing `manifest.user.json5` (the configuration file)
