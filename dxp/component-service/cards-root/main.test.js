import { mockRootNodeData } from './mock-data/mockRootNodeData';
import CardsMatrixRoot from './main.js';

vi.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve({
    text: () => Promise.resolve(JSON.stringify(mockRootNodeData))
  })
);

const env = {
  API_IDENTIFIER: 'api-identifier',
  BASE_DOMAIN: 'http://base-domain.com',
  BASE_PATH: '/'
};

function normalizeHTML(html) {
  return html.replace(/\s+/g, ' ').trim();
}

describe('Cards Matrix Root - Content', () => {
  it('should render valid HTML structure with rootnode', async () => {
    const mockData = {
      title: 'Cards from Root Node',
      link: null,
      rootnode: 'matrix-asset://api-identifier/12345'
    };

    const result = await CardsMatrixRoot.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    expect(result).toBeDefined();
    expect(normalizedResult).toContain('<section class="cards-section">');
    expect(normalizedResult).toContain(
      '<h2 class="cards__title">Cards from Root Node</h2>'
    );
  });

  it('should render cards fetched from rootnode', async () => {
    const mockData = {
      title: 'Cards from Root Node',
      link: null,
      rootnode: 'matrix-asset://api-identifier/12345'
    };

    const result = await CardsMatrixRoot.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    const cardsHTML = normalizedResult.match(
      /<li class="cards__card.*?<\/li>/g
    );

    expect(cardsHTML).toHaveLength(mockRootNodeData.length);

    expect(cardsHTML[0]).toContain('<h3 class="cards__heading">');
    expect(cardsHTML[0]).toContain('<p class="cards__content-type">Type 1</p>');
    expect(cardsHTML[0]).toContain(
      '<p class="cards__supporting-text">Supporting text for card 1</p>'
    );
    expect(cardsHTML[0]).toContain(
      '<img class="cards__image" src="https://example.com/image1.jpg" alt="Alt Text 1" />'
    );

    expect(cardsHTML[1]).toContain('<h3 class="cards__heading">');
    expect(cardsHTML[1]).toContain('<p class="cards__content-type">Type 2</p>');
    expect(cardsHTML[1]).toContain(
      '<p class="cards__supporting-text">Supporting text for card 2</p>'
    );
    expect(cardsHTML[1]).not.toContain('<img class="cards__image"');
  });

  it('should handle empty rootnode data', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify([]))
      })
    );

    const mockData = {
      title: 'Empty Root Node',
      link: null,
      rootnode: 'matrix-asset://api-identifier/12345'
    };

    const result = await CardsMatrixRoot.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    expect(normalizedResult).toContain('<section class="cards-section">');
    expect(normalizedResult).not.toContain('<li class="cards__card">');
  });

  it('should render the link if provided', async () => {
    const mockData = {
      title: 'Cards with Link',
      link: {
        text: 'Go to Squiz',
        url: 'https://squiz.net',
        target: '_blank'
      },
      rootnode: 'matrix-asset://api-identifier/12345'
    };

    const result = await CardsMatrixRoot.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    expect(normalizedResult).toContain(
      '<a href="https://squiz.net" target="_blank" class="cards__link">Go to Squiz</a>'
    );
  });

  it('should render valid HTML structure without title and link', async () => {
    const mockData = {
      title: null,
      link: null,
      rootnode: 'matrix-asset://api-identifier/12345'
    };

    const result = await CardsMatrixRoot.main(mockData, { env });
    const normalizedResult = normalizeHTML(result);

    expect(normalizedResult).toContain('<section class="cards-section">');
    expect(normalizedResult).not.toContain('<h2 class="cards__title">');
    expect(normalizedResult).not.toContain('<a class="cards__link">');
  });
});

