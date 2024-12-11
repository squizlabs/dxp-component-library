// Utility function to render raw HTML without extra parsing
import { html } from '../../utils/html';
// Sanitizes dynamic content to prevent XSS attacks
import { xssSafeContent } from '../../utils/xss';

// For local development and displaying data if .env file isn't set
import { mockDataWrapper } from './mock-data/mockDataWrapper.js';

// Remove everything except the asset ID from the Matrix Asset URI supplied
// matrix-asset://api_identifier/12345 becomes 12345
function formatMatrixURItoID(asset, API_IDENTIFIER) {
  return asset.replace(`matrix-asset://${API_IDENTIFIER}/`, '');
}

// Function to retrieve the data from Matrix
export async function getData(rootnode, BASE_DOMAIN, BASE_PATH) {
  try {
    // Use the environment variables to formulate the Matrix URL of the proxy asset
    const query = `${BASE_DOMAIN}${BASE_PATH}cards-matrix-root?node=${rootnode}`;

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

// This module takes an object with a rootnode asset as input. Info provides further context, such as our environment variables
export default {
  async main({ title, link, rootnode }, info) {
    // Get our environment variables
    const { API_IDENTIFIER, BASE_DOMAIN, BASE_PATH } =
      info.env || (info.set && info.set.environment) || {};

    let cardsData;

    if (API_IDENTIFIER && BASE_DOMAIN && BASE_PATH) {
      // Format our selected Matrix asset URI into an asset ID
      const rootNodeId = formatMatrixURItoID(rootnode, API_IDENTIFIER);

      // Fetch the card data from Matrix
      cardsData = await getData(rootNodeId, BASE_DOMAIN, BASE_PATH);
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
        ${title ? `<h2 class="cards__title">${xssSafeContent(title)}</h2>` : ''}
        ${link
        ? `<a href="${link.url}" target="${link.target}" class="cards__link">${xssSafeContent(link.text)}</a>`
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
                        ${card.link
                ? `<a href="${card.link}" class="cards__card-link">`
                : ''}
                        ${card.heading} ${card.link ? `</a>` : ''}
                      </h3>

                      <!-- Supporting Text is optional so it's necessary to apply conditional rendering -->
                      ${card.supportingText
                ? `<p class="cards__supporting-text">${card.supportingText}</p>`
                : ''}
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
