/** Polyfill making a version of the window.fetch() API that 
 *  Uses the Greasemonkey XMLHTTPRequest API
 *  Because I'd rather Polyfill than use GM_xmlhttprequest.
 *  I Hate GM_XMLHttpRequest.
 *  This is to make me stop having to use GM_xmlhttprequest.
 */

/** Typescript type which models the Response object from GM_xmlhttprequest. */
type GMResponse = {
    context: undefined | null | Object;
    finalURL: string;
    lengthComputable: boolean;
    loaded: number;
    ready: number;
    total: number;
    response: ArrayBuffer | Blob | Document | Object | string;
    responseHeaders: string;
    responseText: string | null;
    responseType: "" | "arraybuffer" | "blob" | "document" | "json" | "text" | null;
    responseXML: Blob | null;
    status: number;
    statusText: string;
 }
 
 /** For some reason GM_xmlhttprequest uses CRLF separators for it's headers. */
 const headersSeparatorRegex = /(\r\n|\n)/gm;
 
 /** For some reason GM_xmlhttpreuest returns it's headers in string form.
  *  This gives you an object.
  */
 function interpretHeaders(s: string): HeadersInit {
    let headerStrings = s.split(headersSeparatorRegex)
    headerStrings = headerStrings.filter(s => (!s.match(headersSeparatorRegex) && s != ``));
    const headerKeyValues = headerStrings.map(hd => hd.split(`: `, 2));
    return Object.fromEntries(headerKeyValues);
 }
 
 /** Creates a standard Response object from the GM_xmlhttprequest response.  */
 function GMResponseToFetchResponse(gm: GMResponse): Response {
    if (!gm.responseXML) {
       throw new Error(`No data to return!`);
    }
    const blob = gm.responseXML;
    const headersInit: HeadersInit = interpretHeaders(gm.responseHeaders);
    const responseInit: ResponseInit = {
       status: gm.status,
       statusText: gm.statusText,
       headers: headersInit,
    }
    return new Response(blob, responseInit);
 }
 
 /** A version of the window.fetch() API that uses GreaseMonkey's xmlhttprequest API
  *  to bypass CORS
  */
 export default function GMfetch(resource: string, options?: RequestInit): Promise<Response> {
    const promise = new Promise(function (resolve, reject) {
 
       const load = (e: any) => resolve(GMResponseToFetchResponse(e));
 
       const abort = (e: any) => reject(e);
 
       const timeout = (e: any) => reject(e);
 
       const error = (e: any) => reject(e);
 
       const xhr = GM_xmlhttpRequest({
          url: resource,
          method: (options && options.method) ? options.method : 'GET',
          headers: (options && options.headers) ? options.headers : undefined,
          data: (options && options.body) ? options.body : undefined,
          binary: (options && options.body && options.body.toString) ? true : undefined,
          responseType: "blob",
          onload: load,
          onabort: abort,
          onerror: error,
          ontimeout: timeout,
       });
 
 
    })
 
    return promise;
 }
 