describe('Cards Matrix Root - Error Handling', () => {
  it('should handle fetch error and return undefined', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch error'))
    );

    const mockData = {
      title: 'Cards Error Test',
      link: null,
      rootnode: 'matrix-asset://api-identifier/12345'
    };

    const result = await CardsMatrixRoot.main(mockData, { env });

    expect(result).toBeDefined();
    expect(normalizeHTML(result)).toContain('<section class="cards-section">');
    expect(normalizeHTML(result)).not.toContain('<li class="cards__card">');
  });

  it('should handle invalid JSON response and return undefined', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        text: () => Promise.resolve('Invalid JSON')
      })
    );

    const mockData = {
      title: 'Invalid JSON Test',
      link: null,
      rootnode: 'matrix-asset://api-identifier/12345'
    };

    const result = await CardsMatrixRoot.main(mockData, { env });

    expect(result).toBeDefined();
    expect(normalizeHTML(result)).toContain('<section class="cards-section">');
    expect(normalizeHTML(result)).not.toContain('<li class="cards__card">');
  });
});
describe('Cards Matrix Root - Optional Fields', () => {
  const mockDataBase = {
    title: 'Test Cards Matrix Root',
    link: null,
    rootnode: 'matrix-asset://api-identifier/12345'
  };

  const mockEnv = {
    API_IDENTIFIER: 'api-identifier',
    BASE_DOMAIN: 'https://example.com',
    BASE_PATH: '/api/'
  };

  const mockCardsData = [
    {
      id: 'card1',
      heading: 'Card 1',
      contentType: 'Content Type 1',
      supportingText: 'Supporting Text 1',
      link: 'https://example.com/card1',
      image: {
        url: 'https://example.com/image1.jpg',
        attributes: { alt: 'Alt Text 1' }
      }
    },
    {
      id: 'card2',
      heading: 'Card 2',
      contentType: null,
      supportingText: 'Supporting Text 2',
      link: null
    },
    {
      id: 'card3',
      heading: 'Card 3',
      contentType: 'Content Type 3',
      supportingText: null,
      link: 'https://example.com/card3'
    }
  ];

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        text: () => Promise.resolve(JSON.stringify(mockCardsData))
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render contentType if provided and skip if absent', async () => {
    const result = await CardsMatrixRoot.main(mockDataBase, { env: mockEnv });
    const normalizedResult = normalizeHTML(result);

    const cardsHTML = normalizedResult.match(
      /<li class="cards__card.*?<\/li>/g
    );

    expect(cardsHTML).toHaveLength(3);

    expect(cardsHTML[0]).toContain(
      '<p class="cards__content-type">Content Type 1</p>'
    );
    expect(cardsHTML[1]).not.toContain('<p class="cards__content-type">');
    expect(cardsHTML[2]).toContain(
      '<p class="cards__content-type">Content Type 3</p>'
    );
  });

  it('should render heading as link if link is provided, plain text if not', async () => {
    const result = await CardsMatrixRoot.main(mockDataBase, { env: mockEnv });
    const normalizedResult = normalizeHTML(result);

    const cardsHTML = normalizedResult.match(
      /<li class="cards__card.*?<\/li>/g
    );

    expect(cardsHTML).toHaveLength(3);

    // First card has a link
    expect(cardsHTML[0]).toContain('<h3 class="cards__heading">');
    expect(cardsHTML[0]).toContain(
      '<a href="https://example.com/card1" class="cards__card-link">'
    );
    expect(cardsHTML[0]).toContain('Card 1');
    expect(cardsHTML[0]).toContain('</a>');

    // Second card does not have a link
    expect(cardsHTML[1]).toContain('<h3 class="cards__heading">');
    expect(cardsHTML[1]).toContain('Card 2');
    expect(cardsHTML[1]).not.toContain('<a');
    expect(cardsHTML[1]).not.toContain('</a>');

    // Third card has a link
    expect(cardsHTML[2]).toContain('<h3 class="cards__heading">');
    expect(cardsHTML[2]).toContain(
      '<a href="https://example.com/card3" class="cards__card-link">'
    );
    expect(cardsHTML[2]).toContain('Card 3');
    expect(cardsHTML[2]).toContain('</a>');
  });

  it('should render supportingText if provided and skip if absent', async () => {
    const result = await CardsMatrixRoot.main(mockDataBase, { env: mockEnv });
    const normalizedResult = normalizeHTML(result);

    const cardsHTML = normalizedResult.match(
      /<li class="cards__card.*?<\/li>/g
    );

    expect(cardsHTML).toHaveLength(3);

    expect(cardsHTML[0]).toContain(
      '<p class="cards__supporting-text">Supporting Text 1</p>'
    );
    expect(cardsHTML[1]).toContain(
      '<p class="cards__supporting-text">Supporting Text 2</p>'
    );
    expect(cardsHTML[2]).not.toContain('<p class="cards__supporting-text">');
  });
});

describe('Environmental Variables', () => {
  it('should handle missing environment variables', async () => {
    const mockDataBase = {
      title: 'Test Cards with Environment Variables',
      rootnode: 'matrix-asset://api-env/12345'
    };

    const result = await CardsMatrixRoot.main(mockDataBase, {});

    expect(result).toBeDefined();
  });

  it('should use environment variables from info.set.environment when info.env is not available', async () => {
    const mockData = {
      title: 'Test Cards with Set Environment Variables',
      rootnode: 'matrix-asset://api-set/12345'
    };

    const mockEnvSet = {
      API_IDENTIFIER: 'api-set',
      BASE_DOMAIN: 'https://set-domain.com',
      BASE_PATH: '/set-path/'
    };

    vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        text: () =>
          Promise.resolve(
            JSON.stringify([
              {
                heading: 'Card from set.environment',
                contentType: 'Set Content Type'
              }
            ])
          )
      })
    );

    const result = await CardsMatrixRoot.main(mockData, {
      set: { environment: mockEnvSet }
    });

    const expectedURL =
      'https://set-domain.com/set-path/cards-matrix-root?node=12345';

    expect(fetch).toHaveBeenCalledWith(expectedURL);

    const normalizedResult = result.replace(/\s+/g, ' ').trim();
    expect(normalizedResult).toContain(
      '<h3 class="cards__heading"> Card from set.environment </h3>'
    );
    expect(normalizedResult).toContain(
      '<p class="cards__content-type">Set Content Type</p>'
    );
  });
});
