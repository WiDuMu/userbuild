const entrypoints = [
	...new Bun.Glob("src/*user.ts").scanSync("."),
	...new Bun.Glob("src/*user.js").scanSync("."),
];

const result = await Bun.build({
	entrypoints: entrypoints,
	outdir: "out",
	splitting: false,
	sourcemap: "none",
	target: "browser", // This is different from esbuild for some reason
	format: "iife", // Use either 'esm' or 'iife' depending on how old your targets are.
	/** The banner is used to configure your userscript */
	banner: `// ==UserScript==
 // @name        New script 
 // @namespace   Violentmonkey Scripts
 // @match       *://example.org/*
 // @grant       none
 // @version     1.0
 // @author      -
 // ==/UserScript==
 `,
});

console.log(result);
