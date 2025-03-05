import { watch } from "fs";
import { buildHeader } from "./header";
import json5 from "json5";

async function buildScripts() {
	const entrypoints = [
		...new Bun.Glob("src/*user.ts").scanSync("."),
		...new Bun.Glob("src/*user.js").scanSync("."),
	];

	const manifestPath = [...new Bun.Glob("src/manifest.user.{json,jsonc,json5}").scanSync(".")];
	console.log(manifestPath);
	const manifestFile = Bun.file(manifestPath[0]);
	const manifestText = await manifestFile.text();
	const manifest = json5.parse(manifestText);

	const result = await Bun.build({
		entrypoints: entrypoints,
		outdir: "out",
		splitting: false,
		sourcemap: "none",
		target: "browser", // This is different from esbuild for some reason
		format: "iife", // Use either 'esm' or 'iife' depending on how old your targets are.
		/** The banner is used to configure your userscript */
		banner: buildHeader(manifest),
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