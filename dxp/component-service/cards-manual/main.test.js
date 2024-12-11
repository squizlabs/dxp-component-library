import { xssSafeContent } from '../../utils/xss';
import Cards from './main.js';

const mockData = {
  title: 'Cards Section',
  link: {
    text: 'CTA text link',
    url: 'https://squiz.net',
    target: '_blank'
  },
  cards: [
    {
      contentType: 'Content Type Card One',
      heading: 'Heading Card One',
      supportingText: 'Supporting Text Card One',
      link: {
        text: 'CTA Card One',
        url: 'https://squiz.net',
        target: '_blank'
      },
      image: {
        name: 'Img Card One',
        alt: 'Alt Card One',
        imageVariations: {
          original: {
            url: 'https://card-one.png'
          }
        }
      }
    },
    {
      contentType: 'Content Type Card Two',
      heading: 'Heading Card Two',
      supportingText: 'Supporting Text Card Two',
      link: {
        text: 'CTA Card Two',
        url: 'https://squiz.net',
        target: '_blank'
      },
      image: {
        name: 'Img Card Two',
        alt: 'Alt Card Two',
        imageVariations: {
          original: {
            url: 'https://card-two.png'
          }
        }
      }
    }
  ]
};

describe('Cards Manual', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await Cards.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="cards-section">');
  });

  /* Title and Link - header section */
  it('should render the title if provided', async () => {
    const result = await Cards.main(mockData);

    expect(result).toContain('<h2 class="cards__title">Cards Section</h2>');
  });

  it('should render cards header if only title is provided', async () => {
    const dataWithOnlyTitle = { ...mockData, link: null };
    const result = await Cards.main(dataWithOnlyTitle);

    expect(result).toContain('<div class="cards__header">');
    expect(result).toContain('<h2 class="cards__title">Cards Section</h2>');
    expect(result).not.toContain('class="cards__link"');
  });

  it('should render cards header if only link is provided', async () => {
    const dataWithOnlyLink = { ...mockData, title: null };
    const result = await Cards.main(dataWithOnlyLink);

    expect(result).toContain('<div class="cards__header">');
    expect(result).toContain(
      '<a href="https://squiz.net" target="_blank" class="cards__link">CTA text link</a>'
    );
    expect(result).not.toContain('<h2 class="cards__title">');
  });

  it('should not render cards header if neither title nor link is provided', async () => {
    const dataWithoutTitleAndLink = { ...mockData, title: null, link: null };
    const result = await Cards.main(dataWithoutTitleAndLink);

    expect(result).not.toContain('<div class="cards__header">');
    expect(result).not.toContain('class="cards__title"');
    expect(result).not.toContain('class="cards__link"');
  });

  /* Cards */
  it('should render the correct number of cards', async () => {
    const result = await Cards.main(mockData);

    const cleanResult = result.replace(/\s+/g, ' ');
    const cardCount = (cleanResult.match(/<li class="cards__card/g) || [])
      .length;
    expect(cardCount).toBe(mockData.cards.length);
  });

  /* Card elements - all */
  it('should render the first card with correct details', async () => {
    const result = await Cards.main(mockData);

    const firstCard = mockData.cards[0];

    expect(result).toContain('class="cards__heading"');
    expect(result).toContain(firstCard.heading);

    if (firstCard.image) {
      expect(result).toContain('class="cards__image"');
      expect(result).toContain(firstCard.image.imageVariations.original.url);
      expect(result).toContain(firstCard.image.alt);
    }

    if (firstCard.contentType) {
      expect(result).toContain('class="cards__content-type"');
      expect(result).toContain(firstCard.contentType);
    }

    if (firstCard.supportingText) {
      expect(result).toContain('class="cards__supporting-text"');
      expect(result).toContain(firstCard.supportingText);
    }
  });

  /* Card Image */
  it('should add "cards__card--has-image" class when card has an image', async () => {
    const result = await Cards.main(mockData);
    const firstCard = mockData.cards[0];

    if (firstCard.image) {
      expect(result).toContain('cards__card cards__card--has-image');
    }
  });

  it('should not add "cards__card--has-image" class when card does not have an image', async () => {
    const dataWithoutImages = {
      ...mockData,
      cards: mockData.cards.map((card) => ({ ...card, image: null }))
    };
    const result = await Cards.main(dataWithoutImages);

    expect(result).not.toContain('cards__card--has-image');
  });

  /* Card - Link */
  it('should render the correct link for the card', async () => {
    const result = await Cards.main(mockData);
    const firstCard = mockData.cards[0];

    if (firstCard.link) {
      expect(result).toContain(
        `<a href="${firstCard.link.url}" target="${firstCard.link.target}" class="cards__card-link">`
      );
    }
  });

  it('should render heading without a link when link is not provided', async () => {
    const mockDataWithoutLink = {
      ...mockData,
      cards: [{ ...mockData.cards[0], link: null }]
    };

    const result = await Cards.main(mockDataWithoutLink);

    expect(result).toContain('<h3 class="cards__heading">');
    expect(result).not.toContain(
      `<a href="${mockData.cards[0].link?.url}" target="${mockData.cards[0].link?.target}" class="cards__card-link">`
    );
  });

  /* Card - Content Type */
  it('should render contentType when provided', async () => {
    const result = await Cards.main(mockData);

    expect(result).toContain(
      '<p class="cards__content-type">Content Type Card One</p>'
    );
  });

  it('should not render contentType when not provided', async () => {
    const mockDataWithoutContentType = {
      ...mockData,
      cards: [{ ...mockData.cards[0], contentType: null }]
    };

    const result = await Cards.main(mockDataWithoutContentType);

    expect(result).not.toContain('class="cards__content-type"');
  });

  /* Card - Supporting Text */
  it('should render supportingText when provided', async () => {
    const mockDataWithSupportingText = {
      ...mockData,
      cards: [{ ...mockData.cards[0], supportingText: 'Test Supporting Text' }]
    };

    const result = await Cards.main(mockDataWithSupportingText);

    expect(result).toContain(
      '<p class="cards__supporting-text">Test Supporting Text</p>'
    );
  });

  it('should not render supportingText when not provided', async () => {
    const mockDataWithoutSupportingText = {
      ...mockData,
      cards: [{ ...mockData.cards[0], supportingText: null }]
    };

    const result = await Cards.main(mockDataWithoutSupportingText);

    expect(result).not.toContain('class="cards__supporting-text"');
  });
});
