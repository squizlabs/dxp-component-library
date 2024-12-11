import { xssSafeContent } from '../../utils/xss';
import IconCards from './main.js';
import { iconMap } from './iconMap';

const mockData = {
  componentContent: {
    title: 'Icon Cards Section',
    cards: [
      {
        heading: 'Heading 1',
        icon: 'paintBucket',
        textContent: 'Content 1',
        link: {
          text: 'CTA 1',
          url: 'https://squiz.net',
          target: '_blank'
        }
      },
      {
        icon: 'pen',
        textContent: 'Content 2',
        link: {
          text: 'CTA 2',
          url: 'https://squiz.net',
          target: '_blank'
        }
      },
      {
        heading: 'Heading 3',
        icon: 'tools',
        textContent: 'Content 3'
      }
    ]
  },
  componentConfiguration: {
    numberOfColumns: '4 Columns'
  }
};

const columnTestCases = [
  { numberOfColumns: '2 Columns', expectedClass: 'col-2' },
  { numberOfColumns: '3 Columns', expectedClass: 'col-3' },
  { numberOfColumns: '4 Columns', expectedClass: 'col-4' }
];

describe('Icon Cards', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await IconCards.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="icon-cards-section">');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await IconCards.main(mockData);

    expect(result).toContain(
      '<h2 class="heading-secondary">Icon Cards Section</h2>'
    );
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = {
      ...mockData,
      componentContent: { ...mockData.componentContent, title: null }
    };
    const result = await IconCards.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
  });

  it('should not render the title if it is empty', async () => {
    const dataWithoutTitle = {
      ...mockData,
      componentContent: { ...mockData.componentContent, title: '' }
    };
    const result = await IconCards.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
    // Check if Icon Cards section is still rendered
    expect(result).toContain('<section class="icon-cards-section">');
  });

  /* Items - Icon Cards */
  it('should render all Icon Cards', async () => {
    const result = await IconCards.main(mockData);

    const cardsCount = (result.match(/<li class="icon-card">/g) || []).length;

    expect(cardsCount).toBe(mockData.componentContent.cards.length);
  });

  it('should not render Icon Cards items if the array is empty', async () => {
    const emptyIconCardsData = {
      ...mockData,
      componentContent: { ...mockData.componentContent, cards: [] }
    };
    const result = await IconCards.main(emptyIconCardsData);

    expect(result.match(/<li class="icon-card">/g)).toBeNull();
  });

  /* Icon Types */
  it('should only accept valid icon types', async () => {
    const validIcons = ['paintBucket', 'pen', 'printer', 'tools'];

    mockData.componentContent.cards.forEach((card) => {
      expect(validIcons).toContain(card.icon);
    });
  });

  it('should render icon if it exists in iconMap', async () => {
    const result = await IconCards.main(mockData);

    mockData.componentContent.cards.forEach((card) => {
      if (iconMap[card.icon]) {
        expect(result).toContain(`<div class="icon-card__icon">`);
        expect(result).toContain(iconMap[card.icon].svg);
      }
    });
  });

  it('should not render icon if icon is undefined or null', async () => {
    const noIconData = {
      ...mockData,
      componentContent: {
        ...mockData.componentContent,
        cards: [
          ...mockData.componentContent.cards,
          { heading: 'No Icon', icon: null, textContent: 'Content' }
        ]
      }
    };

    const result = await IconCards.main(noIconData);

    const lastCardHtml = result.split('<li class="icon-card">').pop();

    expect(lastCardHtml).not.toContain('<div class="icon-card__icon">');
  });

  /* Column Numbers */
  it('should only accept valid column names', async () => {
    const validColumns = ['2 Columns', '3 Columns', '4 Columns'];

    expect(validColumns).toContain(
      mockData.componentConfiguration.numberOfColumns
    );
  });

  columnTestCases.forEach(({ numberOfColumns, expectedClass }) => {
    it(`should set CSS class to ${expectedClass} when numberOfColumns is ${numberOfColumns}`, async () => {
      const testData = {
        ...mockData,
        componentConfiguration: {
          ...mockData.componentConfiguration,
          numberOfColumns
        }
      };

      const result = await IconCards.main(testData);

      expect(result).toContain(`<ul class="icon-cards ${expectedClass}">`);
    });
  });

  it('should default to 2 columns if numberOfColumns is not provided', async () => {
    const dataWithoutColumns = {
      ...mockData,
      componentConfiguration: {
        ...mockData.componentConfiguration,
        numberOfColumns: undefined
      }
    };

    const result = await IconCards.main(dataWithoutColumns);

    expect(result).toContain('<ul class="icon-cards col-2">');
  });

  /* Card Heading */
  it('should render card heading if provided', async () => {
    const result = await IconCards.main(mockData);

    mockData.componentContent.cards.forEach((card) => {
      if (card.heading) {
        expect(result).toContain(
          `<h3 class="icon-card__heading">${card.heading}</h3>`
        );
      }
    });
  });

  /* Card Text Content */
  it('should render card text content if provided', async () => {
    const result = await IconCards.main(mockData);

    mockData.componentContent.cards.forEach((card) => {
      if (card.textContent) {
        expect(result).toContain(
          `<p class="icon-card__text">${card.textContent}</p>`
        );
      }
    });
  });

  /* Card Link */
  it('should render links for cards if provided', async () => {
    const result = await IconCards.main(mockData);

    mockData.componentContent.cards.forEach((card) => {
      if (card.link) {
        const expectedLink = `<a href="${card.link.url}" target="_blank" class="icon-card__wrapper"`;
        expect(result).toContain(expectedLink);
      }
    });
  });

  it('should not render link if not provided', async () => {
    const noLinkData = {
      ...mockData,
      componentContent: {
        ...mockData.componentContent,
        cards: mockData.componentContent.cards.map((card) => ({
          ...card,
          link: null
        }))
      }
    };

    const result = await IconCards.main(noLinkData);

    expect(result).not.toContain('<a href=');
  });

  /* XSS */
  it('should sanitize all fields to prevent XSS', async () => {
    const iconCardsWithScripts = {
      componentContent: {
        title: '<script>alert("xss")</script>',
        cards: [
          {
            heading: '<script>alert("xss")</script>',
            icon: 'paintBucket',
            textContent: 'Content',
            link: {
              text: 'CTA 1',
              url: 'https://squiz.net',
              target: '_blank'
            }
          }
        ]
      },
      componentConfiguration: {
        numberOfColumns: 4
      }
    };

    const result = await IconCards.main(iconCardsWithScripts);

    expect(result).toContain(
      xssSafeContent(iconCardsWithScripts.componentContent.title)
    );
    expect(result).toContain(
      xssSafeContent(iconCardsWithScripts.componentContent.cards[0].heading)
    );

    expect(result).not.toContain('<script>alert("xss")</script>');
    expect(result).not.toContain('<svg onload=alert(1)>');
  });
});
