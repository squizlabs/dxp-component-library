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
  it('should render the title if provided with correct data-sq-field', async () => {
    const result = await Accordion.main(mockData);

    expect(result).toContain(
      '<h2 data-sq-field="title" class="heading-secondary">Accordion Section</h2>'
    );
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = { ...mockData, title: null };
    const result = await Accordion.main(dataWithoutTitle);

    expect(result).not.toContain('<h2');
  });

  it('should not render the title if it is empty', async () => {
    const dataWithoutTitle = { ...mockData, title: '' };
    const result = await Accordion.main(dataWithoutTitle);

    expect(result).not.toContain('<h2');
    expect(result).toContain('<section class="accordion">');
  });

  /* Accordion items */
  it('should render all accordion items with correct data-sq-field', async () => {
    const result = await Accordion.main(mockData);
    const detailsCount = (
      result.match(/<details class="accordion__item">/g) || []
    ).length;
    expect(detailsCount).toBe(mockData.accordion.length);

    mockData.accordion.forEach((item, idx) => {
      expect(result).toContain(`data-sq-field="accordion[${idx}].heading"`);
      expect(result).toContain(`data-sq-field="accordion[${idx}].content"`);
      expect(result).toContain(xssSafeContent(item.heading));
      expect(result).toContain(xssSafeContent(item.content));
    });
  });

  it('should not render accordion items if the array is empty', async () => {
    const emptyAccordionData = { ...mockData, accordion: [] };
    const result = await Accordion.main(emptyAccordionData);

    expect(result).not.toContain('<details class="accordion__item">');
  });

  /* XSS */
  it('should escape XSS in content and headings', async () => {
    const accordionDataWithScripts = {
      ...mockData,
      accordion: [
        {
          heading: '<script>alert("xss-heading")</script>',
          content: '<script>alert("xss-content")</script>'
        },
        {
          heading: '<img src=x onerror=alert(1)>',
          content: '<img src=y onerror=alert(2)>'
        }
      ]
    };

    const result = await Accordion.main(accordionDataWithScripts);

    // Assert escaped content appears
    expect(result).toContain(
      xssSafeContent('<script>alert("xss-heading")</script>')
    );
    expect(result).toContain(
      xssSafeContent('<script>alert("xss-content")</script>')
    );
    expect(result).toContain(xssSafeContent('<img src=x onerror=alert(1)>'));
    expect(result).toContain(xssSafeContent('<img src=y onerror=alert(2)>'));

    // Assert raw content is not present
    expect(result).not.toContain('<script>alert("xss-heading")</script>');
    expect(result).not.toContain('<script>alert("xss-content")</script>');
    expect(result).not.toContain('<img src=x onerror=alert(1)>');
    expect(result).not.toContain('<img src=y onerror=alert(2)>');
  });
});
