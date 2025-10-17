// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

export default {
  async main({ image, contentType, heading, supportingText, link }) {
    const hasImage = Boolean(image?.imageVariations?.original?.url);
    const imgUrl = hasImage ? image.imageVariations.original.url : '';
    const imgAlt = hasImage ? xssSafeContent(image.alt || '') : '';
    const target = link?.target || '';
    const rel = target === '_blank' ? ' rel="noopener noreferrer"' : '';

    return html`
      <div
        class="card--single cards__card${hasImage
          ? ' cards__card--has-image'
          : ''}"
      >
        <a
          href="${link?.url || '#'}"
          target="${target}"
          ${rel}
          class="cards__card-link"
          data-sq-field="link"
        >
          ${hasImage
            ? `<img
                  data-sq-field="image"
                  class="cards__image"
                  src="${imgUrl}"
                  alt="${imgAlt}"
                />`
            : ''}
          ${contentType
            ? `<p data-sq-field="contentType" class="cards__content-type">
                  ${xssSafeContent(contentType)}
                </p>`
            : ''}

          <h3 class="cards__heading">
            <span data-sq-field="heading">${xssSafeContent(heading)}</span>
          </h3>

          ${supportingText
            ? `<div data-sq-field="supportingText" class="cards__supporting-text">
                  ${xssSafeContent(supportingText)}
                </div>`
            : ''}
          ${link?.text
            ? `<p class="cards__content-type cards__supporting-text cards__cta">${xssSafeContent(link.text)}</p>`
            : ''}
        </a>
      </div>
    `;
  }
};
