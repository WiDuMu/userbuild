const entrypoints = [...new Bun.Glob("src/*user.ts").scanSync("."), ...new Bun.Glob("src/*user.js").scanSync(".")];


const result = await Bun.build({
   entryPoints: entrypoints,
   bundle: true,
   outdir: 'out',
   splitting: false,
   sourcemap: "none",
   treeShaking: true,
   target: 'browser', // This is different from esbuild for some reason
   format: 'iife', // Use either 'esm' or 'iife' depending on how old your targets are.
   banner: `// ==UserScript==
 // @name        New script 
 // @namespace   Violentmonkey Scripts
 // @match       *://example.org/*
 // @grant       none
 // @version     1.0
 // @author      -
 // ==/UserScript==
 `
 })

 console.log(result);