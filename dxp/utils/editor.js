/**
 * Checks if the provided context indicates an editor preview mode by inspecting the URL for the `SQ_ACTION=preview` or `_matrixAssetId` query parameters.
 * Returns `false` if any issues are encountered, such as missing context, invalid URL, or parsing errors.
 *
 * @param {Object} ctx - The context object containing the URL to check.
 * @param {string} [ctx.url] - The URL to parse for query parameters.
 * @returns {boolean} Returns `true` if the URL contains `SQ_ACTION=preview` or `_matrixAssetId` as a query parameter, otherwise `false`.
 * @example
 * const ctx = { url: "https://example.com?SQ_ACTION=preview" };
 * console.log(isEditor(ctx)); // true
 *
 * const ctx2 = { url: "https://example.com?_matrixAssetId=12345" };
 * console.log(isEditor(ctx2)); // true
 *
 * const ctx3 = { url: "invalid-url" };
 * console.log(isEditor(ctx3)); // false
 *
 * const ctx4 = {};
 * console.log(isEditor(ctx4)); // false
 */
export function isEditor(url) {
  const hasSqActionPreview = /\bSQ_ACTION=preview\b/.test(url);
  const hasMatrixAssetId = /\b_matrixAssetId=/.test(url);
  return hasSqActionPreview || hasMatrixAssetId;
}
