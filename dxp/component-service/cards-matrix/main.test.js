import { mockResolvedData } from './mock-data/mockResolvedData.js';
import { mockDataWrapper } from './mock-data/mockDataWrapper.js';

vi.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve({
    text: () => Promise.resolve(JSON.stringify(mockResolvedData))
  })
);

const env = {
  API_IDENTIFIER: 'api',
  BASE_DOMAIN: 'http://base-domain.com',
  BASE_PATH: '/'
};

import Cards, {
  formatMatrixURItoID,
  formatCardIDsToCSV,
  getData
} from './main.js';

function normalizeHTML(html) {
  return html.replace(/\s+/g, ' ').trim();
}

describe('Cards Matrix - Content', () => {
  /* General Cards */
  it('should render cards fetched from CMS', async () => {
    const mockResolvedData = {
      title: 'CMS Cards',
      link: null,
      cards: [
        { asset: 'matrix-asset://api/45000' },
        { asset: 'matrix-asset://api/44955' }
      ]
    };

    const result = await Cards.main(mockResolvedData, { env });

    const cardsData = mockResolvedData.cards;

    cardsData.forEach((card) => {
      if (card.heading) {
        expect(result).toContain(
          `<h3 class="cards__heading">${card.heading}</h3>`
        );
      }
      if (card.contentType) {
        expect(result).toContain(
          `<p class="cards__content-type">${card.contentType}</p>`
        );
      }
      if (card.supportingText) {
        expect(result).toContain(
          `<p class="cards__supporting-text">${card.supportingText}</p>`
        );
      }
      if (card.image) {
        expect(result).toContain(
          `<img class="cards__image" src="${card.image.url}" alt="${card.image.attributes.alt}" />`
        );
      }
    });
  });

  /* Title and Link - header section */
  it('should render the title if provided', async () => {
    const mockData = { ...mockDataWrapper, cards: [] };

    const result = await Cards.main(mockData, { env });

    expect(result).toContain('<h2 class="cards__title">Cards - Matrix Asset</h2>');
  });

  /* Link - header section */
  it('should render the link if provided', async () => {
    const mockData = {
      ...mockDataWrapper,
      title: null,
      cards: []
    };

    const result = await Cards.main(mockData, { env });

    expect(result).toContain(
      '<a href="https://squiz.net" target="_blank" class="cards__link">CTA text link</a>'
    );
  });

  it('should render valid HTML structure without title and link', async () => {
    const mockData = {
      title: null,
      link: null,
      cards: []
    };

    const result = await Cards.main(mockData, { env });

    expect(result).toBeDefined();
    expect(result).toContain('<section class="cards-section">');
    expect(result).not.toContain('<h2 class="cards__title">');
    expect(result).not.toContain('<a class="cards__link">');
  });

  /* Content Type */
  it('should render "cards__content-type" paragraph when contentType is present and skip it when absent', async () => {
    const mockResolvedData = [
      {
        contentType: 'Test Content Type'
      },
      {
        supportingText: 'Another Supporting Text'
      }
    ];

    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify(mockResolvedData))
      })
    );

    const mockData = {
      title: 'Test Cards With/Without ContentType',
      link: null,
      cards: [
        { asset: 'matrix-asset://api/12345' },
        { asset: 'matrix-asset://api/67890' }
      ]
    };

    const result = await Cards.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    const cardsHTML = normalizedResult.match(
      /<li class="cards__card.*?<\/li>/g
    );

    expect(cardsHTML[0]).toContain(
      '<p class="cards__content-type">Test Content Type</p>'
    );
    expect(cardsHTML[1]).not.toContain('<p class="cards__content-type">');
  });

  /* Supporting Text */
  it('should render "cards__supporting-text" paragraph when supportingText is present and skip it when absent', async () => {
    const modifiedMockResolvedData = mockResolvedData.map((card) => {
      if (card.id === '44955') {
        return { ...card, supportingText: 'Test Supporting Text' };
      }
      if (card.id === '45649') {
        return { ...card, supportingText: null };
      }
      return card;
    });

    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify(modifiedMockResolvedData))
      })
    );

    const mockData = {
      title: 'Test Cards With/Without Supporting Text',
      link: null,
      cards: [
        { asset: 'matrix-asset://api/44955' },
        // Card without Supporting Text
        { asset: 'matrix-asset://api/45649' }
      ]
    };

    const result = await Cards.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    const cardsHTML = normalizedResult.match(
      /<li class="cards__card.*?<\/li>/g
    );

    expect(cardsHTML).toHaveLength(3);
    expect(cardsHTML[0]).toContain(
      '<p class="cards__supporting-text">Test Supporting Text</p>'
    );
    expect(cardsHTML[1]).not.toContain('<p class="cards__supporting-text">');
  });

  /* Card Image */
  it('should add "cards__card--has-image" class when image is present and skip it when absent', async () => {
    const modifiedMockResolvedData = mockResolvedData.map((card) => {
      if (card.id === '44955') {
        return {
          ...card,
          image: {
            url: 'https://example.com/image.jpg',
            attributes: { alt: 'Alt Text' }
          }
        }; // Dodanie obrazka
      }
      if (card.id === '45649') {
        return { ...card, image: null };
      }
      return card;
    });

    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify(modifiedMockResolvedData))
      })
    );

    const mockData = {
      title: 'Test Cards With/Without Image',
      link: null,
      cards: [
        { asset: 'matrix-asset://api/44955' },
        // Card without an image
        { asset: 'matrix-asset://api/45649' }
      ]
    };

    const result = await Cards.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    const cardsHTML = normalizedResult.match(
      /<li class="cards__card.*?<\/li>/g
    );

    expect(cardsHTML[0]).toContain(
      'class="cards__card cards__card--has-image"'
    );
    expect(cardsHTML[0]).toContain(
      '<img class="cards__image" src="https://example.com/image.jpg" alt="Alt Text" />'
    );

    expect(cardsHTML[1]).toContain('class="cards__card"');
    expect(cardsHTML[1]).not.toContain('cards__card--has-image');
    expect(cardsHTML[1]).not.toContain('<img class="cards__image"');
  });
});

