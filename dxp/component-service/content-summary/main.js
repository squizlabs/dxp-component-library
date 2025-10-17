// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "componentContent" properties as input.
export default {
  async main({ componentContent }) {
    // "componentContent" contains the content to be displayed (extContent, link, and contentType).

    const { heading, textContent, link, contentType } = componentContent;

    // The class of the main div is conditionally set based on the variant selected by the user.
    return html`
      <div class="content-summary">
        <!-- Content Type is optional so it's necessary to use conditional rendering for it. -->

        ${contentType
          ? html`<span
              data-sq-field="componentContent.contentType"
              class="text-tag"
              >${xssSafeContent(contentType)}</span
            >`
          : ''}

        <h3 data-sq-field="componentContent.heading">
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
              class="content-summary__link"
              >${xssSafeContent(link.text)}</a
            >`
          : ''}
      </div>
    `;
  }
};
