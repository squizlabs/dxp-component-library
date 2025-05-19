// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "componentContent" and "componentConfiguration" properties as input.
export default {
  async main({ componentContent, componentConfiguration }) {
    // "componentContent" contains the content to be displayed (image, heading, textContent, link, and contentType).

    // "componentConfiguration" contains user-specific configurations (variant: text-left or text-right).

    const { image, heading, textContent, link, contentType, title } =
      componentContent;
    const { variant } = componentConfiguration;

    const isTextRight = variant === 'text-right';

    // The class of the main div is conditionally set based on the variant selected by the user.
    return html`
      <section class="image-text-row-section">
        <!-- Conditionally render title of the section -->
        ${title
          ? `<h2 data-sq-field="componentContent.title" class="heading-secondary">${xssSafeContent(title)}</h2>`
          : ''}

        <div
          class="image-text-row ${isTextRight
            ? 'text-right'
            : 'text-left'} ${!image ? 'no-image' : ''}"
        >
          <!-- Image is optional so it's necessary to use conditional rendering for a section -->

          ${image
            ? html`<div class="image-text-row__image">
                <img
                  data-sq-field="componentContent.image"
                  src="${image.imageVariations.original.url}"
                  alt="${image.alt}"
                />
              </div>`
            : ''}
          <div class="image-text-row__content">
            <!-- Content Type is optional so it's necessary to use conditional rendering for it. -->

            ${contentType
              ? html`<span
                  data-sq-field="componentContent.contentType"
                  class="text-tag"
                  >${xssSafeContent(contentType)}</span
                >`
              : ''}

            <h3
              data-sq-field="componentContent.heading"
              class="image-text-row__heading"
            >
              ${xssSafeContent(heading)}
            </h3>

            <!-- The textContent is not wrapped in a <p> tag because FormattedText in Content Management automatically adds <p> tags. -->

            <span data-sq-field="componentContent.textContent"
              >${xssSafeContent(textContent)}</span
            >

            <!-- Link is optional so it's necessary to use conditional rendering for it. -->

            ${link
              ? html`<a
                  data-sq-field="componentContent.link"
                  href="${link.url}"
                  target="${link.target}"
                  class="image-text-row__link"
                  >${xssSafeContent(link.text)}</a
                >`
              : ''}
          </div>
        </div>
      </section>
    `;
  }
};
