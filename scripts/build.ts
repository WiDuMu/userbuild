import { watch } from "node:fs";
import { buildHeader } from "./header";
import json5 from "json5";

async function buildScripts() {
	let header: string;
	let entrypoints: string[];

	const manifestPath = [...new Bun.Glob("**manifest.user.{json,jsonc,json5}").scanSync("./src/")].map(path => `./src/${path}`);

	if (manifestPath.length) {
		const manifestFile = Bun.file(manifestPath[0]);
		const manifestText = await manifestFile.text();
		const manifest = json5.parse(manifestText);
		header = buildHeader(manifest);
		entrypoints = manifest.entrypoints.map((path: string) => `./src/${path}`);
	} else {
		console.log("No manifest found, falling back on legacy mode!");

		header = `\
// ==UserScript==
// @name        New script 
// @namespace   Violentmonkey Scripts
// @match       *://example.org/*
// @grant       none
// @version     1.0
// @author      -
// ==/UserScript==
`;
		entrypoints = [
			...new Bun.Glob("**user.ts").scanSync("./src/"),
			...new Bun.Glob("**user.js").scanSync("./src/"),
		].map(path => `./src/${path}`);
	}

	console.log(entrypoints);

	const result = await Bun.build({
		entrypoints: entrypoints,
		outdir: "out",
		splitting: false,
		sourcemap: "none",
		target: "browser", // This is different from esbuild for some reason
		format: "iife", // Use either 'esm' or 'iife' depending on how old your targets are.
		/** The banner is used to configure your userscript */
		banner: header,
	});

	console.log(result);
}

if (process.argv.includes("--watch")) {
	const watcher = watch("src/", { recursive: true }, (event, filename) => {
		console.log(`Detected change in ${filename}, rebuilding...`);
		try {
			buildScripts();
		} catch (err) {
			console.error(`Encountered error building script "${filename}": ${err}`);
		}
	});

	process.on("SIGINT", () => {
		console.log("\nExiting...")
		watcher.close();
		process.exit(0);
	})
}

buildScripts();