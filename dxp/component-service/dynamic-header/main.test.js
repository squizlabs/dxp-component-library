import { xssSafeContent } from '../../utils/xss';
import DynamicHeader, { titleClassMap } from './main.js';

const mockData = {
  title: 'Dynamic Header Component',
  titleLevel: 'h2',
  content: '<p>Text content</p>'
};

const titleLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

describe('Dynamic Header', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await DynamicHeader.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="header-paragraph">');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await DynamicHeader.main(mockData);

    expect(result).toContain(
      '<h2 class="header-paragraph__title heading-secondary">Dynamic Header Component</h2>'
    );
  });

  /* Title Levels */
  titleLevels.forEach((level) => {
    it(`should render ${level} with the correct class`, async () => {
      const mockData = {
        title: 'Dynamic Header Test',
        titleLevel: level,
        content: '<p>Sample Content</p>'
      };

      const result = await DynamicHeader.main(mockData);

      expect(result).toContain(
        `<${level} class="header-paragraph__title ${titleClassMap[level]}">Dynamic Header Test</${level}>`
      );
    });
  });

  /* Text Content */
  it('should render the content if provided', async () => {
    const result = await DynamicHeader.main(mockData);

    expect(result).toContain('<p>Text content</p>');
  });

  it('should not render content if it is null or undefined', async () => {
    const mockDataWithoutContent = {
      ...mockData,
      content: null
    };

    const result = await DynamicHeader.main(mockDataWithoutContent);

    expect(result).not.toContain('<p>');
  });

  /* XSS */
  it('should escape XSS in content', async () => {
    const dynamicHeaderWithScripts = {
      title: '<script>alert("xss")</script>',
      content: '<a href="javascript:alert(1)">Click me</a>'
    };

    const result = await DynamicHeader.main(dynamicHeaderWithScripts);

    const fields = Object.entries(dynamicHeaderWithScripts);

    fields.forEach(([field, value]) => {
      expect(result).toContain(
        xssSafeContent(value),
        `${field} should be safe`
      );
      expect(result).not.toContain(value);
    });
  });
});