describe('Additional Functions to fetch', () => {
  /* formatMatrixURItoID function */
  it('should correctly format Matrix URIs to IDs', () => {
    const mockAssets = [
      { asset: 'matrix-asset://api/12345' },
      { asset: 'matrix-asset://api/67890' }
    ];
    const result = formatMatrixURItoID(mockAssets, 'api');

    expect(result).toEqual(['12345', '67890']);
  });

  /* formatCardIDsToCSV */
  it('should correctly convert IDs to CSV', () => {
    const ids = ['12345', '67890'];
    const result = formatCardIDsToCSV(ids);

    expect(result).toBe('12345,67890');
  });

  /* getData */
  it('should fetch data and return JSON if successful', async () => {
    const mockResponse = [
      {
        id: '12345',
        heading: 'Test Card',
        link: 'https://example.com',
        contentType: 'Content Type',
        supportingText: 'Supporting Text'
      }
    ];

    // Fetch Mock
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          text: () => Promise.resolve(JSON.stringify(mockResponse))
        })
      )
    );

    const result = await getData('12345,67890', 'https://example.com', '/');

    expect(fetch).toHaveBeenCalledWith(
      'https://example.com/cards?ids=12345,67890'
    );
    expect(result).toEqual(mockResponse);
  });

  it('should return undefined if fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject('Fetch error'))
    );

    const result = await getData('12345,67890', 'https://example.com', '/');

    expect(fetch).toHaveBeenCalledWith(
      'https://example.com/cards?ids=12345,67890'
    );
    expect(result).toBeUndefined();
  });
});

describe('Environmental Variables', () => {
  it('should handle missing environment variables', async () => {
    const mockData = {
      title: 'CMS Cards',
      link: null,
      cards: []
    };

    const result = await Cards.main(mockData, {});

    expect(result).toBeDefined();
  });

  it('should use environment variables from info.set.environment when info.env is not available', async () => {
    const mockData = {
      title: 'CMS Cards',
      link: null,
      cards: []
    };

    const mockEnvSet = {
      API_IDENTIFIER: 'api-set',
      BASE_DOMAIN: 'https://set-domain.com',
      BASE_PATH: '/set-path/'
    };

    const result = await Cards.main(mockData, {
      set: { environment: mockEnvSet }
    });

    expect(result).toBeDefined();
  });
});
