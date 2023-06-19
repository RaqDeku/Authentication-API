//@ts-check
/**
 * @param {String} uri Resource URI
 * @param {any=} queryParams Query Params Object
 * @returns URL with query strings
 */
const getUrlWithParams = (uri, queryParams) => {
  let baseUri = uri;
  let queryStrings = queryParams
    ? new URLSearchParams(queryParams).toString()
    : undefined;
  let uriToFetch = queryStrings ? [baseUri, queryStrings].join("?") : baseUri;
  return uriToFetch;
};

module.exports = getUrlWithParams;
