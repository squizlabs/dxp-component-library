import { xssSafeContent } from '../../utils/xss';
import Blockquote from './main.js';

const mockData = {
  title: 'Blockquote section',
  quote: '<p>Quote content</p>',
  author: 'Author'
};

describe('Blockquote', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await Blockquote.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="blockquote-section">');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await Blockquote.main(mockData);

    expect(result).toContain(
      '<h2 class="heading-secondary">Blockquote section</h2>'
    );
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = { ...mockData, title: null };
    const result = await Blockquote.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
  });

  it('should not render the heading tag if title is empty', async () => {
    const dataWithoutTitle = { ...mockData, title: '' };
    const result = await Blockquote.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
    // Check if it's still render Blockquote Section
    expect(result).toContain('<section class="blockquote-section">');
  });

  /* Quote Content */
  it('should render the blockquote content', async () => {
    const result = await Blockquote.main(mockData);

    expect(result).toContain('<div class="blockquote__content">');
    expect(result).toContain('<p>Quote content</p>');
  });

  /* Author */
  it('should render the author if provided', async () => {
    const result = await Blockquote.main(mockData);

    expect(result).toContain('<cite class="blockquote__author">Author</cite>');
  });

  it('should not render the author tag if it is null or undefined', async () => {
    const dataWithoutAuthor = { ...mockData, author: null };
    const result = await Blockquote.main(dataWithoutAuthor);

    expect(result).not.toContain('<cite class="blockquote__author">');
  });

  /* XSS */
  it('should escape XSS in content', async () => {
    const blockquoteWithScripts = {
      title: '<script>alert("xss")</script>',
      quote: '<img src=x onerror=alert(1)>',
      author: '<a href="javascript:alert(1)">Click me</a>'
    };

    const result = await Blockquote.main(blockquoteWithScripts);

    const fields = Object.entries(blockquoteWithScripts);

    fields.forEach(([field, value]) => {
      expect(result).toContain(
        xssSafeContent(value),
        `${field} should be safe`
      );
      expect(result).not.toContain(value);
    });
  });
});
