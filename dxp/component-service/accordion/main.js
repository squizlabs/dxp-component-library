// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';
// This module takes an object with "accordion" properties as input.
// The preview information comes from example.data.json and is defined as input in manifest.json
export default {
  async main({ title, accordion }) {
    return html`
      <section class="accordion">
        <!-- Conditionally render title of the section -->
        ${title
          ? `<h2 class="heading-secondary">${xssSafeContent(title)}</h2>`
          : ''}

        <!-- We loop through the "accordion" array to create each accordion. The "accordion" array is expected to contain items, each with a "heading" and "content" property. -->
        <!-- Use the details and summary tags for an accessible accordion -->
        ${accordion
          .map(
            (item) => html`
              <details class="accordion__item">
                <summary class="accordion__heading">
                  ${xssSafeContent(item.heading)}
                </summary>
                <div class="accordion__content">
                  ${xssSafeContent(item.content)}
                </div>
              </details>
            `
          )
          .join('')}
      </section>
    `;
  }
};
