/**
 * Single image component intended primarily for use inside Layouts (e.g. masonry
 * grids). Renders a <figure> with an <img> and an optional <figcaption> (from alt).
 */

import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

export default {
  async main({ componentContent }) {
    // Extract image and common fields from input
    const image = componentContent?.image;
    const url = image?.imageVariations?.original?.url; // required to render
    const alt = image?.alt || ''; // empty string is valid for decorative images

    // Early-exit: nothing to render if URL is missing
    if (!url) {
      return `<!-- ERR: Image not provided -->`;
    }

    // Render <figure> with <img> and optional <figcaption> (uses alt text)
    return html`
      <figure class="single-image-item">
        <img
          data-sq-field="componentContent.image"
          src="${url}"
          alt="${xssSafeContent(alt)}"
          loading="lazy"
        />
        ${alt ? `<figcaption>${xssSafeContent(alt)}</figcaption>` : ''}
      </figure>
    `;
  }
};
