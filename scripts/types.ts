/** A non empty array of something */
type NotEmptyArray<T> = T[] extends [] ? never : T[];

type Primitive = number | boolean | string | bigint;

/** The type definition of userbuild's json input */
export interface UserScriptManifest {
    /** The entrypoint of a script */
    entrypoint: string;
    /** A script to insert rather than generating one. */
    banner?: string;
    /** The userscript's author, you */
    author?: string;
    /** The name of your userscript. */
    name: string;
    /** URLs to match on running your userscript. */
    match: NotEmptyArray<string>;
    /** URLs to explicitly NOT match for running your userscript. */
    "match-excludes": string[];
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
    /**  A set of excludes for your script.
     * It is generally recomended to use match statements above.
    */
    excludes?: string[];
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
    version?: string;
    /** Enable top-level await support in GreaseMonkey. This currently does nothing in userbuild */
    "top-level-await"?: boolean;
    /** Whether your userscript should be directly injected into the page or not wrapped normally */
    unwrap?: boolean;
    /** The URL the script can be downloaded from. Checked for updates automatically at a regular interval, and also manually on user request. */
    downloadURL?: string | URL;
    /** Used in some managers to link a support page */
    supportURL?: string | URL;
    /** Used in some managers as a link */
    homepageURL?: string | URL;
}