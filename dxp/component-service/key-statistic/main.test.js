import { xssSafeContent } from '../../utils/xss';
import KeyStatistics from './main.js';

const mockData = {
  title: 'Key Statistics Section',
  stats: [
    { value: '1234', text: 'Content 1' },
    { value: '0.01', content: 'Content 2' },
    { value: '20$', content: 'Content 3' }
  ]
};

describe('Key Statistics', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await KeyStatistics.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="stats-cards-section">');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await KeyStatistics.main(mockData);

    expect(result).toContain(
      '<h2 class="stats-cards__title heading-secondary">Key Statistics Section</h2>'
    );
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = { ...mockData, title: null };
    const result = await KeyStatistics.main(dataWithoutTitle);

    expect(result).not.toContain(
      '<h2 class="stats-cards__title heading-secondary">'
    );
  });

  it('should not render the heading tag if title is empty', async () => {
    const dataWithoutTitle = { ...mockData, title: '' };
    const result = await KeyStatistics.main(dataWithoutTitle);

    expect(result).not.toContain(
      '<h2 class="stats-cards__title heading-secondary">'
    );
    // Check if it's still render Key Statistics Section
    expect(result).toContain('<section class="stats-cards-section">');
  });

  /* Items - Stats */
  it('should render all stats items', async () => {
    const result = await KeyStatistics.main(mockData);

    const statsCount = (result.match(/<li class="stat-card">/g) || []).length;

    expect(statsCount).toBe(mockData.stats.length);
  });

  it('should not render Key Statistics items if the array is empty', async () => {
    const emptyKeyStats = { ...mockData, stats: [] };
    const result = await KeyStatistics.main(emptyKeyStats);

    expect(result).not.toContain('<li class="stat-card">');
  });

  /* XSS */
  it('should escape XSS in stats content', async () => {
    const statsDataWithScripts = {
      ...mockData,
      stats: [
        { value: '<script>alert("xss")</script>', text: 'Safe text 1' },
        { value: '100', text: '<img src=x onerror=alert(1)>' }
      ]
    };

    const result = await KeyStatistics.main(statsDataWithScripts);

    expect(result).toContain(xssSafeContent('<script>alert("xss")</script>'));
    expect(result).toContain(xssSafeContent('<img src=x onerror=alert(1)>'));

    expect(result).not.toContain('<script>alert("xss")</script>');
    expect(result).not.toContain('<img src=x onerror=alert(1)>');
  });
});
