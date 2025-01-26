# userbuild
2nd attempt to build a simple bundler for userscript development. It now uses the bun bundler, and injects the metadata comments back into the built JavaScript. Write your `.user.ts` or `.user.js` files in the `src` directory, and it will create a useable script in the `out` directory.

This allows you to use typescript, npm packages, and newer syntax, and get a viable userscript out of it.

### To install dependencies:
Older versions supported nodejs, with the transision to bun bundler bun is the supported runtime.

#### bun
```bash
bun install
```

### To run:
#### bun
```bash
bun run build
```
