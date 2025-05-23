// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// For local development and displaying some data if .env file isn't set
import { mockDataWrapper } from './mock-data/mockDataWrapper.js';

// Loop through our selected assets and remove everything except the asset ID
// matrix-asset://api_identifier/12345 becomes 12345
export function formatMatrixURItoID(assets, API_IDENTIFIER) {
  const ids = assets.map((item) =>
    item.asset.replace(`matrix-asset://${API_IDENTIFIER}/`, '')
  );
  return ids;
}

// Format the array of IDs into a comma separated string - eg 12345,12346,12347
export function formatCardIDsToCSV(ids) {
  return ids.join(',');
}

// Function to retrieve the data from Matrix
export async function getData(ids, BASE_DOMAIN, BASE_PATH) {
  try {
    // Use the environment variables to formulate the Matrix URL of the proxy asset
    const query = `${BASE_DOMAIN}${BASE_PATH}cards?ids=${ids}`;

    // Set up the fetch
    const response = await fetch(query);
    const text = await response.text();

    // Attempt to parse the response
    const data = JSON.parse(text);

    // Return the JSON data for our cardsData
    return data;
  } catch {
    // There is no data, or it could not be formatted (not JSON)
    console.error('Data could not be found');

    // Return undefined for our tertiary check on cardsData
    return undefined;
  }
}

// This module takes an object with "card" properties as input. Info provides further context, such as our environment variables
export default {
  async main({ title, link, cards }, info) {
    // Get our environment variables
    const { API_IDENTIFIER, BASE_DOMAIN, BASE_PATH } =
      info.env || (info.set && info.set.environment) || {};

    let cardsData;

    if (API_IDENTIFIER && BASE_DOMAIN && BASE_PATH) {
      // Format our selected Matrix assets (cards) into an array of IDs [12345,12346,12347]
      const idsArray = formatMatrixURItoID(cards, API_IDENTIFIER);

      // Format the array to a comma separated string "[12345,12346,12347]"
      const ids = formatCardIDsToCSV(idsArray);

      // Fetch the card data from Matrix
      cardsData = await getData(ids, BASE_DOMAIN, BASE_PATH);
    } else {
      // Fallback to mock data if environment variables are not set
      console.warn('Environment variables not set, using mock data');
      cardsData = mockDataWrapper.cards;
      title = mockDataWrapper.title;
      link = mockDataWrapper.link;
    }

    return html`
      <section class="cards-section">
        ${title || link ? `<div class="cards__header">` : ``}
        ${title
          ? `<h2 data-sq-field="title" class="cards__title">${xssSafeContent(title)}</h2>`
          : ''}
        ${link
          ? `<a href="${link.url}" target="${link.target}"  data-sq-field="link" class="cards__link">${xssSafeContent(link.text)}</a>`
          : ''}
        ${title || link ? `</div>` : ``}

        <ul class="cards">
          <!-- Loop through the "cards" array to create each card. -->
          ${cardsData
            ? cardsData
                .map(
                  (card) => html`
                    <!-- Conditionally add an image class for styling if an image is available -->
                    <li
                      class="cards__card${card.image?.url
                        ? ' cards__card--has-image'
                        : ''}"
                    >
                      <!-- Entire card is wrapped in a link for full clickable area -->
                      <a href="${card.link}" class="cards__card-link">
                        <!-- Conditionally add the image - use aria-hidden="true" if the image is decorative -->
                        ${card.image?.url
                          ? `<img class="cards__image" src="${card.image.url}" alt="${card.image.attributes.alt}" />`
                          : ''}

                        <!-- Content Type is optional so it's necessary to apply conditional rendering -->
                        ${card.contentType
                          ? `<p class="cards__content-type">${card.contentType}</p>`
                          : ''}

                        <!-- Output the title, with conditional rendering for the link -->
                        <h3 class="cards__heading">
                          <span>${card.heading}</span>
                        </h3>

                        <!-- Supporting Text is optional so it's necessary to apply conditional rendering -->
                        ${card.supportingText
                          ? `<p class="cards__supporting-text">${card.supportingText}</p>`
                          : ''}
                      </a>
                    </li>
                  `
                )
                .join('')
            : ''}
        </ul>
      </section>
    `;
  }
};
