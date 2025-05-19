// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// This module takes an object with "stats" properties as input.
export default {
  async main({ stats, title }) {
    return html`
      <section class="stats-cards-section">
        <!-- Conditionally render title of the section -->
        ${title
          ? `<h2 class="stats-cards__title heading-secondary" data-sq-field="title">${xssSafeContent(title)}</h2>`
          : ''}

        <ul class="stats-cards">
          <!-- We loop through the "stats" array to create each card. The "stats" array is expected to contain exactly 4 items, each with a "value" and "text" property. -->
          ${stats
            .map(({ value, text }, index) => {
              return `
                <li class="stat-card">
                  <h3 class="stat-card__value" data-sq-field="stats[${index}].value">
                    ${xssSafeContent(value)}
                  </h3>

                  <!-- Supporting Text is optional so it's necessary to apply conditional rendering -->

                  ${
                    text
                      ? `<p class="stat-card__text" data-sq-field="stats[${index}].text">${xssSafeContent(text)}</p>`
                      : ''
                  }
                </li>
              `;
            })
            .join('')}
        </ul>
      </section>
    `;
  }
};
