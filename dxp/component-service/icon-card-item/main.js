/**
 * Single-card variant based on the "Icon Cards" component.
 * Intended for use inside Layouts, where you need just one card instead of a list.
 *
 * Notes:
 * - Reuses shared iconMap (same as Icon Cards).
 */

import { iconMap } from './iconMap';
// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

export default {
  async main({ componentContent }) {
    // "componentContent" contains the content to be displayed (icon, heading, textContent, link).
    const { icon, heading, textContent, link } = componentContent || {};

    // Render icon if it exists in the icon map
    const iconHtml =
      icon && iconMap[icon]
        ? `<div class="icon-card__icon">${iconMap[icon].svg}</div>`
        : '';

    // Conditionally render heading
    const headingHtml = heading
      ? `<h3 data-sq-field="componentContent.heading" class="icon-card__heading">${xssSafeContent(heading)}</h3>`
      : '';

    // Rich text content (FormattedText)
    const textHtml = `<div data-sq-field="componentContent.textContent" class="icon-card__text">${xssSafeContent(textContent || '')}</div>`;

    // Rich text content (FormattedText)
    const core = html`${iconHtml}${headingHtml}${textHtml}`;

    // Wrap the entire card content in an <a> tag if a link is provided
    const content = link?.url
      ? html`<a
          href="${xssSafeContent(link.url)}"
          target="${link.target || '_self'}"
          data-sq-field="componentContent.link"
          class="icon-card__wrapper"
          >${core}</a
        >`
      : html`<div class="icon-card__wrapper">${core}</div>`;

    return html`<article class="icon-card">${content}</article>`;
  }
};
