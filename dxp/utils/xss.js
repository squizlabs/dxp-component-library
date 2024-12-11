import xss, { getDefaultWhiteList } from 'xss';

var specificTagChanges = {
  circle: ['cx', 'cy', 'r', 'stroke', 'stroke-width', 'fill'],
  clipPath: [],
  defs: [],
  ellipse: ['cx', 'cy', 'rx', 'ry', 'style'],
  g: ['clip-path', 'fill'],
  line: ['x1', 'y1', 'x2', 'y2', 'style'],
  path: ['d', 'fill', 'stroke', 'stroke-width'],
  polygon: ['points', 'style'],
  polyline: ['points', 'style'],
  rect: ['width', 'height', 'fill'],
  svg: ['width', 'height', 'viewBox', 'fill']
};
var addToAll = [
  'class',
  'id',
  // WCAG ARIA related roles (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)
  // Allow on anything and leave it to the developer to use it on the correct tags.
  'role',
  'aria-activedescendant',
  'aria-atomic',
  'aria-autocomplete',
  'aria-braillelabel',
  'aria-brailleroledescription',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colindextext',
  'aria-colspan',
  'aria-controls',
  'aria-current',
  'aria-describedby',
  'aria-description',
  'aria-details',
  'aria-disabled',
  'aria-dropeffect',
  'aria-errormessage',
  'aria-expanded',
  'aria-flowto',
  'aria-grabbed',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-level',
  'aria-live',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-owns',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-relevant',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowindextext',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext'
];

export function xssSafeContent(content) {
  const customWhitelist = getDefaultWhiteList();
  for (const [key, value] of Object.entries(specificTagChanges)) {
    customWhitelist[key] = value;
  }
  Object.keys(customWhitelist).forEach((tag) => {
    var _a;
    return (_a = customWhitelist[tag]) == null ? void 0 : _a.push(...addToAll);
  });

  return xss(content, { whiteList: customWhitelist });
}
