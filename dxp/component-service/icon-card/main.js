import { iconMap } from './iconMap';
// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "componentContent" and "componentConfiguration" properties as input.

export default {
  async main({ componentContent, componentConfiguration }) {
    // "componentContent" contains the content to be displayed (icon, heading, textContent, link).

    // "componentConfiguration" contains user-specific configurations (numberOfColumns).
    const { title, cards } = componentContent;
    const { numberOfColumns } = componentConfiguration;

    // Map numberOfColumns to corresponding CSS classes
    const columnsClassMap = {
      '2 Columns': 'col-2',
      '3 Columns': 'col-3',
      '4 Columns': 'col-4'
    };

    // Determine the correct CSS class for the columns
    const columnsClass = columnsClassMap[numberOfColumns] || 'col-2';

    return html`
      <section class="icon-cards-section">
        <div class="container">
          <!-- Conditionally render title of the section -->
          ${title
            ? html`<h2
                data-sq-field="componentContent.title"
                class="heading-secondary"
              >
                ${xssSafeContent(title)}
              </h2>`
            : ''}

          <ul class="icon-cards ${columnsClass}">
            ${cards
              .map((card, idx) => {
                const iconHtml =
                  card.icon && iconMap[card.icon]
                    ? html`<div class="icon-card__icon">
                        ${iconMap[card.icon].svg}
                      </div>`
                    : '';

                const headingHtml = card.heading
                  ? html`<h3
                      data-sq-field="componentContent.cards[${idx}].heading"
                      class="icon-card__heading"
                    >
                      ${xssSafeContent(card.heading)}
                    </h3>`
                  : '';

                const textContentHtml = html`<p
                  data-sq-field="componentContent.cards[${idx}].textContent"
                  class="icon-card__text"
                >
                  ${xssSafeContent(card.textContent)}
                </p>`;
                // Wrap the entire card content in an <a> tag if a link is provided
                const cardContent = html`
                  ${iconHtml} ${headingHtml} ${textContentHtml}
                `;

                return card.link?.url
                  ? html`
                      <li class="icon-card">
                        <a
                          href="${xssSafeContent(card.link.url)}"
                          target="${card.link.target}"
                          data-sq-field="componentContent.cards[${idx}].link"
                          class="icon-card__wrapper"
                        >
                          ${cardContent}
                        </a>
                      </li>
                    `
                  : html` <li class="icon-card">${cardContent}</li> `;
              })
              .join('')}
          </ul>
        </div>
      </section>
    `;
  }
};
