// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "card" properties as input.
export default {
  async main({ title, link, cards }) {
    return html`
      <section class="cards-section">
        ${title || link ? `<div class="cards__header">` : ``}
        ${title
          ? `<h2 data-sq-field="title" class="cards__title">${xssSafeContent(title)}</h2>`
          : ''}
        ${link
          ? `<a href="${link.url}" target="${link.target}" data-sq-field="link" class="cards__link">${xssSafeContent(link.text)}</a>
      `
          : ''}
        ${title || link ? `</div>` : ``}

        <ul class="cards">
          <!-- Loop through the "cards" array to create each card. -->
          ${cards
            .map(
              (card, idx) => html`
                <!-- Conditionally add an image class for styling if an image is available -->
                <li
                  class="cards__card${card.image
                    ? ' cards__card--has-image'
                    : ''}"
                >
                  <!-- Entire card is wrapped in a link for full clickable area -->
                  <a
                    href="${card.link?.url}"
                    target="${card.link?.target}"
                    class="cards__card-link"
                    data-sq-field="cards[${idx}].link"
                  >
                    <!-- Conditionally add the card image - use aria-hidden="true" if the image is decorative -->
                    ${card.image
                      ? `<img data-sq-field="cards[${idx}].image" class="cards__image" src="${card.image.imageVariations.original.url}" alt="${card.image.alt}" />`
                      : ''}

                    <!-- Content Type is optional so it's necessary to apply conditional rendering -->
                    ${card.contentType
                      ? `<p data-sq-field="cards[${idx}].contentType" class="cards__content-type">${xssSafeContent(card.contentType)}</p>`
                      : ''}

                    <!-- Output the title, with conditional rendering for the link -->
                    <h3 class="cards__heading">
                      <span data-sq-field="cards[${idx}].heading"
                        >${xssSafeContent(card.heading)}</span
                      >
                    </h3>

                    <!-- Supporting Text is optional so it's necessary to apply conditional rendering -->
                    ${card.supportingText
                      ? `<p data-sq-field="cards[${idx}].supportingText" class="cards__supporting-text">${xssSafeContent(card.supportingText)}</p>`
                      : ''}
                  </a>
                </li>
              `
            )
            .join('')}
        </ul>
      </section>
    `;
  }
};
