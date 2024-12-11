import { expect } from 'vitest';
import { xssSafeContent } from '../../utils/xss';
import SingleColumn from './main.js';

const mockData = {
  componentContent: {
    title: 'Section Title',
    image: {
      name: 'My Image',
      alt: 'Alt Image',
      imageVariations: {
        original: {
          url: 'https://picsum.photos/800/600'
        }
      }
    },
    contentType: 'Content type',
    heading: 'Content Heading',
    textContent: '<p>Text Content</p>',
    link: {
      text: 'CTA text link',
      url: 'https://squiz.net',
      target: '_blank'
    }
  },
  componentConfiguration: {
    variant: 'text-right'
  }
};

describe('Single Column', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('<section class="single-column-section">');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain(
      '<h2 class="heading-secondary">Section Title</h2>'
    );
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = {
      ...mockData,
      componentContent: {
        ...mockData.componentContent,
        title: null
      }
    };
    const result = await SingleColumn.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
  });

  it('should not render the heading tag if title is empty', async () => {
    const dataWithoutTitle = {
      ...mockData,
      componentContent: {
        ...mockData.componentContent,
        title: ''
      }
    };
    const result = await SingleColumn.main(dataWithoutTitle);

    expect(result).not.toContain('<h2 class="heading-secondary">');
    // Check if it's still render Single Column Section
    expect(result).toContain('<section class="single-column-section">');
  });

  /* Image */
  it('should render the image if provided', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain('<div class="single-column__image">');
    expect(result).toContain(
      mockData.componentContent.image.imageVariations.original.url
    );
    expect(result).toContain(mockData.componentContent.image.alt);
  });

  it('should not render the image section if image is missing', async () => {
    const noImageMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, image: null }
    };
    const result = await SingleColumn.main(noImageMock);

    expect(result).not.toContain('<div class="single-column__image">');
    expect(result).toContain('class="single-column text-right no-image"');
  });

  /* Content Heading */
  it('should render the Content Heading if provided', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain(
      '<h3 class="single-column__heading">Content Heading</h3>'
    );
  });

  /* Content Type */
  it('should render the Content Type if provided', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain('class="text-tag"');
  });

  it('should not render the Content Type if provided', async () => {
    const noContentTypeMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, contentType: null }
    };
    const result = await SingleColumn.main(noContentTypeMock);

    expect(result).not.toContain('<span class="text-tag">');
  });

  /* Text Content */
  it('should render the Text Content correctly', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain('<p>Text Content</p>');
  });

  /* Text Content */
  it('should render the Text Content correctly', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain('<p>Text Content</p>');
  });

  /* Link */
  it('should render the link if provided', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain('href="https://squiz.net"');
    expect(result).toContain('class="single-column__link"');
  });

  it('should not render the link if it is missing', async () => {
    const noLinkMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, link: null }
    };
    const result = await SingleColumn.main(noLinkMock);

    expect(result).not.toContain('<a href="');
  });

  /* Left-Right settings */
  it('should apply the "text-right" class if variant is text-right', async () => {
    const result = await SingleColumn.main(mockData);

    expect(result).toContain('class="single-column text-right');
    expect(result).not.toContain('class="single-column text-left');
  });

  it('should apply the "text-left" class if variant is text-left', async () => {
    const mockTextLeft = {
      ...mockData,
      componentConfiguration: { variant: 'text-left' }
    };

    const result = await SingleColumn.main(mockTextLeft);

    expect(result).toContain('class="single-column text-left');
    expect(result).not.toContain('class="single-column text-right');
  });

  /* XSS */
  it('should sanitize all fields to prevent XSS', async () => {
    const singleColumnWithScripts = {
      componentContent: {
        title: '<script>alert("xss")</script>',
        textContent: '<img src=x onerror=alert(1)>',
        heading: '<svg onload=alert(1)>',
        link: {
          text: '<a href="javascript:alert(1)">Click me</a>'
        }
      },
      componentConfiguration: {
        variant: 'text-right'
      }
    };

    const result = await SingleColumn.main(singleColumnWithScripts);

    expect(result).toContain(
      xssSafeContent(singleColumnWithScripts.componentContent.title)
    );
    expect(result).toContain(
      xssSafeContent(singleColumnWithScripts.componentContent.textContent)
    );
    expect(result).toContain(
      xssSafeContent(singleColumnWithScripts.componentContent.heading)
    );
    expect(result).toContain(
      xssSafeContent(singleColumnWithScripts.componentContent.link.text)
    );

    expect(result).not.toContain('<script>alert("xss")</script>');
    expect(result).not.toContain('<img src=x onerror=alert(1)>');
    expect(result).not.toContain('<svg onload=alert(1)>');
    expect(result).not.toContain('<a href="javascript:alert(1)">Click me</a>');
  });
});
