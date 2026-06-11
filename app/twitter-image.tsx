// Next's static analysis needs `runtime` declared as a string literal in this
// file; the rest of the route config can be re-exported as-is.
export const runtime = "edge";

export { default, alt, size, contentType } from "./opengraph-image";
