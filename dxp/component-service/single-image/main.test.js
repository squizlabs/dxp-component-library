import SingleImage from './main.js';
import { xssSafeContent } from '../../utils/xss.js';

const mockItem = {
  componentContent: {
    image: {
      name: 'My Image',
      alt: 'This is the image alt text',
      imageVariations: {
        original: {
          url: 'https://picsum.photos/800/800',
          width: 1500,
          height: 500,
          byteSize: 1000,
          mimeType: 'image/jpeg',
          aspectRatio: '1:1',
          sha1Hash: '1234567890abcdef1234567890abcdef12345678'
        }
      }
    }
  }
};

describe('Single Image', () => {
  /* General */
  it('should return valid HTML structure', async () => {
    const result = await SingleImage.main(mockItem);

    expect(result).toBeDefined();
    expect(result).toContain('<figure class="single-image-item">');
    expect(result).toContain('<img');
  });

  it('should include data-sq-field and loading="lazy" on <img>', async () => {
    const result = await SingleImage.main(mockItem);

    expect(result).toContain('data-sq-field="componentContent.image"');
    expect(result).toContain('loading="lazy"');
  });

  /* Image URL & attributes */
  it('should render the provided image URL in the src attribute', async () => {
    const result = await SingleImage.main(mockItem);
    const normalize = (s) => s.replace(/\s+/g, ' ').trim();

    expect(normalize(result)).toContain(
      `<img data-sq-field="componentContent.image" src="${mockItem.componentContent.image.imageVariations.original.url}"`
    );
  });

  it('should render the alt attribute and a figcaption when alt text is provided', async () => {
    const result = await SingleImage.main(mockItem);
    const safeAlt = xssSafeContent(mockItem.componentContent.image.alt);

    expect(result).toContain(`alt="${safeAlt}"`);
    expect(result).toContain(`<figcaption>${safeAlt}</figcaption>`);
  });

  it('should not render figcaption when alt is empty, null, or undefined', async () => {
    const cases = [{ alt: '' }, { alt: null }];

    for (const c of cases) {
      const item = {
        componentContent: {
          image: {
            ...mockItem.componentContent.image,
            alt: c.alt
          }
        }
      };
      const result = await SingleImage.main(item);
      expect(result).not.toContain('<figcaption>');
    }
  });

  /* Early exit */
  it('should return an HTML comment when image URL is missing', async () => {
    const noUrl = {
      componentContent: {
        image: {
          alt: 'Has alt but missing URL',
          imageVariations: {
            original: {
              url: null
            }
          }
        }
      }
    };

    const result = await SingleImage.main(noUrl);
    expect(result).toBe('<!-- ERR: Image not provided -->');
  });

  it('should return an HTML comment when componentContent is empty', async () => {
    const result = await SingleImage.main({});
    expect(result).toBe('<!-- ERR: Image not provided -->');
  });

  /* XSS */
  it('should sanitize alt text to prevent XSS', async () => {
    const payload = {
      componentContent: {
        image: {
          alt: '<img src=x onerror=alert("xss")><script>alert(1)</script>',
          imageVariations: {
            original: { url: 'https://picsum.photos/400/400' }
          }
        }
      }
    };

    const result = await SingleImage.main(payload);
    const safeAlt = xssSafeContent(payload.componentContent.image.alt);

    expect(result).toContain(`alt="${safeAlt}"`);
    expect(result).toContain(`<figcaption>${safeAlt}</figcaption>`);
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('onerror=');
  });
});
