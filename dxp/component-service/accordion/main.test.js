import { xssSafeContent } from '../../utils/xss';
import Accordion from './main.js';

const mockData = {
  title: 'Accordion Section',
  accordion: [
    { heading: 'Heading 1', content: 'Content 1' },
    { heading: 'Heading 2', content: 'Content 2' },
    { heading: 'Heading 3', content: 'Content 3' }
  ]
};

describe('Accordion', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await Accordion.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="accordion">');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await Accordion.main(mockData);

    expect(result).toContain(
      '<h2 class="heading-secondary">Accordion Section</h2>'
    );
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = { ...mockData, title: null };
    const result = await Accordion.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
  });

  it('should not render the heading tag if title is empty', async () => {
    const dataWithoutTitle = { ...mockData, title: '' };
    const result = await Accordion.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
    // Check if it's still render Accordion Section
    expect(result).toContain('<section class="accordion">');
  });

  /* Accordion items */
  it('should render all accordion items', async () => {
    const result = await Accordion.main(mockData);
    const detailsCount = (
      result.match(/<details class="accordion__item">/g) || []
    ).length;
    expect(detailsCount).toBe(mockData.accordion.length);
  });

  it('should not render accordion items if the array is empty', async () => {
    const emptyAccordionData = { ...mockData, accordion: [] };
    const result = await Accordion.main(emptyAccordionData);

    expect(result).not.toContain('<details class="accordion__item">');
  });

  /* XSS */
  it('should escape XSS in content', async () => {
    const accordionDataWithScripts = {
      ...mockData,
      accordion: [
        {
          title: 'Heading 1',
          content: '<script>alert("xss")</script>'
        },
        {
          title: 'Heading 2',
          content: '<img src=x onerror=alert(1)>'
        }
      ]
    };

    const result = await Accordion.main(accordionDataWithScripts);

    expect(result).toContain(xssSafeContent('<script>alert("xss")</script>'));
    expect(result).toContain(xssSafeContent('<img src=x onerror=alert(1)>'));
    expect(result).not.toContain('<script>alert("xss")</script>');
    expect(result).not.toContain('<img src=x onerror=alert(1)>');
  });
});
