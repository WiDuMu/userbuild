import * as esbuild from 'esbuild'

await esbuild.build({
  // entryPoints: ['src/user.ts'],
  entryPoints: ['src/*user.ts'],
  bundle: true,
  // outfile: 'out/user.js',
  outdir: 'out',
  splitting: false,
  sourcemap: false,
  treeShaking: true,
  target: ['es5'],
  banner: {
    js: `// ==UserScript==
// @name        New script 
// @namespace   Violentmonkey Scripts
// @match       *://example.org/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/19/2024, 5:31:10 PM
// ==/UserScript==
`
  },
})