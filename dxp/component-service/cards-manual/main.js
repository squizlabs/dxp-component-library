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
        ${title ? `<h2 class="cards__title">${xssSafeContent(title)}</h2>` : ''}
        ${link
          ? `<a href="${link.url}" target="${link.target}" class="cards__link">${xssSafeContent(link.text)}</a>
      `
          : ''}
        ${title || link ? `</div>` : ``}

        <ul class="cards">
          <!-- Loop through the "cards" array to create each card. -->
          ${cards
            .map(
              (card) => html`
                <!-- Conditionally add an image class for styling if an image is available -->
                <li
                  class="cards__card${card.image
                    ? ' cards__card--has-image'
                    : ''}"
                >
                  <!-- Conditionally add the card image - use aria-hidden="true" if the image is decorative -->
                  ${card.image
                    ? `<img class="cards__image" src="${card.image.imageVariations.original.url}" alt="${card.image.alt}" />`
                    : ''}

                  <!-- Content Type is optional so it's necessary to apply conditional rendering -->
                  ${card.contentType
                    ? `<p class="cards__content-type">${xssSafeContent(card.contentType)}</p>`
                    : ''}

                  <!-- Output the title, with conditional rendering for the link -->
                  <h3 class="cards__heading">
                    ${card.link
                      ? `<a href="${card.link.url}" target="${card.link.target}" class="cards__card-link">`
                      : ''}
                    ${xssSafeContent(card.heading)} ${card.link ? `</a>` : ''}
                  </h3>

                  <!-- Supporting Text is optional so it's necessary to apply conditional rendering -->
                  ${card.supportingText
                    ? `<p class="cards__supporting-text">${xssSafeContent(card.supportingText)}</p>`
                    : ''}
                </li>
              `
            )
            .join('')}
        </ul>
      </section>
    `;
  }
};
