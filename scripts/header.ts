/// A script to generate userscript headers
import type { UserScriptManifest } from "./types";

export function buildHeader(manifest : UserScriptManifest): string {
    if (manifest.banner?.length) {
        return manifest.banner;
    }
    if (!manifest.name || !manifest.match?.length) {
        throw new TypeError("Missing name or match, cannot make a valid userscript");
    }
    return `\
// ==UserScript==
// @name        ${manifest.name}
// @author      ${manifest.author ? manifest.author : "-"}
// @version     ${manifest.version ? manifest.version : "1.0"}
${manifest.description ? `// @description ${manifest.description}\n` : ""}\
// @namespace   ${manifest.namespace ? manifest.namespace : "Userbuild script"}
${manifest.downloadURL ? `// @downloadURL ${manifest.downloadURL.toString()}\n`: ""}\
${manifest.homepageURL ? `// @homepageURL ${manifest.homepageURL.toString()}\n` : ""}\
${manifest.supportURL ? `// @supportURL   ${manifest.supportURL.toString()}\n` : ""}\
${manifest.icon ? `// @icon        ${manifest.icon}\n` : ""}\
${manifest.noframes ? "// @noframes\n" : ""}\
${manifest["run-at"] ? `// @run-at      ${manifest["run-at"]}\n` : ""}\
${manifest.match.map(match => `// @match       ${match}`).join("\n")}
${manifest["match-excludes"] ? manifest["match-excludes"].map(exclude => `// @match-exclude ${exclude}`).join("\n") : ""}\
${manifest.excludes ? manifest.excludes.map(exclude => `// @exclude       ${exclude}`).join('\n') : ""}\
${manifest.includes ? manifest.includes.map(include => `// @include       ${include}`).join('\n') : ""}\
${(manifest.grant?.length) ? manifest.grant.map(perm => `// @grant       ${perm}`).join("\n") : "// @grant       none\n"}\
${manifest["top-level-await"] ? "// @top-level-await" : ""}\
${manifest.unwrap ? "// @unwrap" : ""}\
// ==/UserScript==
`;
}
