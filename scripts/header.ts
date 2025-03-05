/// A script to generate userscript headers

/** A type representing a userscript's metadata */
type UserScriptManifest = {
    author?: string;
    /** The name of your userscript. */
    name: string;
    /** URLs to match on running your userscript. */
    match: NotEmptyArray<string>;
    /** URLs to explicitly NOT match for running your userscript. */
    exclude?: string[];
    /** A list of extra permissions to grant to your script. */
    grant?: ("none" | "window.close" | "window.focus" | "GM_setvalue" )[];
    /** Description of your userscript. */
    description?: string;
    /** URL of the icon of your userscript. */
    icon?: string;
    /**  A set of includes for your script.
     * It is generally recomended to use match statements above.
    */
    includes?: string[];
    /** Unique identifier of your script. */
    namespace?: string;
    /** Whether to not run in nested frames, defaults to false (runs in nested frames). */
    noframes?: boolean;
    /** Scripts to be loaded into the page with your script.
     * If you are using userbuild, these *are not* your userbuild dependencies, and will be loaded at the script's load time.
     */
    require?: [];
    /** A set of resources to be loaded alongside your script.
     * Note: The resolution of these runs inside the browser, not inside userbuild.
     */
    resource?: [];
    /** When your script will be run on the page. */
    "run-at"?: "document-end" | "document-start" | "document-idle";
    /** The version of your script. */
    version?: string

}

/** A non empty array of something */
type NotEmptyArray<T> = T[] extends [] ? never : T[];

export function buildHeader(manifest : UserScriptManifest) {
    if (!manifest.name || !manifest.match) {
        throw new TypeError("Missing name or match, cannot make a valid userscript");
    }
    return `\
// ==UserScript==
// @name        ${manifest.name}
// @author      ${manifest.author ? manifest.author : "-"}
// @version     ${manifest.version ? manifest.version : "1.0"}
${manifest.description ? `// description  ${manifest.description}\n` : ""}\
// @namespace   ${manifest.namespace ? manifest.namespace : "Userbuild script"}
${manifest.icon ? `// @icon        ${manifest.icon}\n` : ""}\
${manifest.noframes ? "// @noframes\n" : ""}\
${manifest["run-at"] ? `// @run-at      ${manifest["run-at"]}\n` : ""}\
${manifest.match.map(match => `// @match       ${match}`).join("\n")}
${manifest.exclude ? manifest.exclude.map(exclude => `// @exclude       ${exclude}`).join('\n') : ""}\
${manifest.grant ? manifest.grant.map(perm => `// @grant       ${perm}`).join("\n") : "// @grant  none"}
// ==/UserScript==
`;
}
