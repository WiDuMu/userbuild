# userbuild
2nd attempt to build a simple bundler for userscript development. It now uses the bun bundler, and injects the metadata comments back into the built JavaScript. Write your `.user.ts` or `.user.js` files in the `src` directory, and it will create a useable script in the `out` directory.

This allows you to use typescript, npm packages, and newer syntax, and get a viable Greasemonkey/Tampermonkey/Violentmonkey compatible userscript out of it.

### To download
You can either use this template to create a github repository, to modify it, or download the zip locally to get the template.

### To install dependencies:
Older versions supported nodejs, with the transision to bun bundler bun is the only supported runtime. As Bun is the bundler, it doesn't make sense to use other runtimes.

#### bun
```bash
bun install
```

### To run:
#### bun
```bash
bun run build
```
