import { expect } from 'vitest';
import { xssSafeContent } from '../../utils/xss';
import ImageTextRow from './main.js';

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

describe('Image Text Row', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toBeDefined();
    expect(result).toContain('image-text-row-section');
  });

  /* Title */
  it('should render the title if provided', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toContain('Section Title');
  });

  it('should not render the title if it is null or undefined', async () => {
    const dataWithoutTitle = {
      ...mockData,
      componentContent: {
        ...mockData.componentContent,
        title: null
      }
    };
    const result = await ImageTextRow.main(dataWithoutTitle);

    expect(result).not.toContain('heading-secondary');
  });

  it('should not render the heading tag if title is empty', async () => {
    const dataWithoutTitle = {
      ...mockData,
      componentContent: {
        ...mockData.componentContent,
        title: ''
      }
    };
    const result = await ImageTextRow.main(dataWithoutTitle);

    expect(result).not.toContain('heading-secondary');
    // Check if it's still render Image Text Row Section
    expect(result).toContain('image-text-row-section');
  });

  /* Image */
  it('should render the image if provided', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toContain('image-text-row__image');
    expect(result).toContain('https://picsum.photos/800/600');
    expect(result).toContain('Alt Image');
  });

  it('should not render the image section if image is missing', async () => {
    const noImageMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, image: null }
    };
    const result = await ImageTextRow.main(noImageMock);

    expect(result).not.toContain('image-text-row__image');
    expect(result).toContain('no-image');
  });

  /* Content Heading */
  it('should render the Content Heading if provided', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toContain('Content Heading');
  });

  /* Content Type */
  it('should render the Content Type if provided', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toContain('Content type');
  });

  it('should not render the Content Type if provided', async () => {
    const noContentTypeMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, contentType: null }
    };
    const result = await ImageTextRow.main(noContentTypeMock);

    expect(result).not.toContain('text-tag');
  });

  /* Text Content */
  it('should render the Text Content correctly', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toContain('Text Content');
  });

  /* Link */
  it('should render the link if provided', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toContain('https://squiz.net');
    expect(result).toContain('CTA text link');
  });

  it('should not render the link if it is missing', async () => {
    const noLinkMock = {
      ...mockData,
      componentContent: { ...mockData.componentContent, link: null }
    };
    const result = await ImageTextRow.main(noLinkMock);

    expect(result).not.toContain('image-text-row__link');
  });

  /* Left-Right settings */
  it('should apply the "text-right" class if variant is text-right', async () => {
    const result = await ImageTextRow.main(mockData);

    expect(result).toContain('text-right');
    expect(result).not.toContain('text-left');
  });

  it('should apply the "text-left" class if variant is text-left', async () => {
    const mockTextLeft = {
      ...mockData,
      componentConfiguration: { variant: 'text-left' }
    };

    const result = await ImageTextRow.main(mockTextLeft);

    expect(result).toContain('text-left');
    expect(result).not.toContain('text-right');
  });

  /* XSS */
  it('should sanitize all fields to prevent XSS', async () => {
    const ImageTextRowWithScripts = {
      componentContent: {
        title: '<script>alert("xss")</script>',
        textContent: '<img src=x onerror=alert(1)>',
        heading: '<svg onload=alert(1)>',
        contentType: '<b>bad()</b>',
        link: {
          text: '<a href="javascript:alert(1)">Click me</a>'
        }
      },
      componentConfiguration: {
        variant: 'text-right'
      }
    };

    const result = await ImageTextRow.main(ImageTextRowWithScripts);

    expect(result).toContain(
      xssSafeContent(ImageTextRowWithScripts.componentContent.title)
    );
    expect(result).toContain(
      xssSafeContent(ImageTextRowWithScripts.componentContent.textContent)
    );
    expect(result).toContain(
      xssSafeContent(ImageTextRowWithScripts.componentContent.heading)
    );
    expect(result).toContain(
      xssSafeContent(ImageTextRowWithScripts.componentContent.contentType)
    );
    expect(result).toContain(
      xssSafeContent(ImageTextRowWithScripts.componentContent.link.text)
    );

    expect(result).not.toContain('<script>alert("xss")</script>');
    expect(result).not.toContain('<svg onload=alert(1)>');
    expect(result).not.toContain('<img src=x onerror=alert(1)>');
    expect(result).not.toContain('href="javascript:alert(1)"');
  });
});
