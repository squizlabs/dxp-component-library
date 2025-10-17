import { expect } from 'vitest';
import { xssSafeContent } from '../../utils/xss';
import ContentSummary from './main.js';

const mockData = {
  componentContent: {
    title: 'Section Title',
    contentType: 'Content type',
    heading: 'Content Heading',
    textContent: '<p>Text Content</p>',
    link: {
      text: 'CTA text link',
      url: 'https://squiz.net',
      target: '_blank'
    }
  }
};

describe('Content Summary', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await ContentSummary.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('content-summary');
  });

  /* Content Heading */
  it('should render the Content Heading if provided', async () => {
    const result = await ContentSummary.main(mockData);

    expect(result).toContain('Content Heading');
  });

  /* Content Type */
  it('should render the Content Type if provided', async () => {
    const result = await ContentSummary.main(mockData);

    expect(result).toContain('Content type');
  });

  it('should not render the Content Type if provided', async () => {
    const noContentTypeMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, contentType: null }
    };
    const result = await ContentSummary.main(noContentTypeMock);

    expect(result).not.toContain('text-tag');
  });

  /* Text Content */
  it('should render the Text Content correctly', async () => {
    const result = await ContentSummary.main(mockData);

    expect(result).toContain('Text Content');
  });

  /* Link */
  it('should render the link if provided', async () => {
    const result = await ContentSummary.main(mockData);

    expect(result).toContain('https://squiz.net');
    expect(result).toContain('CTA text link');
  });

  it('should not render the link if it is missing', async () => {
    const noLinkMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, link: null }
    };
    const result = await ContentSummary.main(noLinkMock);

    expect(result).not.toContain('content-summary__link');
  });

  /* XSS */
  it('should sanitize all fields to prevent XSS', async () => {
    const ContentSummaryWithScripts = {
      componentContent: {
        textContent: '<img src=x onerror=alert(1)>',
        heading: '<svg onload=alert(1)>',
        contentType: '<b>bad()</b>',
        link: {
          text: '<a href="javascript:alert(1)">Click me</a>'
        }
      }
    };

    const result = await ContentSummary.main(ContentSummaryWithScripts);

    expect(result).toContain(
      xssSafeContent(ContentSummaryWithScripts.componentContent.textContent)
    );
    expect(result).toContain(
      xssSafeContent(ContentSummaryWithScripts.componentContent.heading)
    );
    expect(result).toContain(
      xssSafeContent(ContentSummaryWithScripts.componentContent.contentType)
    );
    expect(result).toContain(
      xssSafeContent(ContentSummaryWithScripts.componentContent.link.text)
    );

    expect(result).not.toContain('<script>alert("xss")</script>');
    expect(result).not.toContain('<svg onload=alert(1)>');
    expect(result).not.toContain('<img src=x onerror=alert(1)>');
    expect(result).not.toContain('href="javascript:alert(1)"');
  });
});
