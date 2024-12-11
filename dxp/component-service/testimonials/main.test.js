import { xssSafeContent } from '../../utils/xss';
import Testimonials from './main.js';

const mockData = {
  title: 'Testimonials Section',
  testimonials: [
    { text: 'This is a great product!', author: 'John Doe' },
    { text: 'I love it!', author: 'Jane Smith' },
    { text: 'Highly recommend to everyone.', author: 'Someone Famous' }
  ]
};

describe('Testimonials', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await Testimonials.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="testimonials-section">');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await Testimonials.main(mockData);

    expect(result).toContain(
      '<h2 class="heading-secondary">Testimonials Section</h2>'
    );
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = { ...mockData, title: null };
    const result = await Testimonials.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
  });

  it('should not render the heading tag if title is empty', async () => {
    const dataWithoutTitle = { ...mockData, title: '' };
    const result = await Testimonials.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
    expect(result).toContain('<section class="testimonials-section">');
  });

  /* Testimonials items */
  it('should render all testimonials items', async () => {
    const result = await Testimonials.main(mockData);
    const listItemCount = (
      result.match(/<li role="group" aria-roledescription="slide">/g) || []
    ).length;
    expect(listItemCount).toBe(mockData.testimonials.length);
  });

  it('should not render testimonials items if the array is empty', async () => {
    const emptyTestimonialsData = { ...mockData, testimonials: [] };
    const result = await Testimonials.main(emptyTestimonialsData);

    expect(result).not.toContain(
      '<li role="group" aria-roledescription="slide">'
    );
  });

  /* XSS */
  it('should escape XSS in testimonials content', async () => {
    const testimonialsDataWithScripts = {
      ...mockData,
      testimonials: [
        {
          text: '<script>alert("xss")</script>',
          author: '<img src=x onerror=alert(1)>'
        }
      ]
    };

    const result = await Testimonials.main(testimonialsDataWithScripts);

    expect(result).toContain(xssSafeContent('<script>alert("xss")</script>'));
    expect(result).toContain(xssSafeContent('<img src=x onerror=alert(1)>'));
    expect(result).not.toContain('<script>alert("xss")</script>');
    expect(result).not.toContain('<img src=x onerror=alert(1)>');
  });
});
