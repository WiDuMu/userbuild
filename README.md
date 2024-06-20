# userbuild
2nd attempt to build a simple bundler for userscript development. It uses esbuild, and injects the metadata comments back into the built JavaScript. Write your `.user.ts` or `.user.js` files in the `src` directory, and it will create a useable script in the `out` directory.


###To install dependencies:

#### bun
```bash
bun install
```

#### npm
```bash
npm install
```

To run:
#### bun
```bash
bun run build
```

#### npm
```bash
npm run node-build
```

This project was created using `bun init` in bun v1.1.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
