// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "quote" and "author" properties as input.
export default {
  async main({ title, quote, author }) {
    return html`
      <section class="blockquote-section">
        <!-- Conditionally render title of the section -->
        ${title
          ? `<h2 data-sq-field="title" class="heading-secondary">${xssSafeContent(title)}</h2>`
          : ''}

        <blockquote class="blockquote">
          <div data-sq-field="quote" class="blockquote__content">
            ${xssSafeContent(quote)}

            <!-- The "author" property is optional, so use conditional rendering to avoid displaying "undefined" when the author is not provided. -->

            ${author
              ? `<cite data-sq-field="author" class="blockquote__author">${xssSafeContent(author)}</cite>`
              : ''}
          </div>
        </blockquote>
      </section>
    `;
  }
};
