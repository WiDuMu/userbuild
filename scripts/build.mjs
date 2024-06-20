import * as esbuild from 'esbuild'
/** Invokes the esbuild with the relevant options */

/* Example userscript metadata block
// ==UserScript==
// @name        New script 
// @namespace   Violentmonkey Scripts
// @match       *://example.org/*
// @grant       none
// @version     1.0
// @author      -
// ==/UserScript==
*/

await esbuild.build({
  entryPoints: ['src/*user.ts', 'src/*user.js'],
  bundle: true,
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
// ==/UserScript==
`
  },
